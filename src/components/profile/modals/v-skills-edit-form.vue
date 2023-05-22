<template>
  <div class="d-flex a-items-center j-content-center">
    <div class="bg-fff padding-1 w-max h-max-content animation-from-hidden">
      <h3 class="m-top-0">{{ lang.profile.experience_add.skills_or_technologies.title }}</h3>

      <v-input-normal :label="lang.profile.skills_add.skills.title"
                      :span="lang.profile.skills_add.skills.description"
                      @value="tags => this.body.tags = tags"/>

      <v-select-normal class="m-top-1" :label="lang.general.rubric" :span="lang.profile.skills_add.rubric.description"
                       :items="rubrics"
                       :selected="rubrics[0]"
                       v-if="rubrics.length"
                       @select="select_rubric"/>

      <div class="categories d-flex a-items-center g-gap-1 m-top-1" v-if="categories.length">
        <v-checkboxes-normal :label="lang.profile.skills_add.category.title"
                             :checkboxes="categories"
                             @select="select_categories"/>
      </div>

      <div class="d-flex g-gap-1 m-top-2 j-content-flex-end">
        <v-button-normal :label="lang.general.save" class="bg-content" @click="onSkill"/>
        <v-button-normal :label="lang.general.cancel" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal";
import VInputNormal from "@/components/_general/v-input-normal";
import VSelectNormal from "@/components/_general/v-select-normal";
import VCheckboxesNormal from "@/components/_general/v-checkboxes-normal";
import {mapState} from "vuex";
import validator from "@/validations/skill.json"
import validateMixin from "@/mixins/validate-mixin";
export default {
  name: "v-skills-edit-form",
  components: {VCheckboxesNormal, VSelectNormal, VInputNormal, VButtonNormal},
  mixins: [validateMixin],
  computed: mapState({
    lang: state => state.lang.LANG
  }),
  data(){
    return{
      rubrics: [],
      categories: [],
      body: {
        tags: "",
        rubric_id: null,
        category_ids: []
      }
    }
  },
  mounted(){
    this.$store.dispatch("rubric/GET", "").then(data => {
      this.rubrics = data.obj
    })
    if(this.id)
      this.$store.dispatch("skill/GET", `?id=${this.id}`).then(data => {
        this.body = data.obj
      })
  },
  methods: {
    select_rubric(rubric){
      this.body.rubric_id = rubric.id
      this.body.category_ids = []
      this.categories = []
      this.get_categories()
    },
    select_categories(category_ids){
      this.body.category_ids = category_ids
    },
    get_categories(){
      this.$store.dispatch("category/GET", `?rubric_id=${this.body.rubric_id}`).then(data => {
        this.categories = data.obj
      })
    },
    onSkill(){
      if(this.checkValid(this.body, validator)){
          this.emitter.emit('load', true)
          this.$store.dispatch("skill/CREATE", this.body).then(data => {
              this.emitter.emit("message", data);
          }).finally(() => this.emitter.emit('load', false))
      }
    }
  }
}
</script>

<style scoped>
.modal-content{
  width: 50%;
}
</style>