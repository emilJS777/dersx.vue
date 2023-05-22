<template>
  <div class="padding-1 bg-fff d-grid g-gap-1 h-max-content">
    <v-select-normal label="рубрика форумов"
                     span="ваша желаемая рубрика для поиска"
                     :items="rubrics"
                     :selected="rubrics[0]"
                     @select="item => {selected_rubric_id = item.id;page=1;forumsGet()}"
                     v-if="rubrics.length"/>

    <div class="d-flex a-items-flex-end g-gap-1">
      <v-input-normal label="найти" span="поиск по названию или по теме " @value="value => search = value"/>
      <v-button-normal label="поиск" class="w-max-content" @click="()=>{page=1;forumsGet()}"/>
    </div>
    <div class="d-grid bg-ccc-opacity-hover padding-03" v-for="forum in forums" :key="forum.id">
      <h5 class="m-bottom-0 m-top-0  c-content c-pointer t-decoration-underline-hover" @click="this.$emit('open', forum.id)"> {{forum.title}} </h5>
      <span class="f-size-small"><b>рубрика:</b> {{forum.rubric.title}} </span>
      <span class="f-size-small"><b>тема:</b> <i>{{ forum.topic }}</i></span>

      <span class="f-size-small m-top-05">опубликовано: {{forum.creation_date}}</span>

      <div class="p-relative m-top-05 d-flex a-items-center j-content-space-between">
        <v-user-mini-block :user="forum.creator"/>

        <span class="f-size-small">ответов: {{forum.forum_discussion_count}}</span>
      </div>
    </div>

    <h3 class="t-center c-ccc" v-if="!forums.length">ничего не найдено</h3>
    <!--    PAGINATION-->
    <div v-else class="d-flex j-content-flex-end">
      <v-paginate
          class="paginate"
          :page-count="page_count"
          :click-handler="clickPage"
          :prev-text="'❮'"
          :next-text="'❯'"
          :page="page"
          :container-class="'className'"
          :force-page="page">
      </v-paginate>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import paginateMixin from "@/mixins/paginate-mixin";
import VSelectNormal from "@/components/_general/v-select-normal";
import VUserMiniBlock from "@/components/_general/v-user-mini-block";
export default {
  name: "v-forum-list",
  components: {VUserMiniBlock, VSelectNormal, VButtonNormal, VInputNormal},
  mixins: [paginateMixin],
  data(){
    return{
      forums: [],
      rubrics: [],
      selected_rubric_id: null,
      search: ''
    }
  },
  mounted() {
    this.rubricsGet()
  },
  methods:{
    clickPage(selectedPage){
      this.page = selectedPage
      this.forumsGet()
    },
    forumsGet(){
      this.emitter.emit('load', true)
      this.$store.dispatch("forum/GET", `?page=${this.page}&per_page=${this.per_page}&rubric_id=${this.selected_rubric_id}&search=${this.search}`).then(data => {
        this.forums = data.obj.items
        this.page = data.obj.page
        this.per_page = data.obj.per_page
        this.page_count = data.obj.pages
      }).finally(() => this.emitter.emit('load', false))
    },
    rubricsGet(){
      this.emitter.emit('load', true)
      this.$store.dispatch("rubric/GET", '').then(data => {
        this.rubrics = data.obj
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>

</style>