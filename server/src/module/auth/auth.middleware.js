
import ApiError from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";
import User from "./auth.model.js";

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return next(ApiError.unauthorized("Access token missing"));
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return next(ApiError.unauthorized("Access token missing"));
        }

        const decoded = verifyAccessToken(token);

        const user = await User.findById(decoded.id);

        if (!user) {
            return next(ApiError.unauthorized("User no longer exists"));
        }

        req.user = {
            id: user._id,
            role: user.role,
            name: user.name,
            email: user.email
        };

        next();

    } catch (error) {
        next(error);
    }
};

const authorize = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(
                ApiError.forbidden(
                    "You do not have permission for this action"
                )
            );
        }

        next();
    };
};

export { authenticate, authorize };
