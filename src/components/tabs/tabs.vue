<template>
    <div class="wxVueYlt-tabs" :class="`wxVueYlt-tabs_${type}`">
        <div
            ref="wrap"
            class="wxVueYlt-tabs_wrap"
            :class="[`wxVueYlt-tabs_wrap-${position}`,{
             'wxVueYlt-tabs-scrollable': scrollable,
             'wxVueYlt-hairline-top_bottom': type === 'line'
           }]"
        >
            <div class="wxVueYlt-tabs_nav" :class="`wxVueYlt-tabs_nav-${type}`" ref="nav">
                <div v-if="type === 'line'" class="wxVueYlt-tabs_nav-bar" :style="navBarStyle" />
                <div v-for="(tab, index) in tabs"
                     :key="index"
                     ref="tabs"
                     class="wxVueYlt-tab"
                     :class="{ 'wxVueYlt-tab-active': index === curActive}"
                     @click="onClick(index)"
                >
                    <ylt-node v-if="tab.$slots.title" :node="tab.$slots.title" />
                    <span class="wxVueYlt-ellipsis" v-else>{{ tab.title }}</span>
                </div>
            </div>
        </div>
        <div class="wxVueYlt-tabs_content" ref="content">
            <slot />
        </div>
    </div>
</template>

<script>
    import yltNode from '../../utils/node'
    import { raf } from '../../utils/tool'
    export default {
        name: 'ylt-Tabs',
        components: {
            yltNode
        },
        props: {
            type: {
                type: String,
                default: 'line'
            },
            active: {
                type: [Number, String],
                default: 0
            },
            duration: {
                type: Number,
                default: 0.2
            },
            scollNumber: {
                type: Number,
                default: 4
            }
        },
        data () {
            return {
                tabs: [],
                curActive: 0,
                position:'content-top',
                navBarStyle: {}
            }
        },
        computed: {
            scrollable () {
                return this.tabs.length > this.scollNumber
            }
        },
        watch:{
            active(val) {
                this.currentActive(val);
            },
            tabs(){
                this.currentActive(this.curActive || this.active);
                this.setNavBar();
            },
            curActive(){
                this.scrollIntoView()
                this.setNavBar()
            }
        },
        mounted() {
            this.currentActive(this.active);
            this.setNavBar();
            this.$nextTick(() => {
                this.scrollIntoView()
            })
        },
        methods: {
            currentActive(active) {
                active = +active;
                const exist = this.tabs.some((tab) => {
                    return tab.index === active
                })
                const defaultActive = (this.tabs[0] || {}).index || 0;
                this.curActive = exist ? active : defaultActive;
            },
            // update nav bar style
            setNavBar() {
                this.$nextTick(()=> {
                    if (!this.$refs.tabs) {
                        return;
                    }
                    let tab = this.$refs.tabs[this.curActive]
                    this.navBarStyle = {
                        width: `${tab.offsetWidth || 0}px`,
                        transform: `translate(${tab.offsetLeft || 0}px, 0)`,
                        transitionDuration: `${this.duration}s`
                    };
                })
            },
            onClick(index){
                const { title } = this.tabs[index]
                this.$emit('click', index, title);
                /**
                 * 更新选中的值，然后监听，将下划线滑动到指定的位置
                 * */
                this.$emit('click', index, title);
                this.curActive = index;
            },
            scrollIntoView() {
                if(!this.scrollable || !this.$refs.tabs) {
                    return;
                }
                const tab= this.$refs.tabs[this.curActive]
                const { nav } = this.$refs
                const { scrollLeft, offsetWidth: navWidth } = nav
                const { offsetLeft, offsetWidth: tabWidth} = tab
                this.scrollTo(nav, scrollLeft, offsetLeft - (navWidth - tabWidth) / 2)
            },
            scrollTo(el, from, to){
                /**
                 * 滑动到指定位置
                 * **/
                let count = 0
                const frames = Math.round(this.duration * 1000 / 16);
                const animate = () => {
                    el.scrollLeft += (to - from) / frames;
                    /* istanbul ignore next */
                    if (++count < frames) {
                        raf(animate);
                    }
                };
                animate();
            }
        }
    }
</script>