<template>
    <div class="person-group">
        <h2 class="person-group__title">{{ groupName }}</h2>

        <div class="person-group__list">
            <person-card
                v-for="person in persons"
                :key="person.id" 
                :person="person"
                @edit="onPersonEdit(person)"
            />
        </div>
    </div>
</template>

<script>
import PersonCard from "./PersonCard";

export default {
    name: "PersonGroup",
    components: { PersonCard },
    props: {
        groupName: {
            type: String,
            required: true
        },
        persons: {
            type: Array,
            required: true
        }
    },
    methods: {
        onPersonEdit(person) {
            this.$emit("edit", person);
        }
    }
};
</script>

<style lang="pcss" scoped>
.person-group {
    margin-bottom: 2rem;

    &__title {
        margin-bottom: 1rem;
    }
    
    &__list {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    }
}
</style>