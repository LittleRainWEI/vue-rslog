<template>
    <div class="401">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    name: 'Error401',
    data() {
        return {
            msg: "401 Permission Not !!!"
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
