import jwt from "jsonwebtoken";

export const varifyToken = (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Invalid Token or Token is expired",
      });
    }
    const token = authToken.split(" ")[1];
    const verify_token = jwt.verify(token, process.env.SECRET_KEY);
    req.user = verify_token;
    next();
  } catch (err) {
    return res.status(409).json({
      message: "Serevr error",
      error: err,
    });
  }
};
