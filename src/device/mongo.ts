import { MongoClient, Cursor, Collection, Db, ObjectID } from 'mongodb';
import { Configuration, config as default_config } from '../application';
import { logger } from '../log';

export type Db = Db;
export type Connecting = Promise<Db>;
export type ObjectID = ObjectID;
export type Cursor<T> = Cursor<T>;
export type Collection = Collection;

const log = logger(__filename);
export const mongo: Connecting = connect(default_config);

export function connect(config: Configuration = default_config): Connecting {
    const url = config<string>('mongo.url');
    log.info('connecting to mongo server');

    return new Promise<Db>((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) {
                log.error('error connecting to server');
                log.error(err);
                reject(err);
            } else {
                log.info('succesfully connected to server');
                resolve(db);
            }
        });
    });
}
