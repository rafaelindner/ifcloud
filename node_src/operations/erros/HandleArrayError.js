
class HandleArrayError extends Error {
    constructor(errors, statusCode = 400) {
        super();
        this.status = "ArrayError";
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

module.exports = HandleArrayError;