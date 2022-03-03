<template>
    <ui-popup v-model="value">
        <template #header>
            <h3>Имя Фамилия Сотрудника</h3>
        </template>
        
        <template #body>
            <form 
                class="form" 
                @submit="saveData"
            >
                <div class="form__inner">
                    <div class="form__elem">
                        <label class="form__label">
                            name
                        </label>

                        <input
                            v-model="personData.name"
                            @input="onPersonDataChange"
                            type="text"
                        />
                    </div>

                    <div class="form__elem">
                        <label class="form__label">
                            email
                        </label>

                        <input
                            v-model="personData.email"
                            @input="onPersonDataChange"
                            type="text"
                        />
                    </div>

                    <div class="form__elem">
                        <label class="form__label">
                            position
                        </label>

                        <select
                            v-model="personData.position"
                            @change="onPersonDataChange"
                        >
                            <option
                                v-for="value in positions"
                                :value="value"
                                :key="value"
                            >
                                {{ value }}
                            </option>
                        </select>
                    </div>
                </div>
                
                <div class="form__buttons">
                    <button
                        type="button"
                        class="outline"
                        @click="checkDataChange"
                    >
                        Отменить
                    </button>

                    <button
                        type="submit"
                        :disabled="!isPersonDataChange"
                    >
                        Сохранить
                    </button>
                </div>
            </form>
            
            <ui-popup v-model="confirmChangePopupDisplay">
                <template #header>
                    <h3>Точно хотите отменить изменения</h3>
                </template>

                <template #footer="{hide}">
                    <div class="form__buttons">
                        <button
                            class="outline"
                            @click="closeModal"
                        >
                            Да
                        </button>

                        <button @click="hide">
                            Нет
                        </button>
                    </div>
                </template>
            </ui-popup>
        </template>
    </ui-popup>
</template>

<script>
import UiPopup from "../ui/UiPopup";
export default {
    name: "PersonEdit",
    components: { UiPopup },
    props: {
        value: {
            type: Boolean,
            required: true
        },
        person: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            confirmChangePopupDisplay: false,
            isPersonDataChange: false,
            personData: null,
            positions: this.getPositions()
        }
    },
    created() {
        this.personData = JSON.parse(JSON.stringify(this.person))
    },
    inject: ['getPositions'],
    methods: {
        saveData(event) {
            event.preventDefault()
            
            if (!this.isPersonDataChange || !this.isFormValid) {
                return
            }
            this.$emit('change', this.personData)
            this.$emit('input', false)
        },
        checkDataChange() {
            if (this.isPersonDataChange) {
                this.confirmChangePopupDisplay = true
                return
            }
            
            this.closeModal()
        },
        closeModal() {
            this.$emit('input', false)            
        },
        onPersonDataChange() {
            this.isPersonDataChange = true
        }
    },
    computed: {
        isFormValid () {
            if (!this.personData) {
                return false
            }

            const validateEmail = (email) => {
                return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
            };
            
            const validateName = (name) => {
                return String(name)
                .toLowerCase()
                .match(/[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё][\S]*\s[A-Za-zА-ЯЁа-яё][A-Za-zА-ЯЁа-яё][\S]*/ig)
            }
            
            const {name, email, position} = this.personData
            
            if (!validateEmail(email)) {
                console.log('email');
                return false
            }
            
            if (!position) {
                console.log('position');
                return false
            }
            
            if (!validateName(name)) {
                console.log('name');
                return false
            }
            
            return true
        }
    }
};
</script>

<style scoped>
.form {
    width: 25rem;

    &__elem {
        margin-bottom: 1rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
    
    &__label {
        display: block;
        font-size: var(--font-size-small);
        text-transform: uppercase;
        opacity: 0.5;
    }
    
    &__buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 2em;
    }
}
</style>