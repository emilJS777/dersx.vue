<template>
  <div class="d-flex j-content-center box-shadow-slim" v-if="vacancy">
    <div class="padding-1 w-max bg-fff animation-from-hidden">
      <div class="d-flex j-content-space-between a-items-center">
        <span class="f-size-small c-pointer c-content-hover t-decoration-underline-hover a-items-center" @click="$router.go(-1)">
          <i class="fa fa-arrow-left" aria-hidden="true"></i>
          назад
        </span>

        <div class="edit d-flex g-gap-1 j-content-flex-end d-block-hover f-weight-bold" v-if="profile && vacancy.creator_id === profile.id">
          <i class="fa fa-ellipsis-v" aria-hidden="true"></i>
          <ul class="m-0-auto d-none animation-from-hidden p-absolute padding-05 bg-fff box-shadow-slim z-index-max">
            <li @click="this.$router.push({name: 'vacancyEdit', query:{id: vacancy.id}})" class="padding-03 c-pointer c-content-hover f-size-small d-flex g-gap-_5 a-items-center">
              <i class="far fa-edit"></i>
              редактировать
            </li>
            <li @click="setModalName('vacancyDeleteAlert', vacancy.id)" class="padding-03 c-pointer c-content-hover f-size-small err-msg d-flex g-gap-_5 a-items-center">
              <i class="fas fa-trash-alt"></i>
              удалить
            </li>
          </ul>
        </div>
      </div>
      <div class="m-top-1">
        <h2 class="m-top-0 d-flex j-content-space-between">
          {{vacancy.title}}
        </h2>

      </div>
      <div class="d-grid g-gap-1 p-relative">
        <v-user-mini-block :user="vacancy.creator"/>
      </div>

      <div class="description">
        <p>{{vacancy.long_description}}</p>
      </div>

      <ul class="w-max categories_block list-style-content d-grid g-gap-_3 padding-left-1">
        <li v-for="category in vacancy.categories" :key="category.id" class="f-size-small f-weight-bold padding-02 m-right-03">{{category.title}}</li>
      </ul>

      <div class="tabs_btn d-flex g-gap-1">
        <span :class="modalName === 'vacancyOfferForm' ? 'c-ccc' : 'c-content c-pointer'" @click="setModalName('vacancyOfferForm')">
          <i class="fa fa-file" aria-hidden="true"></i>
          предложение <b class="f-size-small" v-if="vacancy.vacancy_offers_count"> {{vacancy.vacancy_offers_count}} </b> <b class="f-size-small" v-else>0</b>
        </span>
        <span :class="modalName === 'vacancyComments' ? 'c-ccc' : 'c-content c-pointer'" @click="setModalName('vacancyComments')">
          <i class="fa fa-comments" aria-hidden="true"></i>
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
</template>

<script>
import VVacancyOfferForm from "@/components/vacancy/forms/v-vacancy-offer-form";
import toggleMixin from "@/mixins/toggle-mixin";
import VVacancyCommentForm from "@/components/vacancy/forms/v-vacancy-comment-form";
import VVacancyComments from "@/components/vacancy/v-vacancy-comments";
import VVacancyOffers from "@/components/vacancy/v-vacancy-offers";
import {mapState} from "vuex";
import VAlertModal from "@/components/_general/v-alert-modal";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
export default {
  name: "v-vacancy-block",
  components: {VUserMiniBlock, VAlertModal, VVacancyOffers, VVacancyComments, VVacancyCommentForm, VVacancyOfferForm},
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

        //  EMIT SIMILAR SERVICES
        this.$emit('similar', {rubric_id: data.obj.rubric.id, category_ids: Array.from(data.obj.categories, category => category.id)})
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
  .categories_block{
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
</style>