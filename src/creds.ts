import {ConfigService} from "./config.service";

const configService = new ConfigService()
export const STRING_SESSION = configService.get('STRING_SESSION');
export const API_ID = parseInt(configService.get('API_ID'))
export const API_HASH = configService.get('API_HASH')

