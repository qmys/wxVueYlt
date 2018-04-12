<template>
    <div class="wxVueYlt-tabbar wxVueYlt-tabbar-fixed">
        <slot />
    </div>
</template>
<script>
    export default {
        name: 'tabbar',
        data(){
            return{
                item:[]
            }
        },
        props:{
            value: Number,
            default: 0
        },
        watch: {
            item() {
                this.setActiveItem();
            },
            value () {
                this.setActiveItem()
            }
        },
        methods:{
            setActiveItem(){
                this.item.forEach((item, index) => {
                     item.active = index === this.value
                })
            },
            onChange(active) {
                this.$emit('input', active);
                this.$emit('change', active);
            }
        }
    }
</script>