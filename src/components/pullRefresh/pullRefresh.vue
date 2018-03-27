<template>
    <div class="wxVueYlt-pullRefresh">
        <div
            class="wxWueYlt-pullRefresh_track"
            :style="style"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
            @touchcancel="onTouchEnd"
        >
            <div class="wxVueYlt-pullRefresh_head">
                <slot name="normal" v-if="status === 'normal'" />
                <slot name="pulling" v-if="status === 'pulling'">
                    <span class="wxVueYlt-pullRefresh_text">{{ pullingText}}</span>
                </slot>
                <slot name="loosing" v-if="status === 'loosing'">
                    <span class="wxVueYlt-pullRefresh_text">{{ loosingText}}</span>
                </slot>
                <slot name="loading" v-if="status === 'loading'">
                    <div class="wxVueYlt-pullRefresh_loading">
                        <yltIcon class="wxVueYlt-load-loop" type="load-c"></yltIcon>
                        <span>{{ loadingText}}</span>
                    </div>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
    import scrollUtils from '../../utils/scroll'
    import yltIcon from '../icon/icon.vue'

    export default {
        name: 'ylt-Pull-Refresh',
        data () {
            return {
                status: 'normal',
                height: 0,
                duration: 0
            }
        },
        components: {
            yltIcon
        },
        props: {
            pullingText: {
                type: String,
                default: '下拉即可刷新...'
            },
            loadingText: {
                type: String,
                default: '加载中...'
            },
            loosingText: {
                type: String,
                default: '释放刷新...'
            },
            animationDuration: {
                type: Number,
                default: 300
            },
            value: {
                type: Boolean,
                required: true
            },
            headHeight: {
                type: Number,
                default: 50
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
        watch: {
            /**
             * 监听组件中的v-model的值，让其在刷新完毕后，关闭加载动作
             * **/
            value(val) {
                this.duration = this.animationDuration;
                this.getStatus(val ? this.headHeight : 0, val);
            }
        },
        methods: {
            getCeiling () {
                this.ceiling = scrollUtils.getScrollTop(this.scrollEl) === 0
                return this.ceiling
            },
            getDirection (touch) {
                const distanceX = Math.abs(touch.clientX - this.startX);
                const distanceY = Math.abs(touch.clientY - this.startY);
                return distanceX > distanceY ? 'horizontal' : distanceX < distanceY ? 'vertical' : '';
            },
            ease(height) {
                const { headHeight } = this
                return height < headHeight
                    ? height
                    : height < headHeight * 2
                        ? Math.round(headHeight + (height - headHeight) / 2)
                        : Math.round(headHeight * 1.5 + (height - headHeight * 2) / 4)
            },
            getStatus(height, isLoading) {
                this.height = height
                const status = isLoading
                    ? 'loading' : height === 0
                        ? 'normal' : height < this.headHeight
                            ? 'pulling' : 'loosing'
                if (status !== this.status) {
                    this.status = status
                }
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

                if (!this.ceiling && this.getCeiling()) {
                    this.duration = 0
                    this.startY = event.touches[0].clientY
                    this.deltaY = 0
                }
                if (this.ceiling && this.deltaY >= 0) {
                    if (this.direction === 'vertical') {
                        this.getStatus(this.ease(this.deltaY))
                        event.preventDefault()
                    }
                }
            },
            onTouchEnd () {
                if (this.status === 'loading') {
                    return;
                }
                if (this.ceiling && this.deltaY) {
                    this.duration = this.animationDuration
                    if (this.status === 'loosing') {
                        this.getStatus(this.headHeight, true)
                        this.$emit('input', true)
                        this.$emit('refresh')
                    } else {
                        this.getStatus(0)
                    }
                }
            }
        }
    }
</script>