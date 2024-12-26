const RunPythonScript = require("../../RunPythonScript");

module.exports.processParamFilter = async (scriptName, params) => {
    await verifyScriptExists(scriptName);
    const run = new RunPythonScript();

    let proccessedData = params.map((param) => {
        const result = run.runPythonScript(scriptName, param);
        return result.trim();
    });

    return proccessedData;
}

async function verifyScriptExists(scriptName) {
    const run = new RunPythonScript();
    await run.verifyScriptExists(scriptName);
}