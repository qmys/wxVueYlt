import Vue from 'vue'
import messageVue from './message.vue'

const MessageConstructor = Vue.extend(messageVue)

let toastPool = []

let getAnInstance = () => {
    if(toastPool.length > 0) {
        let instance = toastPool[0]
        toastPool.splice(0, 1)
        return instance
    }
    return new MessageConstructor({
        el: document.createElement('div')
    })
}

let returnAnInstance = instance => {
    if (instance) {
        toastPool.push(instance)
    }
}

let removeDom = event => {
    if (event.target.parentNode) {
        event.target.parentNode.removeChild(event.target);
    }
}

MessageConstructor.prototype.close = function() {
    this.visible = false;
    this.$el.addEventListener('transitionend', removeDom);
    this.closed = true;
    returnAnInstance(this);
};

let message = (options = {}) => {
    let duration = options.duration || 3000;
    let instance = getAnInstance();
    instance.closed = false
    clearTimeout(instance.timer)
    instance.message = typeof options === 'string' ? options : options.message
    debugger
    instance.className = options.className || ''
    instance.iconClass = options.iconClass || ''

    document.body.appendChild(instance.$el)
    debugger
    Vue.nextTick(function() {
        instance.visible = true;
        instance.$el.removeEventListener('transitionend', removeDom);
        ~duration && (instance.timer = setTimeout(function() {
            if (instance.closed) return;
            instance.close();
        }, duration));
    });
    return instance;
}
export default message