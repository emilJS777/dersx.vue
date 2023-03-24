<template>
  <div class="company d-grid g-gap-2">
    <div class="d-grid g-gap-1">
<!--      <p v-if="this.company.long_description">{{ this.company.long_description }}</p>-->
    </div>
    <div class="d-grid g-gap-1">
      <v-company-block :company="this.company"/>
      <div class="padding-05 padding-left-1 padding-right-1 bg-fff box-shadow-slim d-flex g-gap-1">
        <span class="c-content c-pointer">публикации</span>
        <span class="c-content c-pointer">проекты</span>
        <span class="c-content c-pointer">о нас</span>
      </div>
      <v-publication-create-form/>
    </div>

  </div>
</template>

<script>
import VCompanyBlock from "@/components/company/v-company-block.vue";
import VPublicationCreateForm from "@/components/publication/forms/v-publication-create-form";

export default {
  name: "v-company",
  components: {VPublicationCreateForm, VCompanyBlock},
  data(){
    return{
      company: null,
    }
  },
  mounted() {
    this.emitter.emit('load', true)
    this.$store.dispatch("company/GET", `?id=${this.$route.query.id}`).then(data => {
      this.company = data.obj
      console.log(data.obj)
    }).finally(() => this.emitter.emit('load', false))
  },
}
</script>

<style scoped>
.company{
  grid-template-columns: 1fr 2fr;
}
</style>