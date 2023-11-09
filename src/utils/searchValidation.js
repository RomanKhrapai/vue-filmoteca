export const searchValidation = (value) => {
    const str = value.replace(/[{}[\]\%/\\&\?\,\|'\;:+!@#\$\^*)(]/g, "");
    if (!str?.trim()) {
        return {
            value: str,
            error: true,
            errorMessage: "поле не може бути пустим",
        };
    }

    return {
        value: str,
        error: false,
        errorMessage: null,
    };
};
