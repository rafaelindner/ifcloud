const HandleError = require("../erros/HandleError");
const runScript = require("../../RunPythonScript");
const fs = require('fs/promises');

module.exports.getComponentChange = (components, index) => {
    if (components[index]) {
        return components[index]['valueSampledData'];
    }
    throw new HandleError('Index does not exists!');
}

module.exports.processComponentChange = async (componentChange, userComponent, scriptName) => {
    if (componentChange[userComponent.changeField]) {
        const scriptReturned = await runScriptPython(scriptName, componentChange[userComponent.changeField]);
        if (!scriptReturned) {
            throw new HandleError("Python script return error");
        }

        componentChange[userComponent.changeField] = scriptReturned.replace(/(\r\n|\n|\r)/gm, "");
        return componentChange;
    }
    throw new HandleError("ChangeField does not exists!");
}

async function runScriptPython(scriptName, data) {
    const run = new runScript();
    await run.verifyScriptExists(scriptName);
    const scriptResult = run.runPythonScript(scriptName, data);
    return scriptResult;
}
