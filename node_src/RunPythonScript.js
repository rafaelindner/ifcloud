const {
    execSync
} = require('child_process');
const path = require('path');
const fs = require('fs');

module.exports = class RunPythonScript {

    runPythonScriptFromFile(scriptName, params) {

    }

    // runPythonScript(scriptName, params){
    //     try{
    //         var response = execSync(
    //             "python3 ./uploads_src/"+scriptName+" "+params,
    //             {encoding: "utf8" }
    //         );
    //         return response;
    //     }catch(e){
    //         console.log(e);
    //     }
    //     return false;
    // }

    runPythonScript(scriptName, params) {
        //Caminho base para o upload
        const dirPath = './uploads_src/temp';
        //Pega o timestamp atual
        const timestamp = Date.now()
        //Caminho do diretório para armazenar o txt temporário
        const paramsFile = path.join(dirPath, `params_${timestamp}.txt`);

        try {
            //Verifica se o arquivo existe, se não ele é criado
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, {
                    recursive: true //Cria os diretórios caso não existam
                });
            }

            const timestamp = Date.now();
            // const paramsFile = path.join(dirPath, `params_${timestamp}.txt`)

            //Escreve no arquivo txt os dados dos parâmetros da função
            fs.writeFileSync(paramsFile, params, {
                encoding: 'utf8'
            });

            //Executa o script py
            const response = execSync(
                `python3 ./uploads_src/${scriptName} ${paramsFile}`, {
                    encoding: 'utf8'
                }
            );

            return response;
        } catch (e) {
            console.log(e);
        } finally {
            console.log(paramsFile)
            //Quando tudo for executado sem erros, o arquivo txt temporário é excluído
            fs.unlinkSync(paramsFile);
        }
        return false;
    }

    runPythonScriptNotParams(scriptName) {
        try {
            var response = execSync(
                `python3 ./uploads_src/${scriptName}`, {
                    encoding: 'utf8'
                }
            );
            return response;
        } catch (e) {
            console.error('Error:', e.message);
            return false;
        }
    }
};