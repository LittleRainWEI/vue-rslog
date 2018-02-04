<template>
  <div class="navbar">
    <el-button type="primary" @click="returnHome">返回首页</el-button>
    <el-button type="danger" @click="logout">退出登录</el-button>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {

    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// 为了重新实例化vue-router对象 避免bug
      })
    },
    returnHome() {
      this.$router.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  font-weight: normal;
  height: auto;
  width: auto;
  text-align: center;
  margin-bottom: 10px;
}
</style>
