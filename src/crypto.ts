import { createCipher, createDecipher } from 'crypto';

interface Stream {
    final(enc: string): string;
    update(data: string, enc1: string, enc2: string): string;
}

const ALGORITHM = 'aes-256-ctr';

function evaluate(f1: string, f2: string, text: string, obj: Stream): string {
    return obj.update(text, f1, f2) + obj.final(f2);
}

export function encrypt(text: string, key: string) {
    return evaluate('utf8', 'hex', text, createCipher(ALGORITHM, key));
}

export function decrypt(text: string, key: string) {
    return evaluate('hex', 'utf8', text, createDecipher(ALGORITHM, key));
}
