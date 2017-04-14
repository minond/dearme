import { Cursor, Collection, Server, Db } from 'mongodb';
import { Configuration, config as default_config } from '../application';

export type Cursor<T> = Cursor<T>;
export type Collection = Collection;

export const [ connection ]: [Db, _] = connect(default_config);

export function connect(config: Configuration = default_config): [Db, Promise<Db>] {
    const host = config<string>('mongo.host');
    const port = config<number>('mongo.port');
    const database = config<string>('mongo.database');

    const server = new Server(host, port);
    const db = new Db(database, server, { w: 1 });

    const connecting = db.open()
        .then((db) => {
            console.info('connected to %s', database);
            return db;
        });

    return [db, connecting];
}
