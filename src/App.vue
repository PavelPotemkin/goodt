<template>
    <div id="app">
        <div class="search-bar">Здесь будет строка поиска</div>

        <section>
            <template>
                <div class="person-group">
                    <!-- Отображать название группы -->
                    <div class="list">
                        <template v-for="person in filteredPersons">
                            <div class="card">
                                <table style="width: 100%">
                                    <tr>
                                        <td style="width: 0">
                                            <div class="card-avatar">
                                                <card-avatar :url="person.avatar"></card-avatar>
                                                <div v-if="person.comments != null">
                                                    {{ person.comments.length }}
                                                </div>
                                            </div>
                                        </td>
                                        <td style="max-width: 0">
                                            <div class="card-name">
                                                <b>{{ person.name }}</b>
                                            </div>
                                            <div class="card-email">{{ person.email }}</div>
                                        </td>
                                        <td style="width: 0">
                                            <span class="action-btn" @click="onPersonEdit">edit</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </template>
                    </div>
                </div>
            </template>
        </section>

        <ui-popup v-if="isPersonEditMode">
            <template #header>
                <h3>Имя Фамилия Сотрудника</h3>
            </template>
            <template #body>
                <div class="form">
                    <div class="form-elem">
                        <label class="form-elem-label">name</label>
                        <input type="text" />
                    </div>
                    <div class="form-elem">
                        <label class="form-elem-label">email</label>
                        <input type="text" />
                    </div>
                    <div class="form-elem">
                        <label class="form-elem-label">position</label>
                        <select>
                            <option v-for="value in positions" :value="value">{{ value }}</option>
                        </select>
                    </div>
                </div>
            </template>
            <template #footer>
                <div class="popup-btn-group">
                    <button class="outline" @click="onPersonEdit">Отменить</button>
                    <button @click="onPersonEdit">Сохранить</button>
                </div>
            </template>
        </ui-popup>
    </div>
</template>
<script>
// use this Service class to load data
import ApiService from './api/service.js';
import UiPopup from './components/Popup.vue';
import CardAvatar from './components/Avatar.vue';
import persons from './api/data';

export default {
    name: 'App',
    components: { UiPopup, CardAvatar },
    data: () => ({
        persons: persons,
        positions: [],
        isPersonEditMode: false
    }),
    computed: {
        /**
         * @return {import('./api/service.js').Person[]}
         */
        filteredPersons() {
            return this.persons;
        }
    },
    methods: {
        async fetchPersons() {
            // Use ApiService `getPersons` call here to load data
            this.persons = persons ;
        },
        onPersonEdit() {
            this.isPersonEditMode = !this.isPersonEditMode;
        }
    }
};
</script>
<style lang="pcss" scoped>
.search-bar {
    margin-bottom: 1rem;
    &-input {
        width: 100%;
    }
}
.person-group {
    margin-bottom: 2rem;

    &-name {
        margin-bottom: 1rem;
    }
}
.popup-btn-group {
    text-align: right;
    button {
        margin-left: 1rem;
    }
}
.action-btn {
    color: var(--color-primary);
    font-size: var(--font-size-small);
    line-height: 1;
    border-bottom: 1px dashed currentColor;
    cursor: pointer;
}
.list {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
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
.card {
  padding: 1rem;
  background: white;
  box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);
  &-avatar {
    position: relative;
    margin-right: 1rem;
    &-email {
      font-size: var(--font-size-small);
    }
    &-email,
    &-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
