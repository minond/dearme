import { Cursor, Collection, Server, Db, ObjectID } from 'mongodb';
import { Configuration, config as default_config } from '../application';

export type Db = Db;
export type Connecting = Promise<Db>;
export type ObjectID = ObjectID;
export type Cursor<T> = Cursor<T>;
export type Collection = Collection;

export const mongo: Connecting = connect(default_config);

export function connect(config: Configuration = default_config): Connecting {
    const host = config<string>('mongo.host');
    const port = config<number>('mongo.port');
    const database = config<string>('mongo.database');

    const server = new Server(host, port);
    const db = new Db(database, server, { w: 1 });

    return db.open().then((db) => {
        console.info('connected to %s', database);
        return db;
    });
}
