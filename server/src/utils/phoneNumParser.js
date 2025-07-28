import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function toE164(phone, defaultCountry = 'PH') {
        const phoneNumber = parsePhoneNumberFromString(phone, defaultCountry);
        return phoneNumber ? phoneNumber.number : null;
}