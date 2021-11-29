const F1Team = require("../models/F1Team.models");
const HTTPSTATUSCODE = require("../../../utils/httpStatusCode");

const createTeam = async (req, res, next) => {
    try {
        const newTeam = new Team();
        newTeam.name = req.body.name;
        newTeam.city = req.body.city;
        newTeam.color = req.body.color;
        const TeamDb = await newTeam.save();
        return res.json({
            status: 201,
            message: HTTPSTATUSCODE[201],
            data: { F1Team: F1TeamDb.name }
        })
    } catch (error) {
        return next(error);
    }
}

const getAllF1Team = async (req, res, next) => {
    try {
        // Si no pasais paginación por query params quitar el if
        if (req.query.page) {
            const page = parseInt(req.query.page);
            const skip = (page - 1) * 3;
            const F1Team = await F1Team.find().skip(skip).limit(3);
            return res.json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                data: { F1Team: F1Team }
            });
        } else {
            const F1team = await F1Team.find();
            return res.json({
                status: 200,
                message: HTTPSTATUSCODE[200],
                data: { F1Team: F1Team }
            });
        }
    } catch (error) {
        return next(error)
    }
}

const getF1TeamById = async (req, res, next) => {
    try {
        const { F1TeamId } = req.params;
        const F1TeamById = await F1Team.findById(F1TeamId);
        return res.json({
            status: 200,
            message: HTTPSTATUSCODE[200],
            data: { F1Team: F1TeamById }
        })
    } catch (error) {
        return next(error)
    }
}

module.exports = { createTeam, getAllF1Team, getF1TeamById };