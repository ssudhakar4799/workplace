"use strict";

const serviceLocator = require("../lib/service_locator");
const mongoose = serviceLocator.get("mongoose");
const user = mongoose.model("user");
const admin = mongoose.model("admin");
const checkin_checkout = mongoose.model("checkin_checkout");
const jsend = serviceLocator.get("jsend");
const _ = serviceLocator.get("_");
// const multer = serviceLocator.get("multer");
const jwt = serviceLocator.get("jwt");
// const student = mongoose.model("students")
const config = require("../configs/configs")();
const bcrypt = serviceLocator.get("bcrypt");
const nodemailer = serviceLocator.get("nodemailer");
const otpGenerator = serviceLocator.get("otpgenerator");
const moment = serviceLocator.get("moment");
const crypto = require('crypto');


class ADMIN {
    async punchinApproved(req, res) {
        try {
            let pendingStatus = await checkin_checkout.find({ approveStatus: "Pending" });

            let pendingDatas;
            if (pendingStatus) {
                pendingDatas = pendingStatus.map((item) => {
                    let id = item.id
                    let empId = item.empId
                    let date = moment(item.date).format("DD-MM-YYYY")
                    let checkinTime = item.checkinTime
                    let attendanceStatus = item.attendanceStatus
                    let checkOutTime = item.checkOutTime
                    let totalTime = item.totalTime

                    return {
                        id, empId, date, checkinTime, attendanceStatus, checkOutTime, totalTime
                    }
                })
            }
            else {
                pendingDatas = [];
            }

            return jsend(
                200,
                "Successfully Admin Profile was Created ", pendingDatas
            );
        } catch (e) {
            console.log(e);
            res.notAcceptable(e);
        }
    }

    // punchin approve and reject status

    async approveRejectPunchin(req, res) {
        try {
            let approveStatus = await checkin_checkout.findOne({ _id: req.payload.id });

            if (approveStatus) {
                _.each(Object.keys(req.payload), (key) => {
                    approveStatus[key] = req.payload[key];
                });

                approveStatus.reason = null

                approveStatus = await approveStatus.save();
                return jsend(200, "Attendance status successfully Approved", approveStatus)

            }
            else {
                res.jsend(400, "Not data found")
            }

        }
        catch (e) {
            console.log(e);
            res.notAcceptable(e)
        }
    }


}
module.exports = ADMIN;
