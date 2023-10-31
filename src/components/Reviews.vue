<template>
    <div v-if="reviewsItems">
        <h3>Коментарі</h3>
        <ul class="reviews_list">
            <li v-for="item, i in partOrFullReviews" class=" reviews_item" @click="openDialog(i, 200)">
                <div class=" reviews_foto-box">
                    <img v-if="item.avatar" class="reviews_foto" width="60" height="60" :src="item.avatar" alt="foto">
                    <img v-if="!item.avatar" class="reviews_foto" width="60" height="60" :src="item.avatar" alt="foto">
                </div>
                <div class=" reviews_body">
                    <div class="reviews_item-header"><span class=" reviews_name">{{ item.author }}</span><span
                            class=" reviews_time">{{ item.date
                            }}</span></div>
                    <div> {{ shotContent(item.content, 200) }}</div>
                </div>
            </li>
        </ul>

        <div class="reviews_control">
            <div>
                <v-btn v-if="!isShowMore && !isLengthReviewsEnough" color="primary" block
                    @click="isShowMore = true">Показати
                    всі коментарі</v-btn>
                <v-btn v-if="isShowMore" color="primary" block @click="isShowMore = false">Приховати коментарі</v-btn>
            </div>
        </div>

        <v-dialog v-model="isShowDialog" width="auto">
            <v-card>
                <v-card-text>
                    {{ reviewsItems[index].content }}
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="isShowDialog = false">Закрити</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>


<script>
import { useReviewsStore } from '../store/reviewsStore';
import { mapState } from 'pinia';
export default {
    data() {
        return {
            isShowDialog: false,
            index: null,
            isShowMore: false,

        }
    },
    methods: {
        openDialog(index, max) {
            if (this.reviewsItems[index].content.length > max) {
                this.isShowDialog = true;
                this.index = index;
            }
        },

        shotContent(text, max = 50) {
            if (text.length > max) {
                return text.substring(0, max) + "..."
            }
            return text;
        }
    },
    computed: {
        ...mapState(useReviewsStore, ["reviewsItems"]),
        isLengthReviewsEnough() { this.reviewsItems.length >= 3 },
        partOrFullReviews() {
            if (this.isLengthReviewsEnough) {
                isShowMore = true;
            }
            const arr = [...this.reviewsItems]
            return this.isShowMore ? this.reviewsItems : arr.splice(0, 3);
        }
    }
}
</script>

<style>
.reviews_list {
    padding: 10px 20px;
}

.reviews_item {
    display: flex;
    padding: 5px 10px;
    margin-bottom: 10px;
    border-color: #00000012;
    border-style: solid;
    border-width: 0;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
}

.reviews_control {
    display: flex;
    justify-content: center;
    margin-top: -10px;
    margin-bottom: 20px;

}

.reviews_item-header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.reviews_body {
    width: 100%;
}

.reviews_time {
    font-size: small;
    font-style: italic;
}

.reviews_name {
    font-weight: 600;
}

.reviews_foto {
    border-radius: 30px;
}

.reviews_foto-box {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
}
</style>