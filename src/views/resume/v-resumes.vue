<template>
  <div class="resumes d-grid g-gap-3">
    <div class="filter_form d-grid g-gap-1 h-max-content bg-fff padding-1 box-shadow-slim">
      <v-select-normal label="выберите рубрику"
                       span="рубрика резюме"
                       :items="rubrics"
                       :selected="rubrics[0]"
                       v-if="rubrics.length"
                       @select="item => {selected_rubric_id = item.id;page=1;categoriesGet(item.id)}"/>

      <v-checkboxes-normal label="категории"
                           span="выберите категории к которым относится резюме"
                           :checkboxes="categories"
                           @select="selected_ids => selected_category_ids = selected_ids"
                           v-if="categories.length"/>
      <div class="d-flex g-gap-1">
        <v-button-normal label="поиск" class="bg-content" @click="clickPage(1)"/>
        <v-button-normal label="создать резюме" @click="this.$router.push({name: 'resumeCreate'})"/>
      </div>
    </div>

    <div>
      <div class="resume_list d-grid g-gap-1">
        <v-resume-list/>
      </div>

      <h3 class="t-center c-ccc" v-if="!resumes.length">ничего не найдено</h3>

      <!--    PAGINATION-->
      <div v-else class="d-flex j-content-flex-end">
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
import VSelectNormal from "@/components/_general/v-select-normal.vue";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal.vue";
import VButtonNormal from "@/components/_general/v-button-normal.vue";
import paginateMixin from "@/mixins/paginate-mixin";
import VResumeList from "@/components/resume/v-resume-list.vue";

export default {
  name: "v-resumes",
  components: {VResumeList, VButtonNormal, VCheckboxesNormal, VSelectNormal},
  mixins: [paginateMixin],
  data(){
    return{
      resumes: [],
      rubrics: [],
      selected_rubric_id: null,
      categories: [],
      selected_category_ids: [],
    }
  },
  mounted() {
    this.$store.dispatch("rubric/GET", '').then(data => {
      this.rubrics = data.obj
    })
  },
  methods: {
    clickPage(selectedPage){
      this.page = selectedPage
      this.usersGet()
    },
    categoriesGet(rubric_id){
      this.categories = []
      this.$store.dispatch("category/GET", `?rubric_id=${rubric_id}`).then(data => {
        this.categories = data.obj
      }).finally(() => this.usersGet())
    }
  }
}
</script>

<style scoped>
.resumes{
  grid-template-columns: 1fr 2fr;
}

</style>