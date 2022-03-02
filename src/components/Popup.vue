<template>
    <div class="popup">
        <div class="dialog">
            <div class="dialog-header">
                <slot name="header"></slot>
            </div>
            <div class="dialog-body">
                <slot name="body"></slot>
            </div>
            <div class="dialog-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>
<style lang="pcss" scoped>
.popup {
    position: fixed;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(255, 255, 255, 0.75);
    .dialog {
        width: auto;
        max-width: 50rem;
        background: var(--color-white);
        box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.25);
        &-header {
            padding: 1.25rem 1.5rem;
            border-bottom: 1px solid var(--color-grey);
        }
        &-body {
            padding: 1.5rem;
        }
        &-footer {
            padding: 0 1.5rem 1.5rem 1.5rem;
        }
    }
}
</style>
