import { Db, Cursor, Collection } from '../device/mongo';
import { Model, ModelID, Repository } from '../device/model';
import { config } from '../application';

export interface Message extends Model {
    user_id: ModelID;
    scheduled: boolean;
    body: string;
    send_date: Date;
    response?: string;
    response_date?: Date;
}

export function message(db: Db): Repository<Message> {
    const coll = (): Collection =>
        db.collection(config<string>('mongo.collections.message'));

    const find = (query: object, fields?: object): Cursor<Message> =>
        coll().find(query, fields);

    const find_one = (query: object): Promise<Message> =>
        coll().findOne(query);

    const save = (message: Message): Promise<Message> =>
        coll().insert(message).then(() => message);

    const save_many = (messages: Message[]): Promise<Message[]> =>
        coll().insertMany(messages).then(() => messages);

    return { find, find_one, save, save_many };
}
