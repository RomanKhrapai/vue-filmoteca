<template>
    <div v-if="reviewsItems">
        <div class="reviews_header">
            <h3 class="reviews_title">Коментарі</h3>
            <v-btn v-if="isAuthorized" size="small" icon @click="changeReview()">
                <span class="mdi mdi-plus reviews_btn-text"></span>
            </v-btn>
        </div>

        <ul class="reviews_list">
            <li v-for="item, i in partOrFullReviews" class=" reviews_item" @click="openDialog(i, 200)">
                <div class=" reviews_foto-box">
                    <img v-if="item.avatar" class="reviews_foto" width="60" height="60" :src="item.avatar" alt="foto">
                    <img v-if="!item.avatar" class="reviews_foto" width="60" height="60"
                        src="../assets/images/avatar_img.jpg" alt="foto">
                </div>
                <div class=" reviews_body">
                    <div class="reviews_item-header">
                        <span class=" reviews_name">{{ item.author }}
                            <v-btn v-if="isOwner(item?.uid)" variant="text" @click.stop="changeReview(i)">
                                <span class="mdi mdi-fountain-pen-tip reviews_btn-text"></span>
                            </v-btn>
                            <v-btn v-if="isOwner(item?.uid)" variant="text" @click.stop="removeReview(item.id, id)">
                                <span class="mdi mdi-trash-can-outline reviews_btn-text"></span>
                            </v-btn>
                        </span>
                        <span class=" reviews_time">{{ item.date
                        }}</span>
                    </div>
                    <div :innerHTML="shotContent(item.content, 200)"> </div>
                </div>

            </li>
        </ul>

        <div class="reviews_control">
            <div>
                <v-btn v-if="!isShowMore && isLengthReviewsEnough" color="primary" block @click="isShowMore = true">Показати
                    всі коментарі</v-btn>
                <v-btn v-if="isShowMore && isLengthReviewsEnough" color="primary" block
                    @click="isShowMore = false">Приховати
                    коментарі</v-btn>
            </div>
        </div>

        <v-dialog v-model="isShowDialog" width="auto">
            <v-card>
                <v-card-text :innerHTML="reviewsItems[index].content">

                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="isShowDialog = false">Закрити</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <Modal v-if="isShowModal" @close="isShowModal = false">
            <template v-slot:header>
                <h3>Редактор коментарів</h3>
            </template>
            <template v-slot:body>
                <div class="modal_body">
                    <QuillEditor theme="snow" :toolbar="toolbar" v-model:content="content" contentType="html" />
                </div>
            </template>
            <template v-slot:footer="slotProps">
                <v-btn @click="checkReview">
                    Зберегти
                </v-btn>
                <v-btn @click="() => isShowModal = false">
                    {{ slotProps.btnCloseText }}
                </v-btn>
            </template>
        </Modal>
    </div>
</template>


<script>
import Modal from './shared/Modal.vue';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { useReviewsStore } from '../store/reviewsStore';
import { useAuthStore } from '../store/authStore';
import { mapState, mapActions } from 'pinia';
export default {
    props: ['id'],
    components: { Modal, QuillEditor },
    data() {
        return {
            isShowDialog: false,
            index: null,
            isShowMore: false,
            isShowModal: false,
            curentReview: null,
            content: "",
            toolbar: [
                [{ size: ['small', false, 'large'] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link'],
                ['clean'],
            ]

        }
    },
    methods: {
        ...mapActions(useReviewsStore, ["removeReview", 'saveReview']),
        openDialog(index, max) {
            if (this.reviewsItems[index].content.length > max) {
                this.isShowDialog = true;
                this.index = index;
            }
        },
        changeReview(i) {
            this.isShowModal = true;
            if (Number.isInteger(i)) {
                this.curentReview = this.reviewsItems[i];
                this.content = this.reviewsItems[i].content;
            } else {
                this.curentReview = null;
                this.content = '';
            }
        },
        checkReview() {
            if (this.content?.trim() === '') {
                console.log(this);
                this.$toast.success("I'm a toast!")
                this.$toast("I'm a toast!");
                this.$toast.warning("Поле вводу коментарів не може бути пустим!");
                return
            }
            this.saveReview(this.content, this.id, this.curentReview?.id)
            this.isShowModal = false
        },
        shotContent(text, max = 50) {
            if (text.length > max) {
                return text.substring(0, max) + "..."
            }
            return text;
        },
        isOwner(uid) {
            return uid === this.uid
        },

    },
    computed: {
        ...mapState(useReviewsStore, ["reviewsItems"]),
        ...mapState(useAuthStore, ["isAuthorized", "uid"]),
        isLengthReviewsEnough() {
            return this.reviewsItems.length > 3
        },
        partOrFullReviews() {
            if (!this.isLengthReviewsEnough) {
                this.isShowMore = true;
            }
            const arr = [...this.reviewsItems]
            return this.isShowMore ? this.reviewsItems : arr.splice(0, 3);
        },

    },
}
</script>

<style>
.reviews_btn-text {
    font-size: 25px;
}

.reviews_header {
    display: flex;
    align-items: center;
    padding: 0 20px 0 30px;
    margin-top: 20px;
}

.reviews_title {
    margin-right: 20px;
}

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

.modal_body {
    width: 100%;
    margin-bottom: 40px;
    max-height: calc(70hv - 100px);
}

.modal-footer {
    display: flex;
    justify-content: space-evenly;
}
</style>