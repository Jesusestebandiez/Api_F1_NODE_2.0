const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const HTTPSTATUSCODE = require("../../../utils/httpStatusCode");

const register = async (req, res, next) => {
    try {
        const newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.favMusic = [];

        const userDb = await newUser.save();

        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: userDb.name
        });
    } catch (error) {
        return next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const userInfo = await User.findOne({ email: req.body.email });
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
            userInfo.password = null;
            const token = jwt.sign(
                {
                    id: userInfo._id,
                    name: userInfo.name
                },

                req.app.get("secretKey"), { expiresIn: "1h" }
            );
            return res.json({
                status: 201,
                message: HTTPSTATUSCODE[201],
                data: { user: userInfo.name, token: token }
            });
        } else {
            return res.json({
                status: 401,
                message: HTTPSTATUSCODE[401],
                data: {}
            })
        }
    } catch (error) {
        return next(error);
    }
}

const logout = (req, res, next) => {
    try {
        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            token: null
        })
    } catch (error) {
        return next(error);
    }
}