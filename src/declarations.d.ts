type _ = any;

declare module 'acm' {
    namespace config {
        export type Configuration = <T>(str: string) => T;
    }

    function config<T>(str: string): T;
    export = config;
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

declare module 'enzyme' {
    import { Component, DOMElement } from 'react';

    export type WrappedComponent<P, S> = {
        length: number;
        find<P2, S2>(selector: string): WrappedComponent<P2, S2>;
        contains<P2, S2 extends Element>(elem: DOMElement<P2, S2>): boolean;
        props(): { [index: string]: string };
        setProps(props: P): WrappedComponent<P, S>;
        setState(state: S): WrappedComponent<P, S>;
        simulate(ev: string): void;
        text(): string;
        state(): S;
        props(): P;
    };

    export function mount<P, S>(elem: _): WrappedComponent<P, S>;
    export function shallow<P, S>(elem: _): WrappedComponent<P, S>;
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
