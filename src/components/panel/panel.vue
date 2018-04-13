<template>
    <div class="wxVueYlt-panel">
        <div class="wxVueYlt-panel_content">
            <slot />
        </div>
        <div class="wxVueYlt-panel_footer" v-if="$slots.footer">
            <slot name="footer" />
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ylt-Panel'
    }
</script>