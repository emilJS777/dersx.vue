<template>
  <div class="service d-grid g-gap-3">
    <div class="d-grid g-gap-1 h-max-content">
      <h4 class="m-top-0 m-bottom-0 bg-ccc-opacity c-content padding-05">похожие услуги </h4>
      <v-service-list v-for="service in similarServices"
                      :key="service.id"
                      :service="service"/>
    </div>
    <v-service-block :service_id="this.$route.query.id"
                     @similar="getSimilarServices"/>
  </div>
</template>

<script>
import VServiceBlock from "@/components/service/v-service-block";
import VServiceList from "@/components/service/v-service-list";
export default {
  name: "v-service",
  components: {VServiceList, VServiceBlock},
  data(){
    return{
      similarServices: []
    }
  },
  methods: {
    getSimilarServices(obj){
      this.$store.dispatch("service/GET", `?page=1&per_page=5&exclude_id=${this.$route.query.id}&rubric_id=${obj.rubric_id}&category_ids=[${obj.category_ids}]`).then(data => {
        this.similarServices = data.obj.items
      })
    }
  }
}
</script>

<style scoped>
.service{
  grid-template-columns: 1fr 2fr;
}
</style>