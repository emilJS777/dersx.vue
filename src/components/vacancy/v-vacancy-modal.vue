<template>
  <div class="modal d-flex j-content-center" v-if="vacancy">
    <div class="modal-content animation-from-hidden">
      <h2>{{vacancy.title}}</h2>
      <div class="d-grid g-gap-1 p-relative">
        <div class="d-flex a-items-center g-gap-_5 p-relative w-max" >
          <router-link :to="`/profile?id=${vacancy.creator.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
            <img src="@/assets/images/user-unknown-1.png" alt="" v-if="!vacancy.creator.image">
            <img :src="'data:image/'+vacancy.creator.image.filename+';charset=utf-8;base64, ' + vacancy.creator.image.b64" class="p-absolute absolute-center profile_image" v-else>
          </router-link>
          <div class="d-grid info_block j-content-flex-end">
            <i>{{ vacancy.creator.first_name }} {{ vacancy.creator.last_name }}</i>
            <span class="f-size-small">{{vacancy.creator.name}}</span>
          </div>
        </div>
      </div>
      <div class="edit d-flex g-gap-1 j-content-flex-end" v-if="profile && vacancy.creator_id === profile.id">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash err-msg c-pointer animation-from-hidden" viewBox="0 0 16 16"
             @click="setModalName('vacancyDeleteAlert', vacancy.id)">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square c-pointer animation-from-hidden" viewBox="0 0 16 16"
             @click="setModalName('vacancyEditModal', vacancy.id)">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </div>

      <div class="description">
        <p>{{vacancy.long_description}}</p>
      </div>

      <div class="tabs_btn d-flex g-gap-1">
        <span :class="modalName === 'vacancyOfferForm' ? 'c-ccc' : 'c-content c-pointer'" @click="setModalName('vacancyOfferForm')">
          предложение <b class="f-size-small" v-if="vacancy.vacancy_offers_count"> {{vacancy.vacancy_offers_count}} </b> <b class="f-size-small" v-else>0</b>
        </span>
        <span :class="modalName === 'vacancyComments' ? 'c-ccc' : 'c-content c-pointer'" @click="setModalName('vacancyComments')">
          комментарии <b class="f-size-small" v-if="vacancy.vacancy_comments_count"> {{vacancy.vacancy_comments_count}} </b> <b class="f-size-small" v-else>0</b>
        </span>
      </div>

      <div class="vacancy_offers" v-if="modalName === 'vacancyOfferForm'">

        <v-vacancy-offer-form @close="this.$emit('close')"
                              :vacancy="vacancy"
                              @vacancy_offer_success="setModalName(modalName, id)"/>

        <v-vacancy-offers :vacancy_id="vacancy.id"
                          @refresh_modal="setModalName(modalName, id)"/>
      </div>


      <div class="vacancy_comments" v-if="modalName === 'vacancyComments'">
        <v-vacancy-comment-form @on_comment_success="setModalName(modalName, id)"
                                :vacancy_id="vacancy.id"
                                @close="this.$emit('close')"/>

        <div>
          <v-vacancy-comments :vacancy_id="vacancy_id" @refreshModal="setModalName(modalName, id)"/>
        </div>
      </div>
    </div>
  </div>

<!--  ALERTS-->
  <v-alert-modal label="вы дествительно хотите удалить вакансию ?"
                 @confirm="vacancyDelete"
                 @close="setModalName('vacancyOfferForm')"
                 v-if="modalName === 'vacancyDeleteAlert'"/>
<!--  MODALS-->
  <v-vacancy-edit-form v-if="modalName === 'vacancyEditModal'"
                       @close="setModalName('vacancyOfferForm')"
                       :vacancy_id="this.id"/>
</template>

<script>
import VVacancyOfferForm from "@/components/vacancy/forms/v-vacancy-offer-form";
import toggleMixin from "@/mixins/toggle-mixin";
import VVacancyCommentForm from "@/components/vacancy/forms/v-vacancy-comment-form";
import VVacancyComments from "@/components/vacancy/v-vacancy-comments";
import VVacancyOffers from "@/components/vacancy/v-vacancy-offers";
import {mapState} from "vuex";
import VAlertModal from "@/components/_general/v-alert-modal";
import VVacancyEditForm from "@/components/vacancy/forms/v-vacancy-edit-form";
export default {
  name: "v-vacancy-modal",
  components: {VVacancyEditForm, VAlertModal, VVacancyOffers, VVacancyComments, VVacancyCommentForm, VVacancyOfferForm},
  props: ['vacancy_id'],
  mixins: [toggleMixin],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      vacancy: null,
      vacancy_comments: [],
    }
  },
  mounted(){
    this.emitter.emit("load", true)
    if(this.vacancy_id){
      this.$store.dispatch("vacancy/GET", `?id=${this.vacancy_id}`).then(data => {
        this.vacancy = data.obj
        this.setModalName('vacancyOfferForm')
      }).finally(() => this.emitter.emit("load", false))
    }
  },
  methods: {
    vacancyDelete(){
      this.emitter.emit('load', true)
      this.$store.dispatch("vacancy/DELETE", this.id).then(data => {
        console.log(data)
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
  .modal-content{
    width: 50% !important;
  }
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