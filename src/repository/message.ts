import { head } from 'lodash';
import { User } from './user';
import { Db } from '../device/mongo';
import { repo, Model, ModelID, Repository } from '../device/model';
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
    const { find, ...extras } = repo<Message>(() =>
        db.collection(config<string>('mongo.collections.messages')));

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

    return { ...extras, find, find_users_last_message };
}
