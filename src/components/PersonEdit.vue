<template>
    <ui-popup v-model="value">
        <template #header>
            <h3>Имя Фамилия Сотрудника</h3>
        </template>
        
        <template #body>
            <div class="form">
                <div class="form-elem">
                    <label class="form-elem-label">
                        name
                    </label>
                    
                    <input 
                        v-model="personData.name" 
                        @change="onPersonDataChange" 
                        type="text" 
                    />
                </div>
                
                <div class="form-elem">
                    <label class="form-elem-label">
                        email
                    </label>
                    
                    <input
                        v-model="personData.email"
                        @change="onPersonDataChange" 
                        type="text" 
                    />
                </div>
                
                <div class="form-elem">
                    <label class="form-elem-label">
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
            
            <ui-popup v-model="confirmChangePopupDisplay">
                <template #header>
                    <h3>Точно хотите отменить изменения</h3>
                </template>

                <template #footer="{hide}">
                    <div class="popup-btn-group">
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
        
        <template #footer>
            <div class="popup-btn-group">
                <button 
                    class="outline" 
                    @click="checkDataChange"
                >
                    Отменить
                </button>
                
                <button 
                    :disabled="!isPersonDataChange" 
                    @click="saveData"
                >
                    Сохранить
                </button>
            </div>
        </template>
    </ui-popup>
</template>

<script>
import UiPopup from "./UiPopup";
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
        saveData() {
            if (!this.isPersonDataChange) {
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
    }
};
</script>

<style scoped>
.popup-btn-group {
    display: flex;
    justify-content: space-between;
}

.form {
    width: 25rem;

    &-elem {
        margin-bottom: 1rem;

        &:last-child {
            margin-bottom: 0;
        }

        &-label {
            display: block;
            font-size: var(--font-size-small);
            text-transform: uppercase;
            opacity: 0.5;
        }
    }
}
</style>