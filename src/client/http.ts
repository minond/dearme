// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
export declare function fetch(url: string, config: Request): Promise<Response>;

enum Method {
    GET = <any>'GET',
    POST = <any>'POST',
    PUT = <any>'PUT',
    HEAD = <any>'HEAD',
    TRACE = <any>'TRACE',
}

enum Mode {
    SAME_ORIGIN = <any>'same-origin',
    NO_CORS = <any>'no-cors',
    CORS = <any>'cors',
    NAVIGATE = <any>'navigate',
}

enum Credentials {
    OMIT = <any>'omit',
    SAME_ORIGIN = <any>'same-origin',
    INCLUDE = <any>'include',
}

enum Redirect {
    FOLLOW = <any>'follow',
    ERROR = <any>'error',
    MANUAL = <any>'manual',
}

enum Cache {
    DEFAULT = <any>'default',
    NO_STORE = <any>'no-store',
    RELOAD = <any>'reload',
    NO_CACHE = <any>'no-cache',
    FORCE_CACHE = <any>'force-cache',
    ONLY_IF_CACHED = <any>'only-if-cached',
}

enum ReferrerPolicy {
    NO_REFERRER = <any>'no-referrer',
    NO_REFERRER_WHEN_DOWNGRADE = <any>'no-referrer-when-downgrade',
    ORIGIN = <any>'origin',
    ORIGIN_WHEN_CROS_ORIGIN = <any>'origin-when-cross-origin',
    SAME_ORIGIN = <any>'same-origin',
    STRICT_ORIGIN = <any>'strict-origin',
    STRICT_ORIGIN_WHEN_CROSS_ORIGIN = <any>'strict-origin-when-cross-origin',
    UNSAFE_URL = <any>'unsafe-url',
}

enum Type {
    BASIC = <any>'basic',
    CORS = <any>'cors',
    ERROR = <any>'error',
    OPAQUE = <any>'opaque',
}

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
export interface Headers {
    new(headers: { [index: string]: string }): this;
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
export interface Request {
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
export interface Response {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly type: Type;
    readonly url: string;
}

export const HEADER_ACCEPT = 'Accept';
export const HEADER_CONTENT_TYPE = 'Content-Type';
export const HEADER_CSRF_TOKEN = 'x-csrf-token';

export const TYPE_JSON = 'application/json';
export const TYPE_PLAIN = 'plain/text';

function get_csrf_token(): string {
    var match = document.cookie.match(/tototoken=(.+)/) || ['', ''];
    return match[1].split(';')[0];
}

export const request = (url: string, conf: Request = {}): Promise<Response> => {
    return fetch(url, conf);
};

export const post = (url: string, raw_body: object = {}, conf: Request = {}): Promise<Response> => {
    let { headers = new Headers() } = conf;
    let body = JSON.stringify(raw_body);
    let method = Method.POST;
    let cache = Cache.NO_CACHE;

    let updates = { method, body, headers, cache };
    let override = Object.assign({}, conf, updates);

    headers.set(HEADER_ACCEPT, TYPE_JSON);
    headers.set(HEADER_CONTENT_TYPE, TYPE_JSON);
    headers.set(HEADER_CSRF_TOKEN, get_csrf_token());

    return request(url, override);
};
