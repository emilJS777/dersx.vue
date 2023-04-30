<template>
  <div class="users d-grid g-gap-3">
    <div class="filter_form d-grid g-gap-1 h-max-content bg-fff padding-1 box-shadow-slim">
      <v-select-normal :label="lang.general.rubric"
                       :span="lang.users.filter.rubric.description"
                       :items="rubrics"
                       :selected="rubrics[0]"
                       v-if="rubrics.length"
                       @select="item => {selected_rubric_id = item.id;page=1;categoriesGet(item.id)}"/>

      <v-input-normal :label="lang.general.search"
                      :span="lang.users.filter.search.description"
                      type="text"
                      @value="value => search = value"/>

      <v-checkboxes-normal :label="lang.general.categories"
                           :span="lang.users.filter.category.description"
                           :checkboxes="categories"
                           @select="selected_ids => selected_category_ids = selected_ids"
                           v-if="categories.length"/>
      <div>
        <v-button-normal :label="lang.general.search" @click="clickPage(1)"/>
      </div>
    </div>

    <div>
      <div class="users_list d-grid g-gap-3 m-top-2 h-max-content">
        <v-user v-for="user in users" :key="user.id" :user="user" class="box-shadow-slim"/>
      </div>

      <h3 class="t-center c-ccc" v-if="!users.length">{{ lang.general.nothing_found }}</h3>

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
import VSelectNormal from "@/components/_general/v-select-normal";
import VInputNormal from "@/components/_general/v-input-normal";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
import VUser from "@/components/user/v-user";
import {mapState} from "vuex";
import paginateMixin from "@/mixins/paginate-mixin";
export default {
  name: "v-users",
  components: {VUser, VButtonNormal, VCheckboxesNormal, VInputNormal, VSelectNormal},
  mixins: [paginateMixin],
  computed: mapState({
    profile: state => state.auth.profile,
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      users: [],
      rubrics: [],
      selected_rubric_id: null,
      categories: [],
      selected_category_ids: [],
      search: '',
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
    usersGet(){
      this.emitter.emit("load", true)
      this.$store.dispatch("user/GET", `?page=${this.page}&per_page=${this.per_page}&search=${this.search}&rubric_id=${this.selected_rubric_id}&category_ids=[${this.selected_category_ids}]&search=${this.search}`).then(data => {
        this.users = data.obj.items
        this.setPaginate(data.obj.pages, data.obj.page, data.obj.per_page)
      }).finally(() => this.emitter.emit("load", false))
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
.users{
  grid-template-columns: 1fr 2fr;
}
.users_list{
  grid-template-columns: 1fr 1fr 1fr;
}
</style>