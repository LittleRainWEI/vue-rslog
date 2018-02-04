<template>
    <div class="404">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'Error404',
    data() {
        return {
            msg: "404 Not Found !!!"
        }

    },
    components: {

    }
}
</script>

<style scoped>
h1 {
  font-weight: normal;
  height: auto;
  width: auto;
  text-align: center;
}
</style>
