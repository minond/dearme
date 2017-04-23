export const PHONE_TEST = /^\+1 \d\d\d \d\d\d \d\d\d\d$/;
export const PHONE_MASK = '+1 999 999 9999';

export function valid_phone(phone?: string | null): boolean {
    return !!phone && PHONE_TEST.test(phone);
}
