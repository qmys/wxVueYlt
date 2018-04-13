/**
 * 函数式组件
 * https://cn.vuejs.org/v2/guide/render-function.html#函数式组件
 * */
export default {
    name: 'ylt-node',
    props: {
        node: Array
    },
    render: function (createElement, context) {
        return context.props.node;
    }
}