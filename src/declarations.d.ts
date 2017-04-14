type _ = any;

declare module 'acm' {
    namespace config {
        export type Configuration = <T>(str: string) => T;
    }

    function config<T>(str: string): T;
    export = config;
}
