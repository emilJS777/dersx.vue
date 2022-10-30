<template>
  <div class="service_edit d-grid g-gap-3">
    <div>sdsdf</div>
    <v-service-edit-form :service_id="this.$route.query.id"/>
  </div>
</template>

<script>
import VServiceEditForm from "@/components/service/forms/v-service-edit-form";
export default {
  name: "v-service-edit",
  components: {VServiceEditForm}
}
</script>

<style scoped>
.service_edit{
  grid-template-columns: 1fr 2fr;
}
</style>