export default {
    //获取滚动高度
    getScrollTop(element) {
        return 'scrollTop' in element ? element.scrollTop : element.pageYOffset
    },
    //获取元素距离顶部高度
    getElementTop (element) {
        return (element === window ? 0 : element.getBoundingClientRect().top + this.getScrollTop(window))
    },
    /**
     * 找到最近的触发滚动的元素
     * @param {Element} element
     */
    getScrollEventTarget(element, rootParent = window) {
        let currentNode = element
        while(currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'HTML' && currentNode.tagName !== 'BODY' && currentNode.tagName !== rootParent){
            let overflowY = this.getComputedStyle(currentNode).overflowY
            if (overflowY === 'scroll' || overflowY === 'auto') {
                return currentNode;
            }
            currentNode = currentNode.parentNode;
        }
        return rootParent
    },
    getVisibleHeight(element) {
        return element === window ? element.innerHeight : element.getBoundingClientRect().height;
    },
    getComputedStyle: document.defaultView.getComputedStyle.bind(document.defaultView)
}