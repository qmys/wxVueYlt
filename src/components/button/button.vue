<template>
    <button
        :type="htmlType"
        :class="classes"
        :disabled="disabled"
        @click="handleClick"
    >
        <yltIcon v-if="loading" class="wxVueYlt-load-loop"  type="load-c"></yltIcon>
        <span v-if="showSlot" ref="slot">
            <slot></slot>
        </span>
    </button>
</template>
<script>
    import yltIcon from '../icon/icon.vue'
    import { oneOf } from '../../utils/tool'

    const prefixCls = 'wxVueYlt-btn';
    export default {
        name: 'ylt-Button',
        components: {
            yltIcon
        },
        props: {
            type: {
                validator (value) {
                    return oneOf(value, ['default', 'warn', 'primary', 'plain']);
                }
            },
            htmlType: {
                default: 'button',
                validator (value) {
                    return oneOf(value, ['button', 'submit', 'reset']);
                }
            },
            size: {
                validator (value) {
                    return oneOf(value, ['small']);
                }
            },
            icon: String,
            loading: Boolean,
            disabled: Boolean
        },
        computed: {
            classes () {
                return [
                    `${prefixCls}`,
                    {
                        [`${prefixCls}_${this.type}`]: !!this.type,
                        [`${prefixCls}_loading`]: this.loading != null && this.loading,
                        [`${prefixCls}_${this.size}`]: !!this.size
                    }
                ];
            }
        },
        data () {
            return {
                showSlot: true
            }
        },
        methods: {
            handleClick (event) {
                this.$emit('click', event)
            }
        },
        mounted () {
            this.showSlot = this.$slots.default !== undefined
        }
    }
</script>