<template>
  <div class="vacancy_offer d-grid m-top-2 padding-1 d-grid g-gap-1" v-for="vacancy_offer in vacancy_offers" :key="vacancy_offer.id">
    <div class="d-grid g-gap-1 p-relative">
      <v-user-mini-block :user="vacancy_offer.creator"/>
      <v-menu-normal v-if="profile && profile.id === vacancy_offer.creator.id"
                     @edit="setModalName('vacancyOfferEditModal', vacancy_offer.id)"
                     @delete="setModalName('vacancyOfferDeleteAlert', vacancy_offer.id)"
                     :menu_list="[{title: lang.general.redactor, icon_class: 'fa fa-pencil-square', class: '', emit_name: 'edit'},
                                    {title: lang.general.delete, icon_class: 'fa fa-times-circle', class: 'c-red', emit_name: 'delete'}]"/>
    </div>

    <p class="m-left-1 m-right-1 padding-right-1 m-bottom-0">{{vacancy_offer.description}}</p>

    <div>
      <p class="m-bottom-0 c-content f-size-small m-left-1"><i v-if="vacancy_offer.payment_interval.price">{{vacancy_offer.price}} {{lang.general.dram}} </i> {{vacancy_offer.payment_interval.title}}</p>
      <span class="m-top-1 m-left-1 f-size-small ">{{ lang.general.published }} {{ vacancy_offer.creation_date }}</span>
    </div>

    <v-vacancy-offer-edit-form :vacancy_offer_id="this.id"
                               @close="setModalName(false)"
                               @vacancy_offer_edit_success="()=>{setModalName(false);this.$emit('refresh_modal')}"
                               v-if="modalName === 'vacancyOfferEditModal'"/>
  </div>

  <h3 class="c-ccc m-0-auto" v-if="!vacancy_offers.length">{{ lang.general.nothing_found }}</h3>
  <div v-else class="d-flex j-content-flex-end m-top-1">
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
  <v-alert-modal :label="lang.vacancies.offer.confirm_delete"
                 v-if="modalName === 'vacancyOfferDeleteAlert'"
                 @confirm="deleteVacancyOffer"
                 @close="setModalName(false)"/>

<!--  MODALS-->

</template>

<script>
import {mapState} from "vuex";
import paginateMixin from "@/mixins/paginate-mixin";
import toggleMixin from "@/mixins/toggle-mixin";
import VAlertModal from "@/components/_general/v-alert-modal";
import VVacancyOfferEditForm from "@/components/vacancy/forms/v-vacancy-offer-edit-form";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
import VMenuNormal from "@/components/_general/v-menu-normal.vue";
import localTimeMixin from "@/mixins/local-time-mixin";

export default {
  name: "v-vacancy-offers",
  components: {VMenuNormal, VUserMiniBlock, VVacancyOfferEditForm, VAlertModal},
  mixins: [paginateMixin, toggleMixin, localTimeMixin],
  props: ['vacancy_id'],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
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
      this.emitter.emit('load', true)
      this.$store.dispatch("vacancy_offer/GET", `?page=${this.page}&per_page=${this.per_page}&vacancy_id=${this.vacancy_id}`).then(data => {
        this.vacancy_offers = data.obj.items
        this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
      }).finally(() => {
        this.emitter.emit('load', false)
        this.setSmartTime()
      })
    },
    setSmartTime(){
      this.vacancy_offers.map(offer => {
        this.getLocalTime(offer.creation_date)
        offer.creation_date = this.date_time
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
.edit svg{
  display: none;
}
.vacancy_offer:hover svg{
  display: block;
}
</style>