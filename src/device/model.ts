import { Cursor, ObjectID } from '../device/mongo';

export type ModelID = ObjectID;

export interface Model {
    _id?: ModelID;
    date_created?: Date;
}

export interface Repository<T extends Model> {
    all(): Cursor<T>;
    save(obj: object): Promise<T>;
}
