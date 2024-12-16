const HandleError = require("../operations/erros/HandleError");
const { validateFormRunScriptWithParams } = require("../operations/validations/runScriptWithParamsValidation");
const runScript = require("../RunPythonScript");
const fs = require('fs/promises');

class DirectController{

    async runScriptByScriptName(req, res){
        try {
            const run = new runScript();
            var scriptName = req.params.script_name;

            console.log(req.params)

            if(run.runPythonScriptNotParams(scriptName)){
                return res.send(run.runPythonScriptNotParams(scriptName));
            }else{
                return res.send("!!! Script \""+scriptName+"\" not found !!!");
            }
        } catch (e) {
            console.log(e);
        }
    }

    async runScriptWithParams(req, res){
        try {
            validateFormRunScriptWithParams(req.body);

            const run = new runScript();

            const scriptName = req.body.scriptName;
            const params = req.body.params;

            const files = await fs.readdir('./uploads_src');
            if (!files.includes(scriptName)) {
                throw new HandleError(`Script "${scriptName}" not found`);
            }

            let proccessedData = params.map((param) => {
                    const result = run.runPythonScript(scriptName, param);
                    return result.trim();
            });

            return res.send(proccessedData);
        } catch (e) {
            console.log(e);
            return res.status(e.statusCode || 500).json(e);
        }
    }
}

module.exports = new DirectController();