<template>
  <div class="publication d-grid g-gap-3">
      <div></div>
    <v-publication-list v-if="publication" :publication="publication"/>
  </div>
</template>

<script>
import VPublicationList from "@/components/publication/v-publication-list.vue";

export default {
    name: "v-publication",
    components: {VPublicationList},
    data(){
        return{
            publication: null
        }
    },
    mounted() {
        this.$store.dispatch("publication/GET", `?id=${this.$route.query.id}`).then(data => {
            console.log(data)
            if(data.success)
                this.publication = data.obj
        })
    }
}
</script>

<style scoped>
.publication{
    grid-template-columns: 1fr 2fr;
}
</style>