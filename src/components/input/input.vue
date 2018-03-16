<template>
    <div :class="wrapClasses">
        <input
            :type="type"
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
            }
        }
    }
</script>