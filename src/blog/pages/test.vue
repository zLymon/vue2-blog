<template>
    <div class="root">{{ count }} ———— {{ count }} ———— {{ countAlias }}</div>    
</template>
<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            count1: 0
        }
    },
    // this.$store.state获取vuex的state
    // computed: {
    //     count() {
    //         return this.$store.state.count
    //     }
    // }

    // mapState获取vuex的state
    // computed: mapState({
    //     // 1. 箭头函数获取
    //     count: state => state.count,
    //     // 2. 冒号左边是可以为任意字符串，用于调用，冒号右边等同于state => state.count
    //     countAlias: 'count',
    //     // 3. 调用当前组件自身的状态，需要使用函数，函数内部使用this获取自身状态
    //     testCount() {
    //         return this.count
    //     }
    // }),

    // 映射this.count为store.state.count
    computed: mapState([
        'count',
        'isLogin'
    ]),

    // 使用对象展开运算符
    // computed: {
    //     fn1() {return 1},
    //     fn2() {return 2},
    //     fn3() {return 3},
    //     // 在这里...mapState的作用就是，原先mapState的用法必须跟在computed后面
    //     ...mapState({
    //         count2: 'count'
    //     })
    // },
    mounted() {
        console.log(this.isLogin)
    }
}
</script>
