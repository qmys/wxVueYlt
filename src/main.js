import yltButton from './components/button'
import yltInput from './components/input'
import Message from './components/message'

const components = {
    yltButton,
    yltInput,
    Message
}

const wxVueYlt = {
    ...components
}

const install = function (Vue) {
    Object.keys(components).forEach( key => {
        Vue.component(key, wxVueYlt[key])
    })
    Vue.prototype.$Message = Message
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