import yltButton from './components/button'
import yltInput from './components/input'
import Message from './components/message'
import Dialog from './components/dialog'
import yltPullrefresh from './components/pullRefresh'
import yltSwitch from './components/switch'
import yltScrollerpage from './components/scrollerpage'
import yltTab from './components/tab'
import yltTabs from './components/tabs'
import yltTabbar from './components/tabbar'
import yltTabbarItem from './components/tabbarItem'

const components = {
    yltButton,
    yltInput,
    Message,
    Dialog,
    yltPullrefresh,
    yltSwitch,
    yltScrollerpage,
    yltTab,
    yltTabs,
    yltTabbar,
    yltTabbarItem
}

const wxVueYlt = {
    ...components
}

const install = function (Vue) {
    Object.keys(components).forEach( key => {
        Vue.component(key, wxVueYlt[key])
    })
    Vue.prototype.$Message = Message
    Vue.prototype.$Dialog = Dialog
}

//auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

const API = {
    install,
    ...components
}

module.exports.default = module.exports = API