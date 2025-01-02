const HandleError = require("../erros/HandleError");
const runScript = require("../../RunPythonScript");
const fsPrimises = require('fs/promises');

module.exports.getComponentChangeForm = (components, index) => {
    if (components[index].valueSampledData) {
        return components[index].valueSampledData;
    }
    return null;
}

module.exports.processComponentChangeForm = async (componentChange, changeField, scriptName) => {
    if (componentChange[changeField]) {
        const fileExists = await verifyScriptExists(scriptName);
        if (!fileExists) {
            return [false, `Script "${scriptName}" not found`];
        }

        const scriptReturned = await runScriptPython(scriptName, componentChange[changeField]);
        if (!scriptReturned) {
            return [false, "Python script return error"];
        }

        componentChange[changeField] = scriptReturned.replace(/(\r\n|\n|\r)/gm, "");
        return componentChange;
    }
    return [false, "ChangeField does not exist"];
}

async function runScriptPython(scriptName, data) {
    const run = new runScript();
    const scriptResult = run.runPythonScript(scriptName, data);
    return scriptResult;
}

async function verifyScriptExists(scriptName) {
    const files = await fsPrimises.readdir('./uploads_src');
    
    if (files.includes(scriptName)) {
        return true;
    }

    return false;
}