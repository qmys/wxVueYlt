import yltButton from './components/button'

const components = {
    yltButton
}

const wxVueYlt = {
    ...components
}

const install = function (Vue) {
    Object.keys(components).forEach( key => {
        Vue.component(key, wxVueYlt[key])
    })
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