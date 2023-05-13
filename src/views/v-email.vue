<template>
  <div class="email">
      {{this.message}}
      <a href="/" class="c-content">{{ lang.general.go_home_page }}</a>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "v-email",
    computed: mapState({
       lang: state => state.lang.LANG
    }),
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