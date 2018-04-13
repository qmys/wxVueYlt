<template>
    <div class="wxVueYlt-tab_pane" :class="{'wxVueYlt-tab_paneSelect':index === parent.curActive }">
        <slot />
    </div>
</template>
<script>
    import findParent from '../../mixins/find-parent'
    export default {
        name:'ylt-Tab',
        mixins: [findParent],
        props: {
            title: String
        },
        computed: {
            index () {
                return this.parent.tabs.indexOf(this)
            }
        },
        created() {
            /**
             * 调用混入对象里面的方法
             * **/
            this.findParent('ylt-tabs')
            this.parent.tabs.push(this)
        }
    }
</script>