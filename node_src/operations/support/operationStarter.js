const HandleError = require("../erros/HandleError");
const runScript = require("../../RunPythonScript")


module.exports.getComponentChange = (components, index) => {
    if (components[index]) {
        return components[index]['valueSampledData'];
    }
    throw new HandleError('Index does not exists!');
}

// Função para processar os dados
module.exports.processComponentChange = (componentChange, userComponent, scriptName) => {
    if (componentChange[userComponent.changeField]) {
        const scriptReturned = this.runScriptPython(scriptName, componentChange[userComponent.changeField]);
        if (!scriptReturned) {
            throw new HandleError("Python script return error");
        }

        componentChange[userComponent.changeField] = scriptReturned.replace(/(\r\n|\n|\r)/gm, "");
        return componentChange;
    }
    throw new HandleError("ChangeField does not exists!");
}

// Função para rodar o script Python
module.exports.runScriptPython = (scriptName, data) => {
    const run = new runScript();
    const scriptResult = run.runPythonScript(scriptName, data);
    return scriptResult;
}