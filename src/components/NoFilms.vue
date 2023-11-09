<template>
    <div class="box-content">
        <v-card class="mx-auto my-12">
            <div class="box">
                <v-img :width="500" :src="'/assets/images/camera.jpg'">
                </v-img>
            </div>

            <h2>
                ФІЛЬМІВ НЕ ЗНАЙДЕНО
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
    height: calc(100vh - 300px);
    /* padding: 50px; */
}
</style>