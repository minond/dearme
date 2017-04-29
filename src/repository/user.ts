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

    const save = ({ phone }: { phone: string }): Promise<User> => {
        let inactive = false;
        let date_created = new Date;
        let assigned_personality = rand(personalities);

        let user: User = { inactive, phone, date_created, assigned_personality };
        console.info('saving', user);

        return coll()
            .insert(user)
            .then(() => user);
    };

    return { find, save };
}
