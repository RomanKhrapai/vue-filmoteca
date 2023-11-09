export const nameValidation = (str) => {
    if (str.length <= 2) return "логін занадто короткий";
    if (str.length >= 20) return "логін занадто довгий";
    if (/[. _ / \\ |]/g.test(str)) return `не має включати символы . _ / \\ | `;
    return null;
};
export const emailValidation = (str) => {
    if (str?.trim().length === 0) return "Введіть пошту";
    const arr = str.split("@");
    if (arr.length !== 2 || arr[1].split(".").length !== 2)
        return "повинен бути формат text@text.text";
    return null;
};
export const ageValidation = (num) => {
    if (num.trim() === "") return "Введіть число";
    if (!Number.isFinite(+num)) return "може бути лише числом";
    if (+num >= 150) return "повинне бути більше 150";
    if (+num <= 5) return "повинне бути більше пяти";
    return null;
};
export const pageValidation = (num) => {
    if (String(num).trim() === "") return "поле номеру сторінки пусте";
    if (!Number.isFinite(+num)) return "сторінка має бути числом";
    return null;
};
export const passwordValidation = (str) => {
    if (!str?.trim()) return "пароль не може бути пустим";
    if (str.length < 6) return "має бути більше 6 символів";
    if (str.toLowerCase() === str) return "має бути хоча б одна велика буква";
    if (!str.split("").some((e) => Number.isFinite(+e) && e !== " "))
        return "має бути хоч одна цифра";
    return null;
};

export const isRequired = (val) => {
    return !val?.trim() ? "поле не може бути пустим" : null;
};

export const charLimit = (limit) => (val) => {
    return val.length <= limit ? "потрібно більше символів" : null;
};

export default {
    isRequired,
    charLimit,
    nameValidation,
    emailValidation,
    passwordValidation,
    ageValidation,
};
