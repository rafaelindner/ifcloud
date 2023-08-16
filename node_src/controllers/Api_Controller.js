const runScript = require("../RunPythonScript");
const api = require("../ApiRequest");

const run = new runScript();

class RunPythonController{

    async runScriptByPatientId(req, res){
        try{
            const id = req.params.id;
            const { data } = await api.get('Patient/'+id);

            const patientName = data.name[0].given;
            const scriptName = data.extension[0].valueString;

            let response = {
                "id": id,
                "valueString": scriptName
            };

            console.log(response);

            res.send(run.runPythonScript(scriptName));
        }catch(e){
            console.log(e);
            res.status(e.statusCode || 500).json(e.message);
        }
    }

    async runScriptByObservationId(req, res){
        try{
            const id = req.params.id;
            const { data } = await api.get('Observation/'+id);

            const valueString = data.extension[0].valueString;

            const samples = data.valueSampledData.data;

            let response = {
                "id": id,
                "valueString": valueString,
                "sampledData": samples
            };

            console.log(response);

            res.send(run.runPythonScript(valueString, samples));
        }catch(e){
            console.log(e);
            res.status(e.statusCode || 500).json(e.message);
        }
    }

    async callBiosppy(req, res){
        try{
            const arr = req.body.arr;
            console.log(arr);
            res.send(run.runPythonScript("callBiosppy.py", arr));
        }catch(e){
            console.log(e);
            res.status(e.statusCode || 500).json(e.message);
        }
    }

    async test(req, res){
        try{
            let response = {
                "status": "online",
                "urls": {
                    "call_biosppy": "http://localhost:3007/ifcloud/run_script/name/callbiosppy.py",
                    "run_script_by_script_name": "http://localhost:3007/ifcloud/run_script/script_name/:script_name",
                    "run_script_by_patient_id": "http://localhost:3007/ifcloud/run_script/patient_id/:id",
                    "run_script_by_extension_id": "http://localhost:3007/ifcloud/run_script/extension_id/:id",
                    "run_script_by_operation": "http://localhost:3007/ifcloud/run_script/operation/operation_name"
                }
            }
            res.json(response);
        }catch(e){
            console.log(e);
            res.status(e.statusCode || 500).json(e.message);
        }
    }

}

module.exports = new RunPythonController();