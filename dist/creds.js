"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_HASH = exports.API_ID = exports.STRING_SESSION = void 0;
const config_service_1 = require("./config.service");
const configService = new config_service_1.ConfigService();
exports.STRING_SESSION = configService.get('STRING_SESSION');
exports.API_ID = parseInt(configService.get('API_ID'));
exports.API_HASH = configService.get('API_HASH');
