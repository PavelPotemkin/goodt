<template>
    <div ref="lazy">
        <slot/>
    </div>
</template>

<script>
export default {
    name: "UiLazy",
    props: ['root'],
    data() {
        return {
            options: {
                root: this.root,
                rootMargin: '0px',
                threshold: 0.1
            },
            observer: new IntersectionObserver((event) => {
                if (event[0].isIntersecting) {
                    this.onLoad()
                }
            }, this.options)
        }
    },
    mounted() {
        this.observer.observe(this.$refs.lazy)
    },
    beforeDestroy() {
        this.observer.unobserve(this.$refs.lazy)
    },
    methods: {
        onLoad() {
            this.$emit('load')
        }
    }
};
</script>

<style scoped>

</style>