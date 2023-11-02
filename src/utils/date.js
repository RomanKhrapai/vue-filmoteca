export const formatDate = (date) => {
    const days = {
        0: { min: "Пн", full: "Понеділок" },
        1: { min: "Вт", full: "Вівторок" },
        2: { min: "Ср", full: "Середа" },
        3: { min: "Чт", full: "Четвер" },
        4: { min: "Пт", full: "Пятниця" },
        5: { min: "Сб", full: "Субота" },
        6: { min: "Нд", full: "Неділля" },
    };
    const monthes = {
        0: { min: "Січ", full: "Січень" },
        1: { min: "Лют", full: "Лютий" },
        2: { min: "Берез", full: "Березень" },
        3: { min: "Квіт", full: "Квітень" },
        4: { min: "Трав", full: "Травень" },
        5: { min: "Черв", full: "Червень" },
        6: { min: "Лип", full: "Липень" },
        7: { min: "Серп", full: "Серпень" },
        8: { min: "Верес", full: "Вересень" },
        9: { min: "Жовт", full: "Жовтень" },
        10: { min: "Листоп", full: "Листопад" },
        11: { min: "Груд", full: "Грудень" },
    };

    const m = monthes[date.getMonth()].min;
    const d = days[date.getDay()].min;

    let dd = date.getDate();
    if (dd < 10) dd = "0" + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = "0" + mm;

    let yyyy = date.getFullYear();

    let min = date.getMinutes();
    if (min < 10) min = "0" + min;

    let hour = date.getHours();
    if (hour < 10) hour = "0" + hour;

    return [
        dd + "." + mm + "." + yyyy + " " + hour + ":" + min,
        d + ". " + dd + " " + m + ". " + hour + ":" + min,
        d + ". " + dd + " ",
        hour + ":" + min,
    ];
};
