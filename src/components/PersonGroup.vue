<template>
    <div class="person-group">
        <h2 class="person-group__title">{{ groupName }}</h2>

        <div class="person-group__list">
            <component
                v-for="person in persons"
                :key="person.id"
                :is="getComponent()"
                :person="person"
                @edit="onPersonEdit(person)"
            />
        </div>
    </div>
</template>

<script>
import PersonCard from "./PersonCard";
import PersonCardManager from "./PersonCardManager";

export default {
    name: "PersonGroup",
    components: { PersonCard, PersonCardManager },
    data() {
        return {
            componentsInfo: {
                'manager': PersonCardManager
            },
            defaultComponent: PersonCard
        }
    },
    created() {
        console.log('AAAAAAAAAAAA');
    },
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
        },
        getComponent() {
            const componentType = this.componentsInfo[this.groupName.toLowerCase()]
            return componentType ? componentType : this.defaultComponent
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