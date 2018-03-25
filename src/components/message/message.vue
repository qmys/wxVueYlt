<template>
    <transition name="mint-toast-pop">
        <div class="mint-toast" v-show="visible">
            <i class="mint-toast-icon"></i>
            <span class="mint-toast-text">{{ message }}</span>
        </div>
    </transition>
</template>
<script type="text/babel">
    export default {
        props: {
            message: String
        },
        data () {
            return {
                visible: false
            }
        }
    }
</script>
<style>

</style>