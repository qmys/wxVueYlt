<template>
    <div :class="wrapClasses">
        <input
            :type="type"
            :class="inputClasses"
            :placeholder="placeholder"
            :name="name"
            :maxlength="maxlength"
            :autofocus="autofocus"
            :disabled="disabled"
            :readonly="readonly"
            :value="currentValue"
            @change="handleChange"
            @focus="handleFocus"
            @blur="handleBlur"
        />
    </div>
</template>
<script>
    import { oneOf } from '../../utils/tool'
    const prefixCls = 'wxVueYlt-input'

    export default {
        name: 'ylt-Input',
        props: {
            type: {
                validator (value) {
                    return oneOf(value, ['text', 'textarea', 'password', 'url', 'email', 'date']);
                },
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            },
            readonly: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            maxlength: {
                type: Number
            },
            name: {
                type: String
            },
            autofocus: {
                type: Boolean,
                default: false
            },
            icon: String
        },
        data () {
           return {
               currentValue: this.value
           }
        },
        computed: {
            wrapClasses () {
                return [
                    `${prefixCls}_wrapper`,
                    {
                        [`${prefixCls}_${this.type}`]: this.type
                    }
                ]
            },
            inputClasses () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}-disabled`]: this.disabled
                    }
                ]
            }
        },
        methods: {
            handleChange(event) {
                this.$emit('on-change', event)
            },
            handleFocus(event) {
                this.$emit('on-focus', event)
            },
            handleBlur(event) {
                this.$emit('on-blur', event)
            }
        }
    }
</script>