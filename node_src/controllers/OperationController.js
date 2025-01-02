const apiRequest = require("../ApiRequest");
const runScript = require("../RunPythonScript");
const path = require('path');
const { getComponentChange, processComponentChange } = require("../operations/support/operationStarterSupport");
const { validateFormOperationStarter } = require("../operations/validations/operationStarterValidation");
const { log } = require("console");
const { validateForm } = require("../operations/validations/validationForm");
const { getComponentChangeForm, processComponentChangeForm } = require("../operations/support/form");
const fs = require('fs').promises;


class OperationController{
    async operationStarter(req, res){
        try{
            validateFormOperationStarter(req.body);

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
            }

            return res.json(returnOnlyFieldsComponents ? arrFilteredComponents : data);

        }catch(e){
            return res.status(e.statusCode || 500).json(e || "Internal server error");
        }
    }

    async myForm(req, res){
        try{
            req.body.onlyComponent = req.body.onlyComponent !== "0";

            const errors = validateForm(req.body);
            if (errors) {
                return res.send(`Validation Errors:<br> ${errors}`);
            }

            const { resourceType, resourceId, scriptName, componentIndex, changeField, onlyComponent } = req.body;

            const { data } = await apiRequest.get(resourceType+'/'+resourceId);
            
            const fhirComponents = data.component;
            const arrFilteredComponents = [];
            let response = {
                "resourceType": resourceType,
                 "id": ""+resourceId,
                 "scriptName": scriptName,
                 "returnOnlyFieldsComponent": onlyComponent,
                 "components": []
            }


            for (let fieldIndex = 0; fieldIndex < changeField.length; fieldIndex++) {
                const componentChange = getComponentChangeForm(fhirComponents, componentIndex[fieldIndex], changeField[fieldIndex]);
                
                if (!componentChange) {
                    return res.send('Index or changeField does not exists!');
                }

                response.components.push({
                    "index": componentIndex[fieldIndex],
                    "changeField": changeField[fieldIndex],
                    "originalComponent": componentChange[changeField[fieldIndex]]
                });

                // OperationController.createTXT(componentChange[changeField]);

                const updatedComponent = await processComponentChangeForm(componentChange, changeField[fieldIndex], scriptName);

                if (Array.isArray(updatedComponent) && !updatedComponent[0]) {
                    return res.send(updatedComponent[1]);
                }

                if (onlyComponent) {
                    arrFilteredComponents.push(updatedComponent);
                }
            }

            if(onlyComponent){
                console.log("");
                console.log("");
                console.log(arrFilteredComponents);

                console.log("");
                console.log("");

                console.log(response);
                console.log("");
                console.log("");
                
                
                
                return res.send("AE, foi");
                // return res.render('form_example', {data: components[componentIndex], response});
            }

            return res.send({...data});

            // console.log("PASSOU EM TUDO");
            


            // console.log(response);
            
            // return res.send("PASSOU EM TUDO");


            // for(const component of components) {
            //     
            //     const updatedComponent = await processComponentChange(res, componentChange, field, scriptName);

            //     if (returnOnlyFieldsComponents) {
            //         arrFilteredComponents.push(updatedComponent);
            //     }
            // }


            // if(componentIndex && changeField){
            //     if(components[componentIndex]){
            //         var componentChange = components[componentIndex]['valueSampledData'];
            //         var componentChange = components[componentIndex]['valueSampledData'];
            //     }else{
            //         return res.send("ERROR-03 !!! \"Index\" does not exist !!!");
            //     }

            //     // //POR AQUI A FUNCAO PRA CRIAR UM ARQUIVO ECG.TXT.... TODA VEZ QUE TRATA O FORM, SOBRE ESCREVE """ok"
            //     // function creatTXT(){
                    
            //     // }

            //     OperationController.createTXT(componentChange[changeField]);
                
            //     if(componentChange[changeField]){
            //         var scriptReturned = run.runPythonScript(scriptName, componentChange[changeField]);
            //         if(scriptReturned){
            //             scriptReturned = scriptReturned.replace(/(\r\n|\n|\r)/gm, "");
            //         }else{
            //             return res.send("!!! python script return error !!!")
            //         }
            //         componentChange[changeField] = scriptReturned;
            //     }else{
            //         return res.send("ERROR-04 !!! \"ChangeField\" does not exist !!!");
            //     }
            // }else{
            //     return res.send("ERROR-04 !!! Empty \"Index\" or \"ChangeField\" field !!!");
            // }

            // if(returnOnlyFieldComponent){
            //     return res.render('form_example', {data: components[componentIndex], response});
            // }

            // return res.send({...data});
        }catch(e){
            console.log(e);
            return res.send("ERROR");
            // return res.status(e.statusCode || 500).json(e || "Internal server error");
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
}




module.exports = new OperationController();
