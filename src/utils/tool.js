/**
 * 判断参数是否其中之一
 * */
export function oneOf(value, list) {
    for( let i=0; i< list.length; i++) {
        if( value === list[i]) {
            return true
        }
    }
    return false
}

const iRaf = window.requestAnimationFrame || window.webkitRequestAnimationFrame

export function raf(fn) {
    return iRaf.call(window, fn);
}


