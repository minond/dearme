// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
export declare function fetch(url: string, config: Request): Promise<Response>;

type Dictionary<T> = { [index: string]: T; };

type Method = 'GET' | 'POST' | 'PUT' | 'HEAD' | 'TRACE';
type Mode = 'same-origin' | 'no-cors' | 'cors' | 'navigate';
type Credentials =  'omit' | 'same-origin' | 'include';
type Redirect = 'follow' | 'error' | 'manual';

type Cache = 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache'
    | 'only-if-cached';

type ReferrerPolicy = 'no-referrer' | 'no-referrer-when-downgrade' | 'origin'
    | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin'
    | 'strict-origin-when-cross-origin' | 'unsafe-url';

type Type = 'basic' | 'cors' | 'error' | 'opaque';

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Headers
 * https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers
 * https://developer.mozilla.org/en-US/docs/Web/API/Headers/has
 * https://developer.mozilla.org/en-US/docs/Web/API/Headers/append
 * https://developer.mozilla.org/en-US/docs/Web/API/Headers/set
 * https://developer.mozilla.org/en-US/docs/Web/API/Headers/get
 * https://developer.mozilla.org/en-US/docs/Web/API/Headers/delete
 * https://developer.mozilla.org/en-US/docs/Web/API/Headers/entries
 * https://developer.mozilla.org/en-US/docs/Web/API/Headers/keys
 * https://developer.mozilla.org/en-US/docs/Web/API/Headers/values
 */
interface Headers {
    new(headers: Dictionary<string>): this;
    has(header: string): boolean;
    append(header: string, value: string): void;
    set(header: string, value: string): void;
    get(header: string): string | null;
    delete(header: string): void;
    entries(): Iterator<[string, string]>;
    keys(): Iterator<string>;
    values(): Iterator<string>;
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Request
 * https://developer.mozilla.org/en-US/docs/Web/API/Request/method
 * https://developer.mozilla.org/en-US/docs/Web/API/Request/headers
 * https://developer.mozilla.org/en-US/docs/Web/API/Request/mode
 * https://developer.mozilla.org/en-US/docs/Web/API/Request/referrer
 * https://developer.mozilla.org/en-US/docs/Web/API/Request/referrerPolicy
 * https://developer.mozilla.org/en-US/docs/Web/API/Request/credentials
 * https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
 * https://developer.mozilla.org/en-US/docs/Web/API/Request/redirect
 * https://developer.mozilla.org/en-US/docs/Web/API/Request/integrity
 */
interface Request {
    readonly method?: Method;
    readonly headers?: Headers;
    readonly mode?: Mode;
    readonly referrer?: string;
    readonly referrerPolicy?: ReferrerPolicy;
    readonly credentials?: Credentials;
    readonly cache?: Cache;
    readonly redirect?: Redirect;
    readonly integrity?: string;
    readonly body?: string;
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/API/Response
 * https://developer.mozilla.org/en-US/docs/Web/API/Response/headers
 * https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
 * https://developer.mozilla.org/en-US/docs/Web/API/Response/redirected
 * https://developer.mozilla.org/en-US/docs/Web/API/Response/status
 * https://developer.mozilla.org/en-US/docs/Web/API/Response/statusText
 * https://developer.mozilla.org/en-US/docs/Web/API/Response/type
 * https://developer.mozilla.org/en-US/docs/Web/API/Response/url
 */
interface Response {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: Type;
    readonly url: string;
}

export const request = (url: string, conf: Request = {}): Promise<Response> => {
    return fetch(url, conf);
};

export const post = (url: string, raw_body: object = {}, conf: Request = {}): Promise<Response> => {
    let { headers = new Headers() } = conf;
    let body = JSON.stringify(raw_body);

    let updates = { body, headers };
    let override = Object.assign({}, conf, updates);

    headers.set('Content-Type', 'application/json');

    return request(url, override);
};
