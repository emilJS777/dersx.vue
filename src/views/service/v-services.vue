<template>
  <div class="services d-grid g-gap-3">
    <div class="filter d-grid g-gap-1 bg-fff padding-1 h-max-content">
      <v-select-normal label="выберите рубрику"
                       span="ваша желаемая рубрика для поиска"
                       :items="rubrics"
                       :selected="rubrics[0]"
                       v-if="rubrics.length"
                       @select="item => {selected_rubric_id = item.id;page=1;categoriesGet()}"/>

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
        <v-button-normal label="создать услугу" @click="this.$router.push({name: 'serviceCreate'})"/>
      </div>
    </div>

    <div>
<!--      <div class="bg-fff padding-1 d-flex j-content-flex-end">-->
<!--        <span class="f-size-small c-content c-pointer t-decoration-underline-hover" @click="setModalName('serviceCreateModal')">создать услугу</span>-->
<!--      </div>-->

      <div class="services-list d-grid g-gap-1" v-if="services.length">
        <v-service-list v-for="service in services"
                        :key="service.id"
                        :service="service"/>
      </div>
      <h3 class="t-center c-ccc" v-if="!services.length">ничего не найдено</h3>
      <!--    PAGINATION-->
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
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggle-mixin";
import VServiceList from "@/components/service/v-service-list";
import VSelectNormal from "@/components/_general/v-select-normal";
import VInputNormal from "@/components/_general/v-input-normal";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import paginateMixin from "@/mixins/paginate-mixin";

export default {
  name: "v-services",
  components: {
    VButtonNormal, VCheckboxesNormal, VInputNormal, VSelectNormal, VServiceList},
  mixins: [toggleMixin, paginateMixin],
  data(){
    return{
      rubrics: [],
      categories: [],
      payment_intervals: [],
      services: [],

      selected_rubric_id: null,
      selected_category_ids: [],
      selected_payment_interval_ids: [],
      search: ''
    }
  },
  mounted(){
    // RUBRICS GET
    this.$store.dispatch("rubric/GET", '').then(data => {
      this.rubrics = data.obj
    })
    //  PAYMENT INTERVALS GET
    this.$store.dispatch("payment_interval/GET", '').then(data => {
      this.payment_intervals = data.obj
    })
  },
  methods:{
    clickPage(selectedPage){
      this.page = selectedPage
      this.services_get()
    },
    services_get(){
      this.emitter.emit('load', true)
      this.$store.dispatch("service/GET", `?page=${this.page}&per_page=${this.per_page}&rubric_id=${this.selected_rubric_id}&category_ids=[${this.selected_category_ids}]&payment_interval_ids=[${this.selected_payment_interval_ids}]&search=${this.search}`).then(data => {
        this.services = data.obj.items
        this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
      }).finally(() => this.emitter.emit('load', false))
    },
    categoriesGet(){
      this.categories = []
      this.$store.dispatch("category/GET", `?rubric_id=${this.selected_rubric_id}`).then(data => {
        this.categories = data.obj
      }).finally(() => this.services_get())
    }
  }
}
</script>

<style scoped>
.services{
  grid-template-columns: 1fr 2fr;
}
.services-list{
  grid-template-columns: 1fr 1fr;
}
</style>