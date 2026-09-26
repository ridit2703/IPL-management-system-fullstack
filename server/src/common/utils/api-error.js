class ApiError extends Error {
    constructor(statusCode, message) {// 
        super(message);// to priortize parent class message
        this.statusCode = statusCode;// to give status code 
        this.isOperational = true;// to give exceptional/operational error
        Error.captureStackTrace(this, this.constructor)//to keep trace where the error happen
    }
    static badRequest(message = "Bad request ") {// use static because after this dont need to create ApiError object first
        return new ApiError(400, message)
    }

    static unauthorized(message = "Unauthirized Usedr") {
        return new ApiError(403, message)
    }

    static conflict(message="conflict"){
        return new ApiError(409,message)
    }

    static forbidden(message="forbidden"){
        return new ApiError(412,message)
    }

    static notFound(message="not found"){
        return new ApiError(413,message)
    }
}

export default ApiError
