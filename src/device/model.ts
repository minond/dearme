import { Cursor, ObjectID } from '../device/mongo';
import { Collection } from './mongo';

export type ModelID = ObjectID;

export interface Model {
    _id?: ModelID;
    date_created?: Date;
}

export interface Repository<T extends Model> {
    find(query: object, fields?: object): Cursor<T>;
    find_one(query: object): Promise<T>;
    save(obj: Partial<T>): Promise<T>;
    save_many(obj: Partial<T>[]): Promise<T[]>;
    update(filter: object, update: object): Promise<null>;
    [index: string]: _;
}

export function repo<T>(coll: () => Collection): Repository<T> {
    return {
        find: (query: object, fields?: object): Cursor<T> =>
            coll().find(query, fields),

        count: (query: object): Promise<number> =>
            coll().count(query),

        find_one: (query: object): Promise<T> =>
            coll().findOne(query),

        save: (model: Partial<T>): Promise<T> =>
            coll().insert(model as object).then(() => model),

        save_many: (models: Partial<T>[]): Promise<T[]> =>
            coll().insertMany(models as object[]).then(() => models),

        update: (filter: object, update: object): Promise<null> =>
            coll().findOneAndUpdate(filter, update).then(() => null),
    };
}
