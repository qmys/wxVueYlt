<template>
    <label class="wxVueYlt-switch">
        <input class="wxVueYlt-switch-input"
               type="checkbox"
               :disabled="disabled"
               v-model="currentValue"
        />
        <span class="wxVueYlt-switch-core"></span>
        <div class="wxVueYlt-switch-label">
            <slot></slot>
        </div>
    </label>
</template>
<script>
    export default {
        name: 'ylt-Switch',
        props: {
            value: Boolean,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            currentValue: {
                get() {
                    return this.value
                },
                set(val) {
                    this.$emit('input',val)
                }
            }
        }
    }
</script>