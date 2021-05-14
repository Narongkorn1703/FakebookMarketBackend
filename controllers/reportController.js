const { Report } = require("../models");


exports.createReport = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const sellerId = req.params.sellerId
        const {report} = req.body
        Report.create({report, userId, sellerId})
    } catch (err) {
        next(err)
    }
}