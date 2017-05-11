import { v4 } from 'node-uuid';
import { Db, Cursor, Collection } from '../device/mongo';
import { repo, Model, Repository } from '../device/model';
import { config } from '../application';
import { rand, format_phone } from '../utilities';

const personalities = [0, 1];

export interface User extends Model {
    guid: string;
    phone: string;
    inactive: boolean;
    assigned_personality: number;
}

export function user(db: Db): Repository<User> {
    const coll = (): Collection =>
        db.collection(config<string>('mongo.collections.users'));

    const extras = repo<User>(coll);

    const find = (query: object, fields?: object): Cursor<User> =>
        coll().find(Object.assign({ inactive: false }, query), fields);

    const find_one = (query: object): Promise<User> =>
        coll().findOne(Object.assign({ inactive: false }, query));

    const find_one_by_phone = (raw: string): Promise<User> =>
        find_one({ phone: format_phone(raw) });

    const save = ({ phone }: { phone: string }): Promise<User> => {
        let guid = v4();
        let inactive = false;
        let date_created = new Date;
        let assigned_personality = rand(personalities);

        let user: User = { guid, inactive, phone, date_created, assigned_personality };

        return coll()
            .insert(user)
            .then(() => user);
    };

    return { ...extras, find, find_one, find_one_by_phone, save };
}
