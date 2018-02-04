<template>
    <div class="app-wrapper">
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar></navbar>
			<app-main></app-main>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import AppMain from './AppMain'

export default {
    name: 'layout',
    components: {
        'navbar': Navbar,
        'sidebar': Sidebar,
        'app-main': AppMain
    }
}
</script>

<style>
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}

.sidebar-container {
    width: 200px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-y: auto;
}

.main-container {
    min-height: 100%;
    margin-left: 200px;
}
</style>
