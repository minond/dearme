import { sep } from 'path';

const cwd = process.cwd() + sep;

type LogFunction = (...params: any[]) => void;

type LoggerInstance = {
    error: LogFunction,
    info: LogFunction,
    log: LogFunction,
    warn: LogFunction,
};

function log_function(name: string, fn: Function): LogFunction {
    return (...params: any[]): void =>
        fn.apply(console, params);
}

export function logger(file: string): LoggerInstance {
    var name = file.replace(cwd, '');

    return {
        error: log_function(name, console.error),
        info: log_function(name, console.info),
        log: log_function(name, console.log),
        warn: log_function(name, console.warn),
    };
}
