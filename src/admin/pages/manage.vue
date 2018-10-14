<template>
    <div class="manage">
        <sidebar></sidebar>
        <router-view></router-view>
    </div>
</template>
<script>
import sidebar from '@/admin/components/Sidebar'
export default {
    name: 'manage',
    components: {
        sidebar
    }
}
</script>
<style lang="scss" scoped>
.manage {
    height: 100%;
    background-color: #ddd;
}
</style>
