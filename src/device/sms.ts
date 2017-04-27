import * as twilio from 'twilio';
import * as create from 'twilio/lib/TwimlResponse';

import { Ack } from 'twilio/lib/RestClient';
import { TagName, TwimlNode } from 'twilio/lib/TwimlResponse';

import { config } from '../application';

export type SMSAck = Ack;
export type SMSSend = (to: string, body: string) => Promise<SMSAck>;

const ACCOUNT_SID = config<string>('twilio.account_sid');
const AUTH_TOKEN = config<string>('twilio.auth_token');
const SERVICE_SID = config<string>('twilio.service_sid');

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

function sub(name: TagName, text: string = ''): TwimlNode {
    let node = create();
    node.name = name;
    node.text = text;
    node.topLevel = false;
    return node;
}

export function response(...children: TwimlNode[]): TwimlNode {
    let node = create();
    node.children = children;
    return node;
}

export function message(text: string): TwimlNode {
    return sub('Message', text);
}

export const send: SMSSend = (to: string, body: string): Promise<SMSAck> => {
    var payload = { to, body, messagingServiceSid: SERVICE_SID };

    return new Promise<SMSAck>((resolve, reject) => {
        client.sendMessage(payload)
            .then((msg) => resolve(msg))
            .catch((err) => reject(err));
    });
};
