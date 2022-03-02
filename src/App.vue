<template>
    <div id="app">
        <div class="search-bar">
            <input
                v-model="filterString"
                type="text" 
                class="search-bar-input"
            >
        </div>

        <section>
            <person-group
                v-for="[position, persons] in filteredAndGroupedPersons"
                :key="position"
                :group-name="position"
                :persons="persons"
                @edit="onPersonEdit"
            />
        </section>
        
        <person-edit 
            v-if="isPersonEditMode" 
            v-model="isPersonEditMode" 
            :person="currentEditPerson"
            @change="changePersonData"
        />
    </div>
</template>
<script>
// use this Service class to load data
import ApiService from "./api/service.js";
import PersonGroup from "./components/PersonGroup";
import PersonEdit from "./components/PersonEdit";

export default {
    name: "App",
    components: { PersonEdit, PersonGroup},
    data: () => ({
        persons: [],
        positions: [],
        filterString: "",
        isPersonEditMode: false,
        currentEditPerson: null
    }),
    created() {
        this.fetchPersons();
    },
    provide() {
        return {
            getPositions: () => this.positions
        }
    },
    computed: {
        filteredPersons() {
            if (this.filterString) {
                return this.persons.filter(person => {
                    const { name, email } = person;
                    const strArr = [...name.split(" "), ...email.split("@")];

                    return strArr.find(str => {
                        return str.toLowerCase().includes(this.filterString.toLowerCase());
                    });
                });
            }

            return this.persons;
        },
        filteredAndGroupedPersons() {
            const groupedPersons = this.filteredPersons.reduce((acc, person) => {
                acc[person.position] = acc[person.position] || [];
                acc[person.position].push(person);

                return acc;
            }, {});

            return Object.entries(groupedPersons);
        }
    },
    methods: {
        async fetchPersons() {
            this.persons = await new ApiService().getPersons();
            const positions = []
            this.persons.forEach(person => positions.push(person.position))
            
            this.positions = [...(new Set(positions))]
        },
        onPersonEdit(person) {
            this.currentEditPerson = person
            this.isPersonEditMode = true;
        },
        changePersonData(person) {
            let changedPerson = this.persons.find(p => p.id === person.id)
            const changedPersonIndex = this.persons.indexOf(changedPerson)
            
            this.persons.splice(changedPersonIndex, 1, person)
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
