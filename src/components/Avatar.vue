<template>
    <img 
        class="avatar" 
        :src="imgUrl" 
        alt="avatar" 
        ref="img" 
        @error="onError"
        @load="onLoad"
    />
</template>

<script>
export default {
    props: {
        url: { type: String }
    },
    data() {
        return { 
            imgUrl: '',
            isImageLoad: false
        }
    },
    watch: {
        url: {
            handler(val) {
                this.imgUrl = val;
            },
            immediate: true
        }
    },
    mounted() {
        // Картинки очень долго грузятся поэтому я сделал такой таймер на 2 секунды, чтобы, 
        // если за 2 секунды картинки не загрузилиьс, тогда я меняю изображения на заглушки
        setTimeout(() => {
            if (!this.isImageLoad) {
                this.onError()
            }
        }, 2000)
    },
    methods: {
        onError() {
            this.imgUrl = '/avatar.webp';
        },
        onLoad() {
            this.isImageLoad = true
        }
    }
};
</script>

<style scoped>
.avatar {
    display: block;
    width: 4rem;
    height: 4rem;
    border-radius: var(--border-radius-round);
    object-fit: cover;
}
</style>
