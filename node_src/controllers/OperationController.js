const apiRequest = require("../ApiRequest");
const runScript = require("../RunPythonScript");
const path = require('path');
const { validateForm } = require("../operations/validations/formValidation");
const HandleError = require("../operations/erros/HandleError");
const { getComponentChange, processComponentChange } = require("../operations/support/operationStarter");
const fs = require('fs').promises;


class OperationController{
    async operationStarter(req, res){
        try{
            // Validação dos dados do formulário
            validateForm(req.body);

            // Pega os dados somente passarem na validação
            const { resourceType, id, scriptName, returnOnlyFieldsComponents, components } = req.body;
            
            const { data } = await apiRequest.get(resourceType+'/'+id);

            const fhirComponents = data.component;
            const arrFilteredComponents = [];
            
            for(const component of components) {
                const componentChange = getComponentChange(fhirComponents, component.index);
                const updatedComponent = await processComponentChange(componentChange, component, scriptName);

                if (returnOnlyFieldsComponents) {
                    arrFilteredComponents.push(updatedComponent);
                }
            };

            return res.json(returnOnlyFieldsComponents ? arrFilteredComponents : data);

        }catch(e){
            return res.status(e.statusCode || 500).json(e || "Internal server error");
        }
    }

    static async createTXT(content) {
        const directoryPath = path.join(__dirname, '..', 'texto_ecg');
        const filePath = path.join(directoryPath, 'ECG.TXT');
    
        try {
            // Verifica se o diretório existe, cria se não existir
            await fs.mkdir(directoryPath, { recursive: true });
    
            // Verifica se o arquivo existe
            try {
                await fs.access(filePath);
                // Se existir, substitui o conteúdo
                await fs.writeFile(filePath, content);
                console.log('Arquivo ecg foi modificado', filePath);
            } catch (err) {
                // Se não existir, cria o arquivo
                await fs.writeFile(filePath, content);
                console.log('Arquivo ecg foi criado', filePath);
            }
        } catch (error) {
            console.error('Erro ao modificar ou criar o arquivo ecg.txt', error);
        }
    }
    
    async myForm(req, res){
        try{
            const run = new runScript();

            var resourceType = req.body.resourceType;
            var id = req.body.resourceId;
            var scriptName = req.body.scriptName;
            var componentIndex = req.body.componentIndex;
            var changeField = req.body.changeField;
            if(req.body.onlyComponent == '0'){
                var returnOnlyFieldComponent = false;
            }else{
                var returnOnlyFieldComponent = true;
            }

            const { data } = await apiRequest.get(resourceType+'/'+id);
            var components = data.component;

            var response = {
                "resourceType": resourceType,
                 "id": ""+id,
                 "scriptName": scriptName,
                 "component": {
                   "index": ""+componentIndex,
                   "changeField": changeField,
                   "returnOnlyFieldsComponent": returnOnlyFieldComponent
                 },
                 "originalComponent": components[componentIndex]['valueSampledData'][changeField]
            }

            if(componentIndex && changeField){
                if(components[componentIndex]){
                    var componentChange = components[componentIndex]['valueSampledData'];
                    var componentChange = components[componentIndex]['valueSampledData'];
                }else{
                    return res.send("ERROR-03 !!! \"Index\" does not exist !!!");
                }

                // //POR AQUI A FUNCAO PRA CRIAR UM ARQUIVO ECG.TXT.... TODA VEZ QUE TRATA O FORM, SOBRE ESCREVE """ok"
                // function creatTXT(){
                    
                // }

                OperationController.createTXT(componentChange[changeField]);
                
                if(componentChange[changeField]){
                    var scriptReturned = run.runPythonScript(scriptName, componentChange[changeField]);
                    if(scriptReturned){
                        scriptReturned = scriptReturned.replace(/(\r\n|\n|\r)/gm, "");
                    }else{
                        return res.send("!!! python script return error !!!")
                    }
                    componentChange[changeField] = scriptReturned;
                }else{
                    return res.send("ERROR-04 !!! \"ChangeField\" does not exist !!!");
                }
            }else{
                return res.send("ERROR-04 !!! Empty \"Index\" or \"ChangeField\" field !!!");
            }

            if(returnOnlyFieldComponent){
                return res.render('form_example', {data: components[componentIndex], response});
            }

            return res.send({...data});
        }catch(e){
            return res.status(e.statusCode || 500).json(e);
        }
        
    }
    
}




module.exports = new OperationController();
