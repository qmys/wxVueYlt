<template>
    <div class="wxVueYlt-scrollerPage"
         :id="containerId"
         @touchstart="touchStart($event)"
         @touchmove="touchMove($event)"
         @touchend="touchEnd($event)"
    >
        <div class="wxVueYlt-scrollerContent" :id="contentId">
            <div class="pull-to-refresh-layer"
                 v-if="onRefresh"
                >
                <span class="spinner-holder" v-if="state !== 2">
                    <yltIcon type="arrow-up-c" v-text="refreshTxt" size="20"></yltIcon>
                </span>
                <span v-if="state === 2">
                    <yltIcon type="load-d" size="30"></yltIcon>
                </span>
            </div>
            <slot></slot>
            <div v-if="showInfiniteLayer && isLoadMore"  class="scroller-loading" :style="styles">
                <span class="spinner-holder" v-if="showLoading">
                    <yltIcon class="wxVueYlt-load-loop"  type="load-c" size="20"></yltIcon>
                </span>
                <span class="text" v-if="showLoading" v-text="loadingTxt"></span>
                <div class="no-data-text" v-if="!showLoading && loadingState === 2" v-text="noDataText"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import Scroller from '../../utils/core'
    import getContentRender from '../../utils/render'
    import yltIcon from '../icon/icon.vue'

    const re = /^[\d]+(\%)?$/
    const widthAndHeightValidator = (v) => {
        return re.test(v)
    }
    const widthAndHeightCoerce = (v) => {
        if (v[v.length - 1] !== '%') return v + 'px'
        return v
    }
    export default {
        name: 'ylt-scroller-page',
        data () {
            return {
                containerId: 'outer-' + Math.random().toString(36).substring(3, 8),
                contentId:  'inner-' + Math.random().toString(36).substring(3, 8),
                state: 0, // 0: pull to refresh, 1: release to refresh, 2: refreshing
                loadingState: 0, // 0: stop, 1: loading, 2: stopping loading
                showLoading: false,
                container: undefined,
                content: undefined,
                scroller: undefined,
                pullToRefreshLayer: undefined,
                mousedown: false,
                infiniteTimer: undefined,
                resizeTimer: undefined
            }
        },
        components: {
            yltIcon
        },
        props: {
            width: {
                type: String,
                default: '100%',
                validator: widthAndHeightValidator
            },
            height: {
                type: String,
                default: '100%',
                validator: widthAndHeightValidator
            },
            onRefresh: Function,
            onInfinite: Function,
            animating: {
                type: Boolean,
                default: true
            },
            animationDuration: {
                type: Number,
                default: 250
            },
            bouncing: {
                type: Boolean,
                default: true
            },
            styles: {
                type: Object,
                default () {
                    return { }
                }
            },
            minContentHeight: {
                type: Number,
                default: 0 // px
            },
            isLoadMore: {
                type: Boolean,
                default: true
            },
            loadingTxt: {
                type:String,
                default: '加载中..'
            },
            noDataText: {
                type:String,
                default: '已经到底了!'
            },
            refreshTxt: {
                type:String,
                default: '下拉刷新'
            }
        },
        computed: {
            w: function(){
                return widthAndHeightCoerce(this.width)
            },
            h: function(){
                return widthAndHeightCoerce(this.height)
            },
            showInfiniteLayer () {
                let contentHeight = 0
                this.content
                    ? contentHeight = this.content.offsetHeight
                    : void 111 /*** void 111 =>  undefined  ***/
                return this.onInfinite ? contentHeight > this.minContentHeight : false
            }
        },
        mounted () {
            this.container = document.getElementById(this.containerId)
            this.container.style.width = this.w
            this.container.style.height = this.h
            this.content = document.getElementById(this.contentId)
            this.pullToRefreshLayer = this.content.getElementsByTagName("div")[0]
            let render = getContentRender(this.content)
            this.scroller = new Scroller(render,{
                scrollingX: false,
                animating: this.animating,
                animationDuration: this.animationDuration,
                bouncing: this.bouncing
            })
            if(this.onRefresh){
                this.scroller.activatePullToRefresh(60, () => {
                    this.state = 1
                }, () => {
                    this.state = 0
                }, () => {
                    this.state = 2
                    this.$on('$finishPullToRefresh', () => {
                        setTimeout(() => {
                            this.state = 0
                            this.finishPullToRefresh()
                        })
                    })
                    this.onRefresh(this.finishPullToRefresh)
                })
            }
            // setup scroller
            let rect = this.container.getBoundingClientRect()
            this.scroller.setPosition(rect.left + this.container.clientLeft, rect.top + this.container.clientTop)

            const contentSize = () => {
                return {
                    width: this.content.offsetWidth,
                    height: this.content.offsetHeight
                }
            }
            let { content_width, content_height } = contentSize()

            this.resizeTimer = setInterval(() => {
                let {width, height} = contentSize()
                if (width !== content_width || height !== content_height) {
                    content_width = width
                    content_height = height
                    this.resize()
                }
            }, 10)
        },
        methods: {
            resize () {
                let container = this.container;
                let content = this.content;
                this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
            },
            touchStart (e) {
                if (e.target.tagName.match(/input|textarea|select/i)) {
                    return
                }
                this.scroller.doTouchStart(e.touches, e.timeStamp)
            },
            touchMove(e) {
                e.preventDefault()
                this.scroller.doTouchMove(e.touches, e.timeStamp)
            },
            touchEnd(e){
                this.scroller.doTouchEnd(e.timeStamp)
                let {top} = this.scroller.getValues()
                if (this.loadingState === 2) {
                    this.loadingState = 2
                } else {
                    this.loadingState = 0
                }
                if(this.onInfinite) {
                    if (this.content.offsetHeight > 0 &&
                        top - 20 > 0 && top - 20 > this.content.offsetHeight - this.container.clientHeight) {
                        this.loadingState = 1
                        this.showLoading = true
                        if (this.isLoadMore) this.onInfinite(this.finishInfinite);
                    }
                }
            },
            finishInfinite (hideSpinner) {
                //回调函数，隐藏加载
                this.loadingState = hideSpinner ? 2 : 0
                this.showLoading = false
            },
            finishPullToRefresh() {
                this.scroller.finishPullToRefresh()
            }
        }
    }
</script>