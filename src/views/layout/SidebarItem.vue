<template>
    <div class='menu-wrapper'>
        <template v-for="(item, index) in routes">
            <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path" :key="'sidebar_' + index">
                <el-menu-item :index="item.path+'/'+item.children[0].path" class='submenu-title-noDropdown'>
                    <i v-if='item.icon' :class="'el-icon-'+item.icon"></i>
                    <span>{{item.children[0].name}}</span>
                </el-menu-item>
            </router-link>

            <el-submenu :index="item.name" v-if="!item.noDropdown&&!item.hidden" :key="'sidemenu_' + index">
                <template slot="title">
                    <i v-if='item.icon' :class="'el-icon-'+item.icon"></i>
                    <span>{{item.name}}</span>
                </template>
                <template v-for="(child, num) in item.children" v-if='!child.hidden'>

                    <sidebar-item class='nest-menu' v-if='child.children&&child.children.length>0' :routes='[child]' :key="'sidebarItem_' + num"></sidebar-item>

                    <router-link v-else :to="item.path+'/'+child.path" :key="'sidebarChild_' + num">
                        <el-menu-item :index="item.path+'/'+child.path">
                            <i v-if='child.icon' :class="'el-icon-'+child.icon"></i>
                            <span>{{child.name}}</span>
                        </el-menu-item>
                    </router-link>
                </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
export default {
    name: 'SidebarItem',
    props: {
        routes: {
            type: Array
        }
    }
}
</script>
