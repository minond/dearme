import { v4 } from 'uuid';
import { connection, Cursor, Collection } from '../device/mongo';
import { config } from '../application';

export interface User {
    id?: UUID;
    inactive?: boolean;
    phone: string | null;
    handle: string | null;
}

export namespace user {
    export function coll(): Collection {
        const coll = config<string>('mongo.collections.users');
        return connection.collection(coll);
    }

    export function all(id: UUID): Cursor<User> {
        return coll().find({ inactive: false });
    }

    export function save({ phone, handle }: User): Promise<User> {
        let id = v4();
        let inactive = false;

        let user: User = { id, inactive, phone, handle };
        console.info('saving', user);

        return coll()
            .insert(user)
            .then(() => user);
    }
}
