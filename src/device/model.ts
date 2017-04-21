import { Cursor, ObjectID } from '../device/mongo';

export interface Model {
    _id?: ObjectID;
    date_created?: string | number | Date | null;
}

export interface Repository<T extends Model> {
    all(): Cursor<T>;
    save(obj: T): Promise<T>;
}
