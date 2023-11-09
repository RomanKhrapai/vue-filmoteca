<template>
    <div class="box-content">
        <v-card class="mx-auto my-12">
            <div class="box">
                <img src="/src/assets/images/camera.jpg" alt="Фільм відсутній">
                <!-- <v-img :src="'/src/assets/images/camera.jpg'"></v-img> -->
                <!-- <v-img :src="require('@/assets/images/camera.jpg')"></v-img> -->
                <!-- require('@/assets/images/logo.svg') -->
            </div>
            <h2>
                ФІЛЬМ НЕ ЗНАЙДЕНО
            </h2>
        </v-card>
    </div>
</template>
   
<style scoped>
h2 {
    font-size: 24px;
    text-align: center;
}

.box-content {
    padding-bottom: 1px;
}

.box {
    display: flex;
    height: calc(100vh - 305px);
    /* padding: 50px; */
}
</style>