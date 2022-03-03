<template>
    <person-card :person="person" theme="dark"/>
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
};
</script>

<style scoped>

</style>