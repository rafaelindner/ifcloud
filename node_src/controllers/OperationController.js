const apiRequest = require("../ApiRequest");
const runScript = require("../RunPythonScript");

class OperationController{

    async operationStarter(req, res){
        try{
            const run = new runScript();

            var resourceType = req.body.resourceType;
            var id = req.body.id;
            var scriptName = req.body.scriptName;
            var componentIndex = req.body.component.index;
            var changeField = req.body.component.changeField;
            var returnOnlyFieldComponent = req.body.component.returnOnlyFieldsComponent;

            const { data } = await apiRequest.get(resourceType+'/'+id);

            var components = data.component;

            if(componentIndex && changeField){
                if(components[componentIndex]){
                    var componentChange = components[componentIndex]['valueSampledData'];
                }else{
                    return res.send("!!! \"Index\" does not exist !!!");
                }

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
                return res.send("!!! Empty \"Index\" or \"ChangeField\" field !!!");
            }

            if(returnOnlyFieldComponent){
                return res.json(components[componentIndex]);
            }

            return res.json(data);
        }catch(e){
            return res.status(e.statusCode || 500).json(e);
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

            return res.render('form_example', {data, response});
        }catch(e){
            return res.status(e.statusCode || 500).json(e);
        }
    }
}

module.exports = new OperationController();