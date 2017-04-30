import { Db, Cursor, Collection } from '../device/mongo';
import { Model, Repository } from '../device/model';
import { config } from '../application';
import { rand } from '../utilities';

const personalities = [0, 1];

export interface User extends Model {
    phone: string;
    inactive: boolean;
    assigned_personality: number;
}

export function user(db: Db): Repository<User> {
    const coll = (): Collection =>
        db.collection(config<string>('mongo.collections.users'));

    const find = (query: object, fields?: object): Cursor<User> =>
        coll().find(Object.assign({ inactive: false }, query), fields);

    const find_one = (query: object): Promise<User> =>
        coll().findOne(Object.assign({ inactive: false }, query));

    const save = ({ phone }: { phone: string }): Promise<User> => {
        let inactive = false;
        let date_created = new Date;
        let assigned_personality = rand(personalities);

        let user: User = { inactive, phone, date_created, assigned_personality };

        return coll()
            .insert(user)
            .then(() => user);
    };

    const save_many = (users: User[]): Promise<User[]> => {
        throw new Error('Unimplemented');
    };

    return { find, find_one, save, save_many };
}
