<template>
  <div class="profile d-grid g-gap-3">
      <div class="d-grid h-max-content g-gap-1">
        <div class="bg-fff padding-1 d-grid j-content-center">
          <v-profile-img/>
          <v-button-normal label="настройки профиля" class="bg-content-hover w-max m-top-2"
                           @click="setModalName('profileEditModal')"
                           v-if="profile && profile.id === parseInt(this.$route.query.id)"/>
        </div>

      </div>
      <div class="d-grid g-gap-1 h-max-content">
        <v-profile-about/>
      </div>
  </div>

  <v-profile-edit-modal v-if="modalName === 'profileEditModal'" @close="setModalName(false)"/>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import VProfileImg from "@/components/profile/v-profile-img";
import VProfileAbout from "@/components/profile/v-profile-about";
import VProfileEditModal from "@/components/profile/modals/v-profile-edit-modal";
import toggleMixin from "@/mixins/toggle-mixin";
import {mapState} from "vuex";
export default {
  name: "v-profile",
  components: {VProfileEditModal, VProfileAbout, VProfileImg, VButtonNormal},
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
}
</script>

<style scoped>
.profile{
  grid-template-columns: 1.5fr 4fr;
}

</style>