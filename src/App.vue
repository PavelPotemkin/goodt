<template>
    <div id="app">
        <template v-if="isDataLoading">
            Загрузка
        </template>

        <template v-else>
            <person-search v-model="filterString"/>

            <section>
                <template v-if="filteredAndGroupedPersons.length">
                    <ui-lazy-list>
                        <template v-slot:default="{currentItemIndex, onItemLoad, root}">
                            <template
                                v-for="([position, persons], index) in filteredAndGroupedPersons"
                            >
                                <ui-lazy
                                    v-if="(currentItemIndex >= index)"
                                    :root="root"
                                    :key="position"
                                    @load="onItemLoad(index)"
                                >
                                    <person-group
                                        :group-name="position"
                                        :persons="persons"
                                        @edit="onPersonEdit"
                                    />
                                </ui-lazy>
                            </template>
                        </template>
                    </ui-lazy-list>
                </template>
                
                <template v-else>
                    Нет данных
                </template>
            </section>

            <person-edit
                v-if="isPersonEditMode"
                v-model="isPersonEditMode"
                :person="currentEditPerson"
                @change="changePersonData"
            />
        </template>
    </div>
</template>
<script>
// use this Service class to load data
import ApiService from "./api/service.js";
import PersonGroup from "./components/PersonGroup";
import PersonEdit from "./components/PersonEdit";
import PersonSearch from "./components/PersonSearch";
import UiLazyList from "./ui/UiLazyList";
import UiLazy from "./ui/UiLazy";

export default {
    name: "App",
    components: { UiLazy, UiLazyList, PersonSearch, PersonEdit, PersonGroup},
    data: () => ({
        persons: [],
        positions: [],
        filterString: "",
        isPersonEditMode: false,
        currentEditPerson: null,
        isDataLoading: true,
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
            this.isDataLoading = false
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

</style>
