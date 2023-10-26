export const mixinComponentLife = {
    created() {
        console.log("компонент створено");
    },
    unmounted() {
        console.log("компонент знищено");
    },
};
