<template>
  <div class="group_create d-grid g-gap-3">
    <div>
      group create page
    </div>

    <v-group-create-form/>
  </div>
</template>

<script>
import VGroupCreateForm from "@/components/group/forms/v-group-create-form";
export default {
  name: "v-group-create",
  components: {VGroupCreateForm}
}
</script>

<style scoped>
.group_create{
  grid-template-columns: 1fr 2fr;
}
</style>
