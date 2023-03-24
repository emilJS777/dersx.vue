<template>
  <div class="groups d-grid g-gap-3">
    <div class="filter d-grid g-gap-1 bg-fff padding-1 h-max-content box-shadow-slim">
      <v-input-normal label="поиск"
                      span="поиск по названию или по описанию"
                      type="text"
                      @value="value => search = value"/>
      <div class="d-flex g-gap-1">
        <v-button-normal label="поиск" class="bg-content" @click="getGroups"/>
        <v-button-normal label="создать группy" @click="this.$router.push({name: 'groupCreate'})"/>
      </div>
    </div>

    <div>
      <div class="group_list d-grid g-gap-3">
        <v-group-normal-block v-for="group in this.groups" :key="group.id" :group="group"/>
      </div>
      <h3 class="t-center c-ccc" v-if="!groups.length">ничего не найдено</h3>
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
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VGroupNormalBlock from "@/components/_general/v-group-normal-block";
import paginateMixin from "@/mixins/paginate-mixin";
export default {
  name: "v-groups",
  components: {VGroupNormalBlock, VButtonNormal, VInputNormal},
  mixins: [paginateMixin],
  data(){
    return{
      search: '',
      groups: []
    }
  },
  mounted() {
    this.getGroups()
  },
  methods: {
    clickPage(selectedPage){
      this.page = selectedPage
      this.getGroups()
    },
    getGroups(){
      this.emitter.emit('load', true)
      this.$store.dispatch("group/GET", `?page=${this.page}&per_page=${this.per_page}&search=${this.search}`).then(data => {
        this.groups = data.obj.items
        this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>
.groups{
  grid-template-columns: 1fr 2fr;
}
.group_list{
  grid-template-columns: 1fr 1fr;
}
</style>