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
        await verifyScriptExists(scriptName);

        const scriptReturned = runScriptPython(scriptName, componentChange[userComponent.changeField]);
        if (!scriptReturned) {
            throw new HandleError("Python script return error");
        }

        componentChange[userComponent.changeField] = scriptReturned.replace(/(\r\n|\n|\r)/gm, "");
        return componentChange;
    }
    throw new HandleError("ChangeField does not exists!");
}

function runScriptPython(scriptName, data) {
    const run = new runScript();
    const scriptResult = run.runPythonScript(scriptName, data);
    return scriptResult;
}

async function verifyScriptExists(scriptName) {
    const files = await fs.readdir('./uploads_src');
    if (!files.includes(scriptName)) {
        throw new HandleError(`Script "${scriptName}" not found`);
    }

    return true;
}   