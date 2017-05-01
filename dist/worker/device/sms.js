"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const twilio = require("twilio");
const create = require("twilio/lib/TwimlResponse");
const application_1 = require("../application");
const ACCOUNT_SID = application_1.config('twilio.account_sid');
const AUTH_TOKEN = application_1.config('twilio.auth_token');
const SERVICE_SID = application_1.config('twilio.service_sid');
const client = twilio(ACCOUNT_SID, AUTH_TOKEN);
function sub(name, text = '') {
    let node = create();
    node.name = name;
    node.text = text;
    node.topLevel = false;
    return node;
}
function response(...children) {
    let node = create();
    node.children = children;
    return node;
}
exports.response = response;
function message(text) {
    return sub('Message', text);
}
exports.message = message;
exports.send = (to, body) => {
    var payload = { to, body, messagingServiceSid: SERVICE_SID };
    return new Promise((resolve, reject) => {
        client.sendMessage(payload)
            .then((msg) => resolve(msg))
            .catch((err) => reject(err));
    });
};
