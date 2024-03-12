"use strict";

const serviceLocator = require("../lib/service_locator");
const trimRequest = serviceLocator.get("trimRequest");
const failAction = serviceLocator.get("failAction");
const rptManager = serviceLocator.get("RptManager");

exports.routes = (server, serviceLocator) => {
    return server.route([
        {
            path: "/LightHouse/punchinApproved",
            method: "POST",
            handler: rptManager.punchinApproved,
            // options: {
            //     auth: false,
            //     validate: {
            //         payload: require('../validations/user/createUserVaildation'),
            //         failAction: failAction
            //     }
            // },
        },
        {
            path: "/LightHouse/approveRejectPunchin",
            method: "POST",
            handler: rptManager.approveRejectPunchin,
            // options: {
            //     auth: false,
            //     validate: {
            //         payload: require('../validations/user/createUserVaildation'),
            //         failAction: failAction
            //     }
            // },
        }
    ]);

};