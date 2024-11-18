const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Check for authorization header
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res.status(401).send({
        message: "Authorization header missing",
        success: false,
      });
    }

    // Extract token from Authorization header
    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Token missing from authorization header",
        success: false,
      });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Token is not valid",
          success: false,
        });
      } else {
        // Attach user ID from token to the request object
        req.body.userId = decoded.id;
        next();
      }
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).send({
      message: "Internal server error",
      success: false,
    });
  }
};

