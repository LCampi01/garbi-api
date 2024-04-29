/* eslint-disable no-unused-vars */
const { GeneralError, InternalServerError, HttpResponse, NotFoundError } = require('./classErrors.js');
const { GeneralError: GeneralError2, HttpResponse: HttpResponse2 } = require('./errorClass.js');
let httpResponse;
if(HttpResponse === undefined) {
    httpResponse = new HttpResponse2();
}else httpResponse = new HttpResponse();

const handleError = (err, req, res, next) => {
    console.log(err);
    // console.log('err from errorHandler => ', err.message);
    if (err.status === 404 && err.path) {
        const newErr = new NotFoundError(`Path not found: ${err.path}`);
        return httpResponse.ErrorResponse(res, newErr);
    } else {
        if (err instanceof GeneralError || err instanceof GeneralError2) {
            return httpResponse.ErrorResponse(res, err);
        }
        return httpResponse.ErrorResponse(res, new InternalServerError([err.message]));
    }
};

module.exports = { handleError };
