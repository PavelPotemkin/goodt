<template>
    <person-card :person="person"/>
</template>

<script>
import PersonCard from "./PersonCard";
export default {
    name: "PersonCardManager",
    components: { PersonCard },
    props: {
        person: {
            type: Object,
            required: true
        }
    },
    provide() {
        return {
            theme: 'dark'
        }
    }
};
</script>

<style scoped>

</style>