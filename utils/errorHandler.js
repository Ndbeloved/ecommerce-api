class AppError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}

function handleValidationError(err){
    // const message = err.details.map(detail => detail.message).join(', ')
    return new AppError(err.message, 400)
}

function handleDatabaseError(err){
    return new AppError('Database connection failed', 500)
}

function globalErrorHandler(err, req, res, next){
    let error = {...err, message: err.message}
    //handle known errors
    if (err.name === "ValidationError"){
        error = handleValidationError(err)
    } else if( err.name === "MongoError" || err.name === "CastError"){
        error = handleDatabaseError(err)
    }

    //fallback for unknown errors
    const statusCode = error.statusCode || 500
    const message = error.message || "Something went wrong"
    res.status(statusCode).json({success: false, message})
}

export { AppError, globalErrorHandler}