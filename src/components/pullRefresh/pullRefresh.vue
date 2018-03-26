<template>
    <div class="wxVueYlt-pullRefresh">
        <div
            class="wxWueYlt-pullRefresh_track"
            :style="style"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
        ></div>
    </div>
</template>
<script>
    import scrollUtils from '../../utils/scroll'
    export default {
        name: 'ylt-Pull-Refresh',
        data () {
            return {
                status: 'normal',
                height: 0,
                duration: 0
            }
        },
        computed: {
            style () {
                return {
                    transform: `translate3d(0, ${this.height}px, 0)`,
                    transition: `${this.duration}ms`
                }
            }
        },
        mounted () {
            this.scrollEl = scrollUtils.getScrollEventTarget(this.$el)
        },
        methods: {
            getCeiling () {
                return scrollUtils.getScrollTop(this.scrollEl) === 0
            },
            getDirection (touch) {
                const distanceX = Math.abs(touch.clientX - this.startX);
                const distanceY = Math.abs(touch.clientY - this.startY);
                return distanceX > distanceY ? 'horizontal' : distanceX < distanceY ? 'vertical' : '';
            },
            onTouchStart (event) {
                if (this.state === 'loading') {
                    return;
                }
                if (this.getCeiling()){
                    this.duration = 0
                    this.startX = event.touches[0].clientX;
                    this.startY = event.touches[0].clientY;
                }
            },
            onTouchMove (event) {
                if (this.state === 'loading') {
                    return;
                }
                this.deltaY = event.touches[0].clientY - this.startY
                this.direction = this.getDirection(event.touches[0]);
            }
        }
    }
</script>