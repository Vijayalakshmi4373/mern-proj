// helpers/responseHelper.js
module.exports = {
    successResponse: (res, message, data = null, statusCode = 200) => {
      return res.status(statusCode).send({
        success: true,
        message: message,
        data: data,
      });
    },
  
    errorResponse: (res, message, statusCode = 500, error = null) => {
      return res.status(statusCode).send({
        success: false,
        message: message,
        error: error,
      });
    },
  };
  