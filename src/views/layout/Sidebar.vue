<template>
    <el-menu mode="vertical" theme="dark" unique-opened :default-active="$route.path">
        <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
</template>


<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
    name: 'sidebar',
    components: { 'sidebar-item': SidebarItem },
    computed: {
        ...mapGetters([
            'permission_routers'
        ])
    }
}
</script>
