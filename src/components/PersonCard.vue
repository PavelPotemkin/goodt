<template>
    <div 
        class="card" 
        :class="classObject"
    >
        <div class="card__avatar">
            <avatar :url="person.avatar" />

            <div v-if="person.comments.length"
                 class="card__comments-count">
                {{ person.comments.length }}
            </div>
        </div>

        <div class="card__inner">
            <div
                class="card__name"
                :title="person.name"
            >
                {{ person.name }}
            </div>

            <div
                class="card__email"
                :title="person.email"
            >
                {{ person.email }}
            </div>
        </div>

        <div class="card__controls">
            <span
                class="action-btn card__active-btn"
                @click="onPersonEdit"
            >
                edit
            </span>
        </div>
    </div>
</template>

<script>
import Avatar from "./Avatar";
export default {
    name: "PersonCard",
    components: { Avatar },
    props: {
        person: {
            type: Object,
            required: true
        },
        theme: {
            type: String,
            default: 'light',
            validator(value) {
                return ['dark', 'light'].indexOf(value) !== -1
            }
        }
    },
    methods: {
        onPersonEdit(person) {
            this.$emit("edit", person);
        }
    },
    computed: {
        classObject() {
            return {
                'card_theme_light': this.theme === 'light',
                'card_theme_dark': this.theme === 'dark'
            }
        }
    }
};
</script>

<style lang="pcss" scoped>
.card {
    padding: 1rem;
    box-shadow: 0 1px 3px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    
    &_theme {
        &_dark {
            background-color: var(--color-primary);
            color: var(--color-white);
            
            & .card__active-btn {
                color: var(--color-white);
            }
        }
        
        &_light {
            background-color: var(--color-white);
            color: var(--color-black);
        }
    }

    &__inner {
        overflow: hidden;
    }

    &__avatar {
        position: relative;
        margin-right: 1rem;
    }

    &__email {
        font-size: var(--font-size-small);
    }

    &__name {
        font-weight: bold;
    }

    &__email, &__name {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    &__controls {
        margin-left: auto;
    }

    &__comments-count {
        position: absolute;
        top: -0.55em;
        right: -0.55em;
        background: var(--color-primary);
        width: 1.1em;
        height: 1.1em;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: var(--font-size-small);
        color: var(--color-white);
    }
}

</style>