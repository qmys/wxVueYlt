export default {
    methods: {
        data () {
            return {
                parent: null
            }
        },
        findParent (name) {
            let parent = this.$parent
            while (parent) {
                if (parent.$options.name === name) {
                    this.parent = parent;
                    break;
                }
                parent = parent.$parent
            }
        }
    }
}