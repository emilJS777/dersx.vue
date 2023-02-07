<template>
  <span class="p-absolute bottom-0 right-0 f-size-very-small w-max t-center" v-if="this.online">В сети</span>
</template>

<script>
export default {
  name: "v-online-indicator",
  props: ['user_id'],
  data(){
    return{
      online: false
    }
  },
  created() {
    this.sockets.subscribe('online', (data) => {
      data.user_id === this.user_id ? this.online = true : null
    })
    this.sockets.subscribe('offline', (data) => {
      data.user_id === this.user_id ? this.online = false : null
    })
  },
  mounted() {
    this.$socket.emit('get_online', {user_id: this.user_id})
  }
}
</script>

<style scoped>

</style>