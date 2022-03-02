<template>
    <img class="avatar" :src="imgUrl" alt="avatar" ref="img" />
</template>

<script>
export default {
    props: {
        url: { type: String }
    },
    data: () => ({ imgUrl: '' }),
    watch: {
        url: {
            handler(val) {
                this.imgUrl = val;
            },
            immediate: true
        }
    },
    mounted() {
        this.$refs.img.addEventListener('error', this.onError);
    },
    beforeDestroy() {
        this.$refs.img.removeEventListener('error', this.onError);
    },
    methods: {
        onError() {
            this.imgUrl = '/avatar.webp';
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
