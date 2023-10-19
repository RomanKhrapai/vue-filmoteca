<template>
    <div class='toggle-switch'>
        <label>
            <input type='checkbox'>
            <span class='slider'></span>
        </label>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            isNightMode: false,
        };
    },
    methods: {
        toggleMode() {
            this.isNightMode = !this.isNightMode;

        },
    },
};
</script>
  
<style scoped>
.toggle-switch {
    position: fixed;
    bottom: 50px;
    right: 10px;
    width: 50px;
}

label {
    position: absolute;
    width: 100%;
    height: 100px;
    background-color: #333333;
    border-radius: 50px;
    cursor: pointer;
}

input {
    position: absolute;
    display: none;
}

.slider {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50px;
    transition: 0.3s;
}

input:checked~.slider {
    background-color: #b7b1b1;
}

.slider::before {
    content: "";
    position: absolute;
    top: 13px;
    left: 16px;
    width: 75px;
    height: 75px;
    border-radius: 50%;
    box-shadow: inset 28px -4px 0px 0px #fff;
    background-color: #000;
    transition: 0.3s;
}

input:checked~.slider::before {
    transform: translateX(95px);
    background-color: #333;
    box-shadow: none;
}
</style>