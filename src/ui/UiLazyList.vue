<template>
    <div ref="list" style="display: flex;flex-direction: column;">
        <slot v-bind="{onItemLoad, currentItemIndex, root: $refs.list}"/>
    </div>
</template>

<script>
export default {
    name: "UiLazyList",
    data() {
        return {
            currentItemIndex: 0
        }
    },
    methods: {
        onItemLoad(index) {
            if (this.currentItemIndex === null && index === 0) {
                this.changeCurrentItemIndex()
                
                return;
            }
            
            if (index !== this.currentItemIndex) {
                return
            }

            this.changeCurrentItemIndex()
        },
        changeCurrentItemIndex() {
            this.currentItemIndex += 1
        }
    }
};
</script>

<style scoped>

</style>