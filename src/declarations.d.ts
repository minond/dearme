type _ = any;

declare module 'millisecond' {
    namespace fn {}
    function fn(str: string): number;
    export = fn;
}

declare module 'twilio/lib/RestClient' {
    export type Status = 'accepted' | 'queued' | 'sending' | 'sent' | 'failed'
        | 'delivered' | 'undelivered' | 'receiving' | 'received';

    export interface Ack {
        sid: string;
        to: string;
        error_code: null;
        error_message: null;
        status: Status;
    }
}

declare module 'twilio/lib/TwimlResponse' {
    namespace response {
        type TagName = 'Dial' | 'Enqueue' | 'Gather' | 'Message' | 'Response';

        type LegalNodes = 'Body' | 'Client' | 'Conference' | 'Dial' | 'Enqueue' |
            'Gather' | 'Hangup' | 'Leave' | 'Media' | 'Message' | 'Number' |
            'Pause' | 'Pause' | 'Play' | 'Queue' | 'Record' | 'Redirect' |
            'Reject' | 'Say' | 'Sip' | 'Sms' | 'Task';

        export class TwimlNode {
            topLevel: boolean;
            name: TagName;
            legalNodes: LegalNodes[];
            children: TwimlNode[];
            text: string;
        }
    }

    function response(): response.TwimlNode;

    export = response;
}

declare module 'csrf' {
    namespace Tokens {}

    interface Options {
        saltLength: number;
        secretLength: number;
    }

    class Tokens {
        new(options: Options): Tokens;
        create(secret: string): string;
        secret(callback: (ret: string) => void): Promise<string>;
        secretSync(): string;
        verify(secret: string, token: string): boolean;
    }

    export = Tokens;
}

declare module 'acm' {
    namespace config {
        export type Configuration = <T>(str: string) => T;
    }

    function config<T>(str: string): T;
    export = config;
}

declare module 'react-input-mask' {
    import { HTMLAttributes, Component } from 'react';

    type State = {
        value: string;
    };

    type Props = HTMLAttributes<{ value: string }> & {
        mask: string;
        maskChar: string;
    };

    namespace InputElement {}
    class InputElement extends Component<Props, State> {}
    export = InputElement;
}

declare module 'tape' {
    type Tests = (runner: Runner) => void;
    type Runner = {
        plan(n: number): void;
        end(err: Error): void;
        fail(msg: string): void;
        pass(msg: string): void;
        timeoutAfter(ms: number): void;
        skip(msg: string): void;
        ok(val: _, msg?: string): void;
        notOk(val: _, msg?: string): void;
        error(err: Error, msg?: string): void;
        equal<A, B>(a: A, b: B, msg?: string): void;
        notEqual<A, B>(a: A, b: B, msg?: string): void;
        deepEqual<A, B>(a: A, b: B, msg?: string): void;
        notDeepEqual<A, B>(a: A, b: B, msg?: string): void;
        deepLooseEqual<A, B>(a: A, b: B, msg?: string): void;
        notDeepLooseEqual<A, B>(a: A, b: B, msg?: string): void;
        throws(action: () => void, exp: RegExp, msg?: string): void;
        doesNotThrow(action: () => void, exp: RegExp, msg?: string): void;
        test(name: string, tests: Tests): void;
        comment(msg: string): void;
    };

    namespace tape {}
    function tape(name: string, tests: Tests): void;
    export = tape;
}

declare module 'jsdom' {
    export type JSDOM = { defaultView: _ };
    export function jsdom(selector: string): JSDOM;
}

declare namespace NodeJS {
    interface Global {
        [index: string]: _;
        document: _ & { [index: string]: _ };
        window: _;
    }
}

declare namespace Express {
    export interface Response {
        xml(xml: string): void;
    }
}
