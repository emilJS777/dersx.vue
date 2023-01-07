<template>
  <div class="menu_block p-absolute">
    <div class="padding-03 c-pointer w-max-content h-max-content" @click="setModalName(modalName ? false : 'menuBlock')">
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    </div>

    <ul class="p-absolute bg-fff right-0 box-shadow-slim padding-05 w-max-content d-grid g-gap-_5 c-555" v-if="modalName === 'menuBlock'">
      <li :class="`d-flex a-items-center g-gap-_5 c-pointer c-content-hover ${item.class}`" v-for="item in menu_list" :key="item.title" @click="emit_menu(item.emit_name)">
        <i :class="item.icon_class" aria-hidden="true"></i>
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggle-mixin";

export default {
  name: "v-menu-normal",
  props: ['menu_list'],
  mixins: [toggleMixin],
  methods: {
    emit_menu(emit_name){
      this.setModalName(false)
      this.$emit(emit_name)
    }
  }
}
</script>

<style scoped>
.menu_block{
  top: 0;
  right: 0;
  z-index: 1;
}
ul{
  top: 30%;
}
</style>