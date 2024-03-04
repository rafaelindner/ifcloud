const runScript = require("../RunPythonScript");
const fs = require("fs");

class DirectController{

    async runScriptByScriptName(req, res){
        try {
            const run = new runScript();
            var scriptName = req.params.script_name;

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
            const run = new runScript();

            var scriptName = req.body.scriptName;
            var params = req.body.params;

            fs.readdir('./uploads_src', (err, files) => {
                if(err){
                    return res.send('Error-10');
                }
                for(var i=0; i<files.length; i++){
                    if(files[i] === scriptName){
                        return res.send(run.runPythonScript(scriptName, params));
                    }
                }
                return res.send("!!! Script \""+scriptName+"\" not found !!!");
            });
        } catch (e) {
            console.log(e);
            return res.status(e.statusCode || 500).json(e);
        }
    }
}

module.exports = new DirectController();