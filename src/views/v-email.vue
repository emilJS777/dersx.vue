<template>
  <div class="email">
      {{this.message}}
      <a href="/" class="c-content">перейти на главную</a>
  </div>
</template>

<script>
export default {
    name: "v-email",
    data(){
       return{
           message: ''
       }
    },
    mounted() {
        this.emitter.emit('load', true)
        this.$store.dispatch('email/GET', `?code=${this.$route.query.code || ''}`).then(data => {
            this.message = data.obj.msg
        }).finally(() => this.emitter.emit('load', false))
    }
}
</script>

<style scoped>

</style>