import { sep } from 'path';
import * as minimist from 'minimist';

type Api = {
    kind?: string;
    help?: boolean;
};

const FLAG_HELP = 'help';
const FLAG_KIND = 'kind';
const KIND_TEXTER = 'texter';
const KIND_SCHEDULER = 'scheduler';

const STR_FLAGS = [ FLAG_KIND ];
const BOOL_FLAGS = [ FLAG_HELP ];
const ALIASES = { k: FLAG_KIND, h: FLAG_HELP };

const CWD = process.cwd();
const ME = __filename.replace(CWD + sep, '');

const log = console.log.bind(console);
const error = console.error.bind(console);

function main(argv: Api): void {
    const { help, kind } = argv;

    if (help) {
        show_help();
        exit(0);
    } else if (kind) {
        switch (kind) {
            case KIND_SCHEDULER:
                log('starting scheduler');
                break;

            case KIND_TEXTER:
                log('starting scheduler');
                break;

            default:
                error(`invalid --kind value: ${kind}`);
                show_help(true);
                exit(1);
                break;
        }
    }
}

function exit(code: number = 1): void {
    process.exit(code);
}

function unknown(arg: string): boolean {
    error(`${ME}: '${arg}' is not a valid option. See '${ME} --help'.`);
    log();
    show_help();
    exit(1);
    return false;
}

function show_help(nl: boolean = false): void {
    if (nl) {
        log('');
    }
    log(`
NAME
        ${ME}

SYNOPSIS
        ${ME} <options>

OPTIONS
        --kind      what kind of worker do you want? (${KIND_SCHEDULER}, ${KIND_TEXTER})
        `.trim());
}

main(minimist<Api>(process.argv.splice(2), {
    string: STR_FLAGS,
    boolean: BOOL_FLAGS,
    alias: ALIASES,
    unknown,
}));
