import { Db, Cursor, Collection } from '../device/mongo';
import { Model, Repository } from '../device/model';
import { config } from '../application';

export interface User extends Model {
    inactive?: boolean;
    handle?: string | null;
    phone: string | null;
}

export function user(db: Db): Repository<User> {
    const coll = (): Collection =>
        db.collection(config<string>('mongo.collections.users'));

    const all = (): Cursor<User> =>
        coll().find({ inactive: false });

    const save = ({ phone, handle = null }: User): Promise<User> => {
        let inactive = false;
        let date_created = Date.now();

        let user: User = { inactive, phone, handle, date_created };
        console.info('saving', user);

        return coll()
            .insert(user)
            .then(() => user);
    };

    return { all, save };
}
