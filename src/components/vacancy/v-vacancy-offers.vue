<template>
  <div class="vacancy_offer d-grid m-top-2 padding-05" v-for="vacancy_offer in vacancy_offers" :key="vacancy_offer.id">
    <div class="d-grid g-gap-1 p-relative">
      <v-user-mini-block :user="vacancy_offer.creator"/>
    </div>

    <p class="m-left-1 m-right-1 padding-right-1 m-bottom-0">{{vacancy_offer.description}}</p>

    <div>
      <p class="m-bottom-0 c-content f-size-small m-left-1">цена {{vacancy_offer.price}} за {{vacancy_offer.payment_interval.title}}</p>

      <span class="m-top-1 m-left-1 f-size-small ">опубликовано {{ vacancy_offer.creation_date }}</span>
      <div class="edit d-flex g-gap-1 f-right m-right-1" v-if="profile && vacancy_offer.creator.id === profile.id">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash err-msg c-pointer animation-from-hidden" viewBox="0 0 16 16"
             @click="setModalName('vacancyOfferDeleteAlert', vacancy_offer.id)">
          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square c-pointer animation-from-hidden" viewBox="0 0 16 16"
             @click="setModalName('vacancyOfferEditModal', vacancy_offer.id)">
          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
          <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
        </svg>
      </div>
    </div>
  </div>

  <h3 class="c-ccc" v-if="!vacancy_offers.length">предложения не найдены</h3>
  <div v-else class="d-flex j-content-flex-end">
    <v-paginate
        class="paginate"
        :page-count="page_count"
        :click-handler="clickPage"
        :prev-text="'prev'"
        :next-text="'next'"
        :page="page"
        :container-class="'className'"
        :force-page="page">
    </v-paginate>
  </div>

<!--  ALERTS-->
  <v-alert-modal label="вы дествительно хотите удалить ваше  предложение ?"
                 v-if="modalName === 'vacancyOfferDeleteAlert'"
                 @confirm="deleteVacancyOffer"
                 @close="setModalName(false)"/>

<!--  MODALS-->
  <v-vacancy-offer-edit-form :vacancy_offer_id="this.id"
                             @close="setModalName(false)"
                             @vacancy_offer_edit_success="()=>{setModalName(false);this.$emit('refresh_modal')}"
                             v-if="modalName === 'vacancyOfferEditModal'"/>
</template>

<script>
import {mapState} from "vuex";
import paginateMixin from "@/mixins/paginate-mixin";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
import VVacancyOfferEditForm from "@/components/vacancy/forms/v-vacancy-offer-edit-form";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";

export default {
  name: "v-vacancy-offers",
  components: {VUserMiniBlock, VVacancyOfferEditForm, VAlertModal},
  mixins: [paginateMixin, toggleMixin],
  props: ['vacancy_id'],
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      vacancy_offers: []
    }
  },
  mounted() {
    this.getVacancyOffers()
  },
  methods: {
    clickPage(selectedPage){
      this.page = selectedPage
      this.getVacancyOffers()
    },
    getVacancyOffers(){
      this.$store.dispatch("vacancy_offer/GET", `?page=${this.page}&per_page=${this.per_page}&vacancy_id=${this.vacancy_id}`).then(data => {
        this.vacancy_offers = data.obj.items
        this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
      })
    },
    deleteVacancyOffer(){
      this.emitter.emit('load', true)
      this.$store.dispatch("vacancy_offer/DELETE", this.id).then(data => {
        if(data.success)
          this.$emit('refresh_modal')
        else
          this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.vacancy_offer{
  background-color: rgba(210, 210, 210, 0.1);
}
.edit{
  height: 20px;
}
.edit svg{
  display: none;
}
.vacancy_offer:hover svg{
  display: block;
}
</style>