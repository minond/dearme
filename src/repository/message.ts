import { head } from 'lodash';
import { User } from './user';
import { Db, Cursor, Collection } from '../device/mongo';
import { Model, ModelID, Repository } from '../device/model';
import { config } from '../application';

export interface Response {
    body: string;
    date: Date;
}

export interface Message extends Model {
    user_id: ModelID;
    scheduled: boolean;
    body: string;
    send_date: Date;
    responses: Response[];
}

export function message(db: Db): Repository<Message> {
    const coll = (): Collection =>
        db.collection(config<string>('mongo.collections.messages'));

    const find = (query: object, fields?: object): Cursor<Message> =>
        coll().find(query, fields);

    const find_one = (query: object): Promise<Message> =>
        coll().findOne(query);

    const save = (message: Message): Promise<Message> =>
        coll().insert(message).then(() => message);

    const save_many = (messages: Message[]): Promise<Message[]> =>
        coll().insertMany(messages).then(() => messages);

    const update = (filter: object, update: object): Promise<null> =>
        coll().findOneAndUpdate(filter, update).then(() => null);

    const find_users_last_message = (user: User): Promise<Message> => {
        let { _id: user_id } = user;
        let scheduled = true;

        if (!user_id) {
            return Promise.reject(new Error('user id required'));
        }

        return find({ scheduled, user_id })
            .sort({ send_date: -1 })
            .limit(1)
            .toArray()
            .then((msgs) => head(msgs));
    };

    return { find, find_one, find_users_last_message, save, save_many, update };
}
