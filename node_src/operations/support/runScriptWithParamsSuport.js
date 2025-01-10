const RunPythonScript = require("../../RunPythonScript");

module.exports.processParamFilter = async (scriptName, params) => {
    await verifyScriptExists(scriptName);
    const run = new RunPythonScript();

    return run.runPythonScript(scriptName, params);
}

async function verifyScriptExists(scriptName) {
    const run = new RunPythonScript();
    await run.verifyScriptExists(scriptName);
}