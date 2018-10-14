<template>
    <div id="layout">
        <Header></Header>
        <router-view></router-view>
    </div>
</template>
<script>
import Header from '@/blog/components/Header'

export default {
    name: 'Index',
    components: {
        Header
    }
}
</script>
<style lang="scss" scoped>
#layout {
    height: 100%;
}
// .router-link-active {
//     border-bottom: 1px solid #fff;
// }
</style>
