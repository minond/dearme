export type Duration = number;

export const MILLISECOND: Duration = 1;
export const SECOND = MILLISECOND * 1000;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = HOUR * 24;

export function maybe<T>(val: T | null) {
    return {
        or_else(backup: () => T): T {
            return val === null || val === undefined ? backup() : val;
        }
    };
}

export function thenable<T>(fn: () => _): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        fn().then((res: T) => resolve(res))
            .catch((err: Error) => reject(err));
    });
}

export function rand<T>(items: T[]): T {
    return items[ Math.floor(Math.random() * items.length) ];
}

export function buffer(obj: object): Buffer {
    return new Buffer(JSON.stringify(obj));
}

export function clean_phone(phone: string): string {
    return phone.replace(/\D+/g, '');
}

export function format_phone(raw: string): string {
    return raw.trim()
        .replace(/\s+/g, '')
        .replace(/(\+1)(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4');
}
