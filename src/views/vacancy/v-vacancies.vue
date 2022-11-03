<template>
  <div class="vacancies d-grid g-gap-3">
    <div class="filter_form d-grid g-gap-1 h-max-content bg-fff padding-1">
      <v-select-normal label="выберите рубрику"
                       span="ваша желаемая рубрика для поиска"
                       :items="rubrics"
                       :selected="rubrics[0]"
                       v-if="rubrics.length"
                       @select="item => {selected_rubric_id = item.id;page=1;categoriesGet(item.id)}"/>

      <v-input-normal label="поиск"
                      span="поиск по названию или по описанию"
                      type="text"
                      @value="value => search = value"/>

      <v-checkboxes-normal label="категории" :checked="true"
                           span="выберите интересующие для вас категории"
                           :checkboxes="categories"
                           @select="selected_ids => {selected_category_ids = selected_ids}"
                           v-if="categories.length"/>

      <v-checkboxes-normal label="оплата за" :checked="true"
                           :checkboxes="payment_intervals"
                           span="выберите желаемый интервал оплаты"
                           @select="selected_ids => {selected_payment_interval_ids = selected_ids}"
                           v-if="payment_intervals.length"/>

      <div class="d-flex g-gap-1">
        <v-button-normal label="поиск" class="bg-content" @click="clickPage(1)"/>
        <v-button-normal label="создать вакансию" @click="this.$router.push({name: 'vacancyCreate'})" v-if="profile"/>
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

      <h3 class="t-center c-ccc" v-if="!vacancies.length">ничего не найдено</h3>
      <!--    PAGINATION-->
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
export default {
  name: "v-vacancies",
  components: {VVacaciesList, VButtonNormal, VCheckboxesNormal, VInputNormal, VSelectNormal},
  mixins: [toggleMixin, paginateMixin],
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
    profile: state => state.auth.profile
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
</style>