<template>
    <div class="search-bar">
        <input
            placeholder="Search by first/last"
            :value="value"
            @input="changeValue"
            type="text"
            class="search-bar-input"
        >
    </div>
</template>

<script>
export default {
    name: "PersonSearch",
    props: {
        value: {
            type: String,
            required: true
        }
    },
    methods: {
        changeValue(event) {
            this.$emit('input', event.target.value)
        }
    }
};
</script>

<style lang="pcss" scoped>
.search-bar {
    margin-bottom: 1rem;
}

.search-bar-input {
    width: 100%;
}
</style>