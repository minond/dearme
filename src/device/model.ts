import { Cursor, ObjectID } from '../device/mongo';

export type ModelID = ObjectID;

export interface Model {
    _id?: ModelID;
    date_created?: Date;
}

export interface Repository<T extends Model> {
    find(query: object, fields?: object): Cursor<T>;
    findOne(query: object): Promise<T>;
    save(obj: object): Promise<T>;
}
