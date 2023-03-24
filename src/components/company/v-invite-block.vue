<template>
  <div class="invite_modal  d-flex w-max">
    <div class="content bg-fff box-shadow-slim w-max padding-1">
      <div class="search_block d-flex a-items-flex-end g-gap-_5">
        <v-input-normal placeholder="search..." span="search by user name first or last name"/>
        <v-button-normal icon="fa fa-search" class=" c-content"/>
      </div>

      <div class="users_block padding-05 d-grid g-gap-1 m-top-1 d-grid">
        <div class="d-flex j-content-space-between bg-ccc-opacity padding-05 a-items-center">
          <v-user-mini-block :user="profile"/>
          <v-button-normal icon="fa fa-user-plus" class="f-size-very-small c-555 f-weight-bold" label="Invite"/>
        </div>
        <div class="d-flex j-content-space-between bg-ccc-opacity padding-05 a-items-center">
          <v-user-mini-block :user="profile"/>
          <v-button-normal icon="fa fa-user-plus" class="f-size-very-small c-555 f-weight-bold" label="Invite"/>
        </div>
        <div class="d-flex j-content-space-between bg-ccc-opacity padding-05 a-items-center">
          <v-user-mini-block :user="profile"/>
          <v-button-normal icon="fa fa-user-plus" class="f-size-very-small c-555 f-weight-bold" label="Invite"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal.vue";
import VButtonNormal from "@/components/_general/v-button-normal.vue";
import VUserMiniBlock from "@/components/_general/v-user-mini-block.vue";
import {mapState} from "vuex";

export default {
  name: "v-invite-block",
  components: {VUserMiniBlock, VButtonNormal, VInputNormal},
  computed: mapState({
    profile: state => state.auth.profile
  }),
}
</script>

<style scoped>
.users_block{
  grid-template-columns: 1fr 1fr;
}
</style>