<template>
    <transition>
        <div id="toast">
            <div class="wxVueYlt-mask_transparent"></div>
            <div class="wxVueYlt-toast">
                <i></i>
                <p class="wxVueYlt-toast_content">{{message}}</p>
            </div>
        </div>
    </transition>
</template>
<script>
    export default {
        name: 'Message',
        props: {
            message: String
        },
        data () {
            debugger
        }
    }
</script>