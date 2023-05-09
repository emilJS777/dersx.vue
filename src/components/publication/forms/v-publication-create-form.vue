<template>
  <div class="d-flex g-gap-1 a-items-center padding-1 bg-fff">
    <div v-if="profile" class="d-grid g-gap-1 p-relative">
      <div class="auth d-grid j-content-center a-items-center g-gap-_5 p-relative" >
        <router-link :to="`/profile?id=${this.profile.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
          <!--          <img src="@/assets/images/user-unknown-1.png" alt="" v-if="!profile.image">-->
          <span v-if="!profile.image">{{profile.first_name[0]}}</span>
          <img :src="'data:image/'+profile.image.filename+';charset=utf-8;base64, ' + profile.image.b64" class="p-absolute absolute-center profile_image" v-else>
        </router-link>

        <div class="d-grid info_block j-content-flex-end f-size-very-small">
          <b>{{ profile.first_name }} {{ profile.last_name }}</b>
          <i>{{profile.email.address}}</i>
        </div>
      </div>
    </div>

    <div class="d-grid w-max m-left-1 a-items-flex-start">
      <div class="d-flex a-items-flex-end g-gap-1">
        <v-input-emoji :label="lang.home.publication.create.form.title"
                       class="w-max"
                       style="margin-bottom: -2px;"
                       @value="value => form.description = value"
                       :placeholder="lang.home.publication.create.form.description"/>

        <v-input-file-form class=" m-top-05 bg-ccc-opacity w-max-content o-hidden d-flex a-items-flex-end"
                           icon="fa fa-image f-size-22"
                           :allowedTypes="['image/jpg', 'image/jpeg', 'image/png']"
                           @file_form="file => form.image = file"/>

        <v-button-normal :label="lang.general.create" style="border-radius: 30px;" @click="setModalName('publicationCreateAlert')"/>
      </div>


    </div>
  </div>

<!--  ALERTS-->
  <v-alert-modal :label="lang.home.publication.create.confirm_create"
                 v-if="modalName === 'publicationCreateAlert'"
                 @close="setModalName(false)"
                 @confirm="onPublication"/>
</template>

<script>
import {mapState} from "vuex";
import VInputFileForm from "@/components/_general/v-input-file-form";
import VButtonNormal from "@/components/_general/v-button-normal";
import VAlertModal from "@/components/_general/v-alert-modal";
import toggleMixin from "@/mixins/toggle-mixin";
import VInputEmoji from "@/components/_general/v-input-emoji.vue";
export default {
  name: "v-publication-create-form",
  components: {VInputEmoji, VAlertModal, VButtonNormal, VInputFileForm},
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      form:{
        description: '',
        image: null
      }
    }
  },
  methods:{
    onPublication(){
      this.emitter.emit('load', true)
      this.setModalName(false)
      this.$store.dispatch("publication/CREATE", this.form).then(data => {
        if(data.success && this.form.image)
          this.onPublicationImage(data.obj.id)
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    },
    onPublicationImage(publication_id){
      this.emitter.emit('load', true)
      this.$store.dispatch("image/CREATE", {query: `?publication_id=${publication_id}`, form: this.form.image}).then(data => {
          this.emitter.emit("message", data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.img_block{
  border: 1px solid #ccc;
  height: 40px;
  width: 40px;
}
.profile_image{
  width: 120%;
  height: auto;
}
</style>