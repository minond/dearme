import * as dotenv from 'dotenv';
import { config } from './application';

dotenv.config({ silent: true });

export const KEY_MESSAGES = config('key.messages') as string;
