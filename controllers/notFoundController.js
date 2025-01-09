import { AppError } from "../utils/errorHandler.js"

function notFoundController(req, res, next){
    const err = new AppError(`can't find ${req.originalUrl} on server`, 404)
    next(err)
}

export { notFoundController }