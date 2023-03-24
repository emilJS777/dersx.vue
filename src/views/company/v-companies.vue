<template>
  <div class="companies d-grid g-gap-3 h-max-content">
    <div class="bg-fff padding-1 box-shadow-slim h-max-content">
      <v-checkboxes-normal span="поиск по рубрикам"
                           label="поиск компаний"
                           :checked="true"
                           :checkboxes="rubrics"
                           @select="selected_ids => selected_rubric_ids = selected_ids"
                           v-if="rubrics.length"/>

      <v-input-normal placeholder="поиск..."
                      span="поиск по названию "
                      @value="value => search = value"/>


      <div class="btn_block d-flex g-gap-1 m-top-2">
        <v-button-normal label="поиск" class="bg-content" @click="()=>{this.companies=[];getCompanies()}"/>
        <v-button-normal label="создать компанию" @click="this.$router.push({name: 'companyCreate'})"/>
      </div>
    </div>

    <div class="d-grid g-gap-1 h-max-content">
      <div v-if="companies.length" class="d-grid g-gap-1 a-items-flex-start companies_block w-max">
        <v-company-normal-block v-for="company in companies" :key="company.id" :company="company" class="w-max bg-fff padding-1 box-shadow-slim"/>
      </div>
      <h3 v-else class="c-ccc t-center">ничего не найдено </h3>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal.vue";
import VButtonNormal from "@/components/_general/v-button-normal.vue";
import VCompanyNormalBlock from "@/components/_general/v-company-normal-block.vue";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal.vue";
import offsetMixin from "@/mixins/offset-mixin";
import toggleMixin from "@/mixins/toggle-mixin";

export default {
  name: "v-companies",
  components: {VCheckboxesNormal, VCompanyNormalBlock, VButtonNormal, VInputNormal},
  mixins: [offsetMixin, toggleMixin],
  data(){
    return{
      search: '',
      selected_rubric_ids: [],
      rubrics: [],
      companies: []
    }
  },
  mounted() {
    this.$store.dispatch("rubric/GET", ``).then(data => {
      this.rubrics = data.obj
    }).finally(() => this.getCompanies())
  },
  methods: {
    getCompanies(){
      this.$store.dispatch("company/GET", `?limit=${this.limit}&offset=${this.offset}&search=${this.search}&rubric_ids=[${this.selected_rubric_ids}]`).then(data => {
        data.obj.map(company => this.companies.push(company))
      })
    }
  }
}
</script>

<style scoped>
.companies{
  grid-template-columns: 1fr 2fr;
}

</style>