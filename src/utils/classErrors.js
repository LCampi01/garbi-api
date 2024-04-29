/* eslint-disable no-unsafe-finally */
/* eslint-disable no-use-before-define */

const HttpStatus = {
    OK: 200,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    BAD_REQUEST: 400
};

class HttpResponse {
    Ok(res, message, data = []) {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            success: true,
            message,
            data
        });
    }

    async ErrorResponse (res, err) {
        const errorResponse = {
            status: err.getCode(),
            statusMsg: err.message,
            errors: err.errors
        };
        return res.status(err.getCode()).json({...errorResponse, success: false});
    }
}

class GeneralError extends Error {

    constructor(message) {
        super();
        this.message = message;
        this.errors = [];
    }
    getCode() {
        if (this instanceof ForbiddenError) {
            return HttpStatus.FORBIDDEN;
        }

        if (this instanceof NotFoundError) {
            return HttpStatus.NOT_FOUND;
        }

        if (this instanceof BadRequestError) {
            return HttpStatus.BAD_REQUEST;
        }

        if (this instanceof ConflictError) {
            return HttpStatus.CONFLICT;
        }

        if (this instanceof AxiosError) {
            return this.status;
        }

        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
}

class ForbiddenError extends GeneralError {
    constructor (errors) {
        super('Forbidden');
        this.errors = errors;
    }
}
class NotFoundError extends GeneralError {
    constructor (errors) {
        super('Not Found');
        this.errors = errors;
    }
}
class BadRequestError extends GeneralError {
    constructor(errors) {
        super('Bad request');
        this.errors = errors;
    }
}

class ConflictError extends GeneralError {
    constructor (errors) {
        super('Conflict');
        this.errors = errors;
    }
}

class AxiosError extends GeneralError {
    constructor(errors, status) {
        super('CMS Course API Error');
        this.errors = errors;
        this.status = status;
    }
}

class InternalServerError extends GeneralError {
    constructor (errors) {
        super('Internal Server Error');
        this.errors = errors;
    }
}

module.exports = { HttpResponse, InternalServerError, NotFoundError, BadRequestError, ConflictError, ForbiddenError, GeneralError, AxiosError };
