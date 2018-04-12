<template>
    <div
        class="wxVueYlt-tabbar-item"
        :class="{ 'wxVueYlt-tabbar-item-active' : active}"
        @click="onClick"
    >
        <div class="wxVueYlt-tabbar-item_icon">
            <slot name="icon" :active="active">
                <i :class="`wxVueYlt-icon wxVueYlt-icon-${icon}`"  v-if="icon"></i>
            </slot>
        </div>
        <div class="wxVueYlt-tabbar-item_text">
            <slot :active="active" />
        </div>
    </div>
</template>
<script>
    export default {
        name: "tabbar-item",
        data () {
          return {
              active: false
          }
        },
        props:{
            icon: String
        },
        beforeCreate(){
          this.$parent.item.push(this)
        },
        methods:{
            onClick(event){
                this.$parent.onChange(this.$parent.item.indexOf(this));
                this.$emit('click', event);
            }
        }
    }
</script>