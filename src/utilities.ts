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
