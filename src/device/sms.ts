import * as twilio from 'twilio';
import { config } from '../application';

const ACCOUNT_SID = config<string>('twilio.account_sid');
const AUTH_TOKEN = config<string>('twilio.auth_token');
const SERVICE_SID = config<string>('twilio.service_sid');

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

type Status = 'accepted' | 'queued' | 'sending' | 'sent' | 'failed'
    | 'delivered' | 'undelivered' | 'receiving' | 'received';

interface Ack {
    sid: string;
    to: string;
    error_code: null;
    error_message: null;
    status: Status;
}

export function send(to: string, body: string): Promise<Ack> {
    var payload = { to, body, messagingServiceSid: SERVICE_SID };

    return new Promise<Ack>((resolve, reject) => {
        client.sendMessage(payload)
            .then((msg) => resolve(msg))
            .catch((err) => reject(err));
    });
}
