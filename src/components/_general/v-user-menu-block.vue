<template>
  <div class="user_menu_block g-gap-1 h-max-content">
    <router-link to="/messager?user_id=1" class="d-flex a-items-center c-pointer c-555 c-content-hover bg-fff padding-05 b-radius-8"><i class="fa fa-envelope padding-05" aria-hidden="true"></i> <span>отправить сообщение </span></router-link>
    <p class="d-flex a-items-center c-pointer c-555 c-content-hover bg-fff padding-05 b-radius-8"><i class="fa fa-user-plus padding-05 " aria-hidden="true"></i> <span>добавить в друзья </span></p>
    <p class="d-flex a-items-center c-pointer c-555 c-red-hover bg-fff padding-05 b-radius-8"><i class="fa fa-ban padding-05" aria-hidden="true"></i><span>удалить из друзей  </span></p>
  </div>
</template>

<script>
export default {
  name: "v-user-menu-block",
  props: ['user']
}
</script>

<style scoped>
</style>