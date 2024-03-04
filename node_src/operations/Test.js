const path = require("path");
require("dotenv").config();

const a = {
    FIRST_URL,
    RUN_SCRIPT_BY_SCRIPT_NAME,
    RUN_SCRIPT_BY_PATIENT_ID,
    RUN_SCRIPT_BY_EXTENSION_ID,
    DB_NAME,
    RUN_SCRIPT_BY_OPERATION
} = process.env;

module.exports = class Test{
    generateResponse(){
        return {
            "status": "online",
            "aplication_urls": {
               "run_script_by_script_name": FIRST_URL+""+RUN_SCRIPT_BY_SCRIPT_NAME,
               "run_script_by_patient_id": FIRST_URL+""+RUN_SCRIPT_BY_PATIENT_ID,
               "run_script_by_extension_id": FIRST_URL+""+RUN_SCRIPT_BY_EXTENSION_ID,
               "run_script_by_operation": FIRST_URL+""+RUN_SCRIPT_BY_OPERATION
            }
        };
    }
}