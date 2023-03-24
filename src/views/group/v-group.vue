<template>
  <div class="group d-grid g-gap-3" v-if="this.group">
    <div class="d-grid g-gap-1">
      <div class="group_block bg-fff padding-1 box-shadow-slim">
        <v-group-normal-block :group="group" :menu="true"/>
        <div>
          <div class="" v-if="group.description">
            <h5 class="m-bottom-0">описание</h5>
            <p>{{group.description}}</p>
          </div>
        </div>
      </div>

      <v-group-tabs-block :group="group"/>
    </div>

    <div>

    </div>
  </div>
</template>

<script>
import VGroupNormalBlock from "@/components/_general/v-group-normal-block";
import VGroupTabsBlock from "@/components/group/v-group-tabs-block";
export default {
  name: "v-group",
  components: {VGroupTabsBlock, VGroupNormalBlock},
  data(){
    return{
      group: null
    }
  },
  mounted() {
    this.emitter.emit('load', true)
    this.$store.dispatch("group/GET", `?id=${this.$route.query.id}`).then(data => {
      this.group = data.obj
    }).finally(() => this.emitter.emit('load', false))
  }
}
</script>

<style scoped>
.group{
  grid-template-columns: 1.3fr 2fr;
}
</style>