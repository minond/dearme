import { Db, Cursor, Collection } from '../device/mongo';
import { Model, Repository } from '../device/model';
import { config } from '../application';
import { rand } from '../utilities';

const PERSONALITIES = [0, 1];

export interface User extends Model {
    phone: string | null;
    inactive: boolean;
    assigned_personality: number;
}

export function user(db: Db): Repository<User> {
    const coll = (): Collection =>
        db.collection(config<string>('mongo.collections.users'));

    const all = (): Cursor<User> =>
        coll().find({ inactive: false });

    const save = ({ phone }: { phone: string }): Promise<Readonly<User>> => {
        let inactive = false;
        let date_created = Date.now();
        let assigned_personality = rand(PERSONALITIES);

        let user: User = { inactive, phone, date_created, assigned_personality };
        console.info('saving', user);

        return coll()
            .insert(user)
            .then(() => user);
    };

    return { all, save };
}
