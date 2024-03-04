const runScript = require("../RunPythonScript");
const api = require("../ApiRequest");

const run = new runScript();

class ExtensionController{

    async runScriptByPatientId(req, res){
        try{
            if(!!data.extension){
                const id = req.params.id;
                const { data } = await api.get('Patient/'+id);

                const patientName = data.name[0].given;
                const scriptName = data.extension[0].valueString;

                let response = {
                    "id": id,
                    "valueString": scriptName
                };

                console.log(response);

                return res.send(run.runPythonScript(scriptName));
            }else{
                console.log(data);
                console.log("Field \"Extension\" doesn't exist!");
                return res.send("Field \"Extension\" doesn't exist in this resource!");
            }
        }catch(e){
            console.log(e);
            return res.status(e.statusCode || 500).json(e.message);
        }
    }

    async runScriptByObservationId(req, res){
        try{
            const id = req.params.id;
            const { data } = await api.get('Observation/'+id);

            if(!!data.extension){
                const valueString = data.extension[0].valueString;

                var components = data.component;
                console.log(components);
                console.log(components[0].valueSampledData.data);
                components[0].valueSampledData.data = "maria";
                console.log(components[0].valueSampledData.data);

                let response = {
                    "id": id,
                    "valueString": valueString,
                    "sampledData": samples
                };

                return res.send(run.runPythonScript(valueString, samples));
            }else{
                console.log(data);
                console.log("Field \"Extension\" doesn't exist in this resource!");
                return res.send("Field \"Extension\" doesn't exist in this resource!");
            }
        }catch(e){
            console.log(e);
            return res.status(e.statusCode || 500).json(e.message);
        }
    }
}

module.exports = new ExtensionController();