<template>
  <div class="publication d-grid g-gap-3">
      <div></div>
    <v-publication-list v-if="publication" :publication="publication"/>
      <h3 class="t-center c-ccc m-top-0" v-else>{{ lang.general.nothing_found }}</h3>
  </div>
</template>

<script>
import VPublicationList from "@/components/publication/v-publication-list.vue";
import {mapState} from "vuex";

export default {
    name: "v-publication",
    components: {VPublicationList},
    computed: mapState({
        lang: state => state.lang.LANG
    }),
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