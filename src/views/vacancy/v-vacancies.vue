<template>
  <div :class="`${mobile ? 'vacancies_mobile' : 'vacancies'} d-grid g-gap-3`">
    <div class="filter_form d-grid g-gap-1 h-max-content bg-fff padding-1 box-shadow-slim">
      <v-select-normal :label="lang.general.rubric"
                       :span="lang.vacancies.filter.rubric.description"
                       :items="rubrics"
                       :selected="rubrics[0]"
                       v-if="rubrics.length"
                       @select="item => {selected_rubric_id = item.id;page=1;categoriesGet(item.id)}"/>

      <v-input-normal :label="lang.general.search"
                      :span="lang.vacancies.filter.search.description"
                      type="text"
                      @value="value => search = value"/>

      <div :class="`${mobile && modalName !== 'categories' ? 'd-none' : ''} animation-from-hidden`">
          <v-checkboxes-normal :label="lang.general.categories" :checked="true"
                               :span="lang.vacancies.filter.categories.description"
                               :checkboxes="categories"
                               @select="selected_ids => {selected_category_ids = selected_ids}"
                               v-if="categories.length"/>

          <v-checkboxes-normal :label="lang.general.payment_interval" :checked="true"
                               :checkboxes="payment_intervals"
                               class="m-top-1"
                               :span="lang.vacancies.filter.payment_interval.description"
                               @select="selected_ids => {selected_payment_interval_ids = selected_ids}"
                               v-if="payment_intervals.length"/>
      </div>

       <div v-if="mobile" class="d-flex j-content-flex-end c-555">
           <v-button-normal v-if="modalName !== 'categories'" :icon="`fa fa-chevron-circle-down`" @click="setModalName('categories')" :label="lang.general.categories" class="w-max-content"/>
           <v-button-normal v-else :icon="`fa fa-chevron-circle-up`" @click="setModalName(false)" :label="lang.general.categories" class="w-max-content"/>
       </div>

      <div :class="`${mobile ? 'j-content-flex-end' : ''} d-flex g-gap-1`">
        <v-button-normal :label="lang.general.search" class="bg-content" @click="clickPage(1)"/>
        <v-button-normal :label="lang.vacancies.filter.create_vacancy" @click="this.$router.push({name: 'vacancyCreate'})" v-if="profile"/>
      </div>
    </div>

    <div class="vacancies_list d-grid g-gap-1 h-max-content">
<!--      <div class="d-flex a-items-center j-content-flex-end bg-fff padding-1">-->
<!--        <span class="c-pointer c-content t-decoration-underline f-size-small"-->
<!--              @click="setModalName('vacancyEditModal')">создать вакансию</span>-->
<!--      </div>-->

      <v-vacacies-list @more="this.$router.push({name: 'vacancy', query:{id: vacancy.id}})"
                       class="bg-fff padding-1"
                       v-for="vacancy in vacancies"
                       :key="vacancy.id"
                       :vacancy="vacancy"/>

      <h3 class="t-center c-ccc" v-if="!vacancies.length">{{ lang.general.nothing_found }}</h3>
      <!--    PAGINATION-->
      <div v-else class="d-flex j-content-flex-end">
        <v-paginate
            class="paginate"
            :page-count="page_count"
            :click-handler="clickPage"
            :prev-text="'❮'"
            :next-text="'❯'"
            :page="page"
            :container-class="'className'"
            :force-page="page">
        </v-paginate>
      </div>
    </div>
  </div>
</template>

<script>
import VSelectNormal from "@/components/_general/v-select-normal";
import VInputNormal from "@/components/_general/v-input-normal";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import toggleMixin from "@/mixins/toggle-mixin";
import VVacaciesList from "@/components/vacancy/v-vacancies-list";
import paginateMixin from "@/mixins/paginate-mixin";
import {mapState} from "vuex";
import deviceMixin from "@/mixins/device-mixin";
export default {
  name: "v-vacancies",
  components: {VVacaciesList, VButtonNormal, VCheckboxesNormal, VInputNormal, VSelectNormal},
  mixins: [toggleMixin, paginateMixin, deviceMixin],
  data(){
    return{
      rubrics: [],
      categories: [],
      vacancies: [],
      payment_intervals: [],

      selected_rubric_id: null,
      selected_category_ids: [],
      selected_payment_interval_ids: [],
      search: ''
    }
  },
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
  }),
  mounted() {
    // RUBRICS GET
    this.$store.dispatch("rubric/GET", '').then(data => {
      this.rubrics = data.obj
    })
  //  PAYMENT INTERVALS GET
    this.$store.dispatch("payment_interval/GET", '').then(data => {
      this.payment_intervals = data.obj
    })
  },
  methods: {
    clickPage(selectedPage){
      this.page = selectedPage
      this.vacanciesGet()
    },
    vacanciesGet(){
      this.emitter.emit("load", true)
      this.$store.dispatch("vacancy/GET", `?page=${this.page}&per_page=${this.per_page}&rubric_id=${this.selected_rubric_id}&category_ids=[${this.selected_category_ids}]&search=${this.search}&payment_interval_ids=[${this.selected_payment_interval_ids}]`).then(data => {
        this.vacancies = data.obj.items
        this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
      }).finally(() => this.emitter.emit("load", false))
    },
    categoriesGet(rubric_id){
      this.categories = []
      this.$store.dispatch("category/GET", `?rubric_id=${rubric_id}`).then(data => {
        this.categories = data.obj
      }).finally(() => this.vacanciesGet())
    }
  }
}
</script>

<style scoped>
.vacancies{
  grid-template-columns: 1fr 2fr;
}
.vacancies_mobile{
    grid-template-columns: 1fr;
}
</style>