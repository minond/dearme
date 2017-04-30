import { connect as client, Channel, Connection, Message } from 'amqplib';
import { Configuration, config as default_config } from '../application';
import { thenable } from '../utilities';

export type Connection = Connection;
export type Message = Message;
export type Channel = Channel;
export type LazyChannel = () => Promise<Channel>;
export type Channels = { messages: LazyChannel };

const MESSAGES_QUEUE = default_config<string>('amqp.queues.messages');

export const amqp: Promise<Connection> = connect(default_config);
export const channel = channels(amqp);

export function connect(config: Configuration = default_config): Promise<Connection> {
    const url = config<string>('amqp.url');

    return thenable(() => client(url));
}

export function channels(conn: Promise<Connection>): Channels {
    return {
        messages: queue(MESSAGES_QUEUE, conn),
    };
}

export function queue(name: string, conn: Promise<Connection>): () => Promise<Channel> {
    return () => conn.then((conn) => {
        return conn.createChannel().then((ch: Channel) => {
            return ch.assertQueue(name).then(() => {
                return ch;
            });
        });
    }) as Promise<_>;
}

export function parse<T>(msg: Message): T {
    let str = msg.content.toString();
    try {
        return JSON.parse(str);
    } catch (err) {
        console.error('error parsing "%s"', str);
        return {} as T;
    }
}
