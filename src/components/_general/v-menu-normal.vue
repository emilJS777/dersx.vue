<template>
  <div class="menu_block p-absolute">
    <div class="padding-03 c-pointer w-max-content h-max-content" v-if="opening" @click="setModalName(modalName ? false : 'menuBlock')">
      <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
    </div>
          <ul class="p-absolute bg-fff right-0 box-shadow-slim padding-05 w-max-content d-grid g-gap-_5 c-555" v-if="modalName === 'menuBlock' && opening">
            <li :class="`d-flex a-items-center g-gap-_5 c-pointer c-content-hover ${item.class}`" v-for="item in menu_list" :key="item.title" @click="emit_menu(item.emit_name)">
              <i :class="item.icon_class" aria-hidden="true"></i>
              {{ item.title }}
            </li>
          </ul>
      <div v-if="!opening" :class="`${inline ? 'd-flex g-gap-1' : ''}`">
          <li v-for="item in menu_list" :key="item.title" @click="emit_menu(item.emit_name)" :class="`d-flex a-items-center g-gap-_5 f-size-small c-pointer c-content-hover ${item.class} ${item.hidden ? 'd-none' : ''}`"  >
              <span>
                  <i :class="item.icon_class" aria-hidden="true"></i>
                  {{ item.title }}
              </span>
          </li>
      </div>

  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggle-mixin";

export default {
  name: "v-menu-normal",
  props: ['menu_list', 'opening', 'inline'],
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
  top: 80%;
}
</style>