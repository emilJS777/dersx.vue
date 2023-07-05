<template>
  <div class="d-flex j-content-center box-shadow-slim h-max-content" v-if="vacancy">
    <div class="padding-1 w-max bg-fff d-grid g-gap-1 animation-from-hidden">
      <div class="d-flex j-content-space-between a-items-center p-relative padding-05 padding-left-03 b-bottom-ccc">
        <span class="m-top-0 c-pointer c-content-hover a-items-center f-size-small" @click="$router.go(-1)">
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
           {{ lang.general.back }}
        </span>
        <v-menu-normal @edit="this.$router.push({name: 'vacancyEdit', query:{id: vacancy.id}})"
                       :opening="false"
                       :inline="true"
                       class="m-top-05"
                       @complaint="this.complaint_id ? this.complaintDelete() : this.complaintCreate()"
                       @delete="setModalName('vacancyDeleteAlert', vacancy.id)"
                       :menu_list="[{title: lang.general.redactor, icon_class: 'fa fa-pencil-square', class: '', emit_name: 'edit', hidden: this.profile.id !== vacancy.creator.id},
                                    {title: lang.general.delete, icon_class: 'fa fa-times-circle', class: 'c-red', emit_name: 'delete', hidden: this.profile.id !== vacancy.creator.id},
                                    {title: this.complaint_id ? lang.general.complaint_cancel : lang.general.complaint, icon_class: 'fa fa-flag', class: 'c-red', emit_name: 'complaint', hidden: this.profile.id === vacancy.creator.id}]"/>
      </div>
      <div :class="`${mobile ? 'l-height-1' : 'l-height-0'} m-top-1 d-flex j-content-space-between`">
        <h3 class="m-top-0 m-bottom-0 d-flex j-content-space-between l-height-1">
          {{vacancy.title}}
        </h3>
        <b :class="`${mobile ? 'd-grid' : 'd-flex'} c-content f-size-small g-gap-_3 m-top-1`">
            <b v-if="vacancy.payment_interval.price"><span>{{ vacancy.price }}</span>  <span>{{ lang.general.dram }}</span> </b>
            <b v-if="lang.lang === 'arm'"> {{vacancy.payment_interval.title_arm}}</b>
            <b v-if="lang.lang === 'eng'"> {{vacancy.payment_interval.title_eng}}</b>
            <b v-if="lang.lang === 'rus'"> {{vacancy.payment_interval.title_rus}}</b>
        </b>
      </div>

      <div class="description m-top-1">
        <p v-html="vacancy.long_description"></p>
      </div>

      <ul class="w-max categories_block list-style-content padding-left-1">
          <li v-for="category in vacancy.categories" :key="category.id" class="f-size-small f-weight-bold padding-02 d-inline-block m-right-1 m-right-03">
              <span v-if="lang.lang === 'arm'">{{category.title_arm}}</span>
              <span v-if="lang.lang === 'eng'">{{category.title_eng}}</span>
              <span v-if="lang.lang === 'rus'">{{category.title_rus}}</span>
          </li>
      </ul>

        <div class="d-flex j-content-space-between a-items-center g-gap-1 p-relative h-max-content">
            <v-user-mini-block :user="vacancy.creator"/>
        </div>

      <div :class="`${mobile ? 'f-size-small' : ''} tabs_btn d-flex g-gap-1`">
        <span :class="modalName === 'vacancyOfferForm' ? 'c-ccc' : 'c-content c-pointer'" @click="setModalName('vacancyOfferForm')">
          <i class="fa fa-file" aria-hidden="true"></i>
          {{ lang.vacancies.offers }} <b class="f-size-small" v-if="vacancy.vacancy_offers_count"> {{vacancy.vacancy_offers_count}} </b> <b class="f-size-small" v-else>0</b>
        </span>
        <span :class="modalName === 'vacancyComments' ? 'c-ccc' : 'c-content c-pointer'" @click="setModalName('vacancyComments')">
          <i class="fa fa-comments" aria-hidden="true"></i>
          {{ lang.general.comments }} <b class="f-size-small" v-if="vacancy.vacancy_comments_count"> {{vacancy.vacancy_comments_count}} </b> <b class="f-size-small" v-else>0</b>
        </span>
      </div>

      <div class="vacancy_offers" v-if="modalName === 'vacancyOfferForm'">
        <v-vacancy-offer-form @close="this.$emit('close')"
                              :vacancy="vacancy"
                              @vacancy_offer_success="setModalName(modalName, id)"/>

        <v-vacancy-offers :vacancy_id="vacancy.id"
                          v-if="vacancy.creator_id === profile.id"
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
  <v-alert-modal :label="lang.vacancies.confirm_delete"
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
import VMenuNormal from "@/components/_general/v-menu-normal.vue";
import deviceMixin from "@/mixins/device-mixin";
export default {
  name: "v-vacancy-block",
  components: {
    VMenuNormal,
    VUserMiniBlock, VAlertModal, VVacancyOffers, VVacancyComments, VVacancyCommentForm, VVacancyOfferForm},
  props: ['vacancy_id'],
  mixins: [toggleMixin, deviceMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      complaint_id: null,
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
    complaintCreate(){
        this.emitter.emit('load', true)
       this.$store.dispatch("complaint/CREATE", {vacancy_id: this.vacancy.id}).then(data => {
           if(data.success)
               this.complaint_id = data.obj.id
       }).finally(() => this.emitter.emit('load', false))
    },
      complaintDelete(){
          this.emitter.emit('load', true)
          this.$store.dispatch("complaint/DELETE", this.complaint_id).then(data => {
              if(data.success)
                  this.complaint_id = null
          }).finally(() => this.emitter.emit('load', false))
      },
    vacancyDelete(){
      this.emitter.emit('load', true)
      this.$store.dispatch("vacancy/DELETE", this.id).then(data => {
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