<template>
  <div class="company_create d-grid g-gap-3">
    <div>sadsdf</div>
    <v-company-create-form/>
  </div>
</template>

<script>
import VCompanyCreateForm from "@/components/company/forms/v-company-create-form.vue";

export default {
  name: "v-company-create",
  components: {VCompanyCreateForm}
}
</script>

<style scoped>
.company_create{
  grid-template-columns: 1fr 2fr;
}
</style>