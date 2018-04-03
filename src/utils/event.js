/**
 * target ==》 element
 * event  ==>  事件
 * handler  ==> 回调函数
 * passive ==》 指定事件是否在捕获或冒泡阶段执行。 值为true or false
 * **/
export function on(target, event, handler, passive = false) {
    target.addEventListener(
        event,
        handler,
        supportsPassive ? { capture: false, passive } : false
    )
}

export function off(target, event, handler) {
    target.removeEventListener(event, handler)
}