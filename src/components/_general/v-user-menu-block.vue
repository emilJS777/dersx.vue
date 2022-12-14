<template>
  <div class="user_menu_block g-gap-1 h-max-content">
    <p class="d-flex a-items-center c-pointer c-555 c-content-hover bg-fff padding-05 b-radius-8 fa-border" @click="openMessage">
      <i class="fa fa-envelope padding-05" aria-hidden="true"></i> <span>отправить сообщение </span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-content-hover bg-fff padding-05 b-radius-8 fa-border">
      <i class="fa fa-user-plus padding-05 " aria-hidden="true"></i> <span>добавить в друзья </span>
    </p>

    <p class="d-flex a-items-center c-pointer c-555 c-red-hover bg-fff padding-05 b-radius-8 fa-border">
      <i class="fa fa-ban padding-05" aria-hidden="true"></i> <span>удалить из друзей  </span>
    </p>
  </div>
</template>

<script>
export default {
  name: "v-user-menu-block",
  props: ['user'],
  methods:{
    openMessage(){
      this.emitter.emit('openMessage', this.user)
    }
  }
}
</script>

<style scoped>
</style>