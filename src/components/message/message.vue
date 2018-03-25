<template>
    <transition name="wxVueYlt-message-pop">
        <div class="wxVueYlt-message" v-show="visible" :class="classPosition" :style="{ 'padding': iconClass=== '' ? '10px' : '20px'}">
            <i class="wxVueYlt-message-icon"></i>
            <span class="wxVueYlt-message-text">{{ message }}</span>
        </div>
    </transition>
</template>
<script type="text/babel">
    export default {
        props: {
            message: String,
            className: {
                type: String,
                default: ''
            },
            position: {
                type: String,
                default: 'middle'
            },
            iconClass: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                visible: false
            }
        },
        computed: {
            classPosition() {
                let classes = []
                switch (this.position) {
                    case 'top':
                        classes.push('placetop')
                        break
                    case 'bottom':
                        classes.push('placebottom')
                        break
                    default:
                        classes.push('placemiddle')
                }
                classes.push(this.className)
                return classes.join(' ')
            }
        }
    }
</script>