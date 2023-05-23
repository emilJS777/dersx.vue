<template>
  <span class="bottom-0 right-0 f-size-very-small w-max t-center c-content" v-if="this.online && !dot">{{ lang.general.online }}</span>
  <span class="p-absolute bottom-0 right-0 f-size-very-small w-max t-center bg-content b-radius-50 dot" v-if="this.online && dot"></span>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "v-online-indicator",
  props: ['user_id', 'dot'],
    computed: mapState({
        lang: state => state.lang.LANG
    }),
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
.dot{
    width: 12px;
    height: 12px;
    border: 1.5px solid#fff;
}
</style>