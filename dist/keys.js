"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const application_1 = require("./application");
dotenv.config({ silent: true });
exports.KEY_MESSAGES = application_1.config('key.messages');
