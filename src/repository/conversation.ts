import { Db, Cursor, Collection } from '../device/mongo';
import { Model, ModelID, Repository } from '../device/model';
import { config } from '../application';

export interface Message {
    body: string;
    send_date: number;
    response?: string;
    response_date?: number;
}

export interface Conversation extends Model {
    user_id: ModelID;
    messages: Message[];
}

export function conversation(db: Db): Repository<Conversation> {
    const coll = (): Collection =>
        db.collection(config<string>('mongo.collections.conversations'));

    const all = (): Cursor<Conversation> =>
        coll().find({});

    const save = (conversation: Conversation): Promise<Conversation> => {
        console.info('saving', conversation);

        return coll()
            .insert(conversation)
            .then(() => conversation);
    };

    return { all, save };
}
