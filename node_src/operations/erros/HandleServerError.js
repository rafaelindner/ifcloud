class HandleServerError extends Error {
    constructor() {
        super();
        this.status = "error";
        this.statusCode = 500;
        this.errors = { message: "Internal server error" };
    }
}

module.exports = HandleServerError;