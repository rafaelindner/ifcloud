class HandleError extends Error {
    constructor(message, statusCode = 400) {
        super();
        this.status = "error";
        this.statusCode = statusCode;
        this.errors = { message: message };
    }
}

module.exports = HandleError;