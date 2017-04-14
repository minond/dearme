import { ObjectID } from 'mongodb';

export interface Model {
    _id?: ObjectID;
    date_created?: string | number | Date | null;
}
