<template>
  <span class="c-fff f-size-small f-weight-bold padding-1  top-0 d-flex j-content-center a-items-center b-radius-50 bg-red" v-if="new_messages.length">
    {{this.new_messages.length}}
  </span>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "v-messages-indicator",
  computed: mapState({
    new_messages: state => state.message.NOT_READ_LIST
  }),
}
</script>

<style scoped>

</style>