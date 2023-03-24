<template>
  <div class="resume-form bg-fff d-grid g-gap-1 h-max-content box-shadow-slim padding-05" id="pdf">
    <div class="padding-2 bg-ccc-opacity h-max">
      <div class="img_parent p-relative m-0-auto">
        <div class="w-max p-relative o-hidden img_div w-max h-max d-block-hover">
          <img src="@/assets/images/user-unknown-1.png" class="p-absolute absolute-center" alt="" v-if="!profile.image">
          <img :src="`data:image/1February:21:2023:17:50:0826993278_167997990491003_9088908709772641957_n.jpg;charset=utf-8;base64, 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`" class="p-absolute absolute-center" alt="" v-else>
        </div>
      </div>

      <div v-if="form.user_abouts.length">
        <h3 class="m-bottom-0">о себе</h3>
        <p class="f-size-small m-bottom-1" v-for="user_about in form.user_abouts" :key="user_about.id">
          {{user_about.description}}
        </p>
      </div>

      <div class="d-grid a-items-center g-gap-_5 m-top-2">
        <p class="d-flex g-gap-1 a-items-center">
          <i class="fa fa-map-marker" aria-hidden="true"></i>
          <span>{{ profile.region }}</span>
        </p>

        <p class="d-flex g-gap-1 a-items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
          </svg>
          <span class="d-grid">
            {{ profile.email_address }}
          </span>

        </p>
        <p class="d-flex g-gap-1 a-items-center">
          <i class="fa fa-venus-mars"></i>
          <span class="d-grid">
            <span v-if="profile.gender">{{profile.gender.title}}</span>
            <span v-else>не указано</span>
          </span>
        </p>
      </div>
    </div>

    <div class="padding-1 d-grid">
      <div class="h-max-content">
        <h2 class="m-top-0 m-bottom-0">{{profile.first_name}} {{profile.last_name}}</h2>
      </div>
      <div class="m-top-2" v-if="form.skills.length">
        <h3 class="m-top-0 m-bottom-0 c-content">навыки и умения</h3>
        <div>
          <div v-for="skill in form.skills" :key="skill.id" class="d-grid g-gap-1 a-items-center about_block">
            <div class="m-top-1 padding-05">
              <div class="d-flex g-gap-1 a-items-center">
                <b>рубрика: </b>
                <span class="f-size-small">{{skill.rubric.title}}</span>
              </div>
              <div class="" v-if="skill.categories.length">
                <b>категории: </b>
                <span v-for="category in skill.categories" :key="category.id" class="f-size-small">
              - {{category.title}}
            </span>
              </div>
              <div class="">
                <b>теги: </b>
                <span class="f-size-small">{{skill.tags}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="m-top-2" v-if="form.work_experiences.length">
        <h3 class="m-top-0 m-bottom-0 c-content">опыт работы</h3>

        <div v-for="work_experience in form.work_experiences" :key="work_experience.id" class="d-grid g-gap-1 a-items-center about_block">
          <div class="m-top-1 d-grid fa-border padding-05">
            <div class="d-flex a-items-flex-start g-gap-_5">
              <b>название: </b>
              <span class="f-size-small" v-if="work_experience.title">{{work_experience.title}}</span>
              <span class="f-size-small" v-else>(не указан)</span>
            </div>
            <div class="d-flex a-items-flex-start g-gap-_5">
              <b>линк: </b>
              <span class="f-size-small" v-if="work_experience.link">
              <a :href="work_experience.link" class="c-content">{{work_experience.link}}</a>
            </span>
              <span class="f-size-small" v-else>(не указан)</span>
            </div>
            <div class="d-flex a-items-flex-start g-gap-_5">
              <b>используемые скилы или технологии: </b>
              <span class="f-size-small" v-if="work_experience.skills">{{work_experience.skills}}</span>
              <span class="f-size-small" v-else>(не указан)</span>
            </div>
            <div class="d-flex a-items-flex-start g-gap-_5">
              <b>описание: </b>
              <span class="f-size-small" v-if="work_experience.description">{{work_experience.description}}</span>
              <span class="f-size-small" v-else>(не указан)</span>
            </div>
            <div class="d-flex a-items-flex-start g-gap-_5">
              <b>дата начало работы: </b>
              <span class="f-size-small" v-if="work_experience.date_start">{{work_experience.date_start}}</span>
              <span class="f-size-small" v-else>(не указан)</span>
            </div>
            <div class="d-flex a-items-flex-start g-gap-_5">
              <b>дата окончание работы: </b>
              <span class="f-size-small" v-if="work_experience.date_end">{{work_experience.date_end}}</span>
              <span class="f-size-small" v-else>(не указан)</span>
            </div>
          </div>
        </div>
      </div>
      <div class="m-top-2 d-grid g-gap-_5" v-if="form.user_contacts.length">
        <h3 class="m-top-0 m-bottom-0 c-content">
          контакты
        </h3>
        <div>
          <div v-for="user_contact in form.user_contacts" :key="user_contact.id" class="d-grid a-items-center g-gap-_5 about_block g-gap-_5">
            <div class="d-flex g-gap-_5 a-items-center">
              <b>{{user_contact.type}}</b>
              <span class="f-size-small">{{user_contact.information}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
import {mapState} from "vuex";
export default {
  name: "v-resume-form",
  computed: mapState({
    profile: state => state.auth.profile
  }),
  data(){
    return{
      web_api: process.env.WEB_API,
      form: {
        skills: [],
        user_abouts: [],
        user_contacts: [],
        work_experiences: []
      }
    }
  },
  mounted() {
    this.emitter.emit('load', true)
    //  SKILLS
    this.$store.dispatch("skill/GET", `?user_id=${this.profile.id}`).then(data => {
      this.form.skills = data.obj
    })
    //  WORK EXPERIENCES
    this.$store.dispatch("work_experience/GET", `?user_id=${this.profile.id}`).then(data => {
      this.form.work_experiences = data.obj
    })
    //  USER ABOUT
    this.$store.dispatch("user_about/GET", `?user_id=${this.profile.id}`).then(data => {
      this.form.user_abouts = data.obj
    })
    //  USER CONTACTS
    this.$store.dispatch("user_contact/GET", `?user_id=${this.profile.id}`).then(data => {
      this.form.user_contacts = data.obj
    })
    this.emitter.emit('load', false)
  },
}
</script>

<style scoped>
.resume-form{
  grid-template-columns: 1fr 2fr;
}
.img_parent{
  width: 150px;
  height: 150px;
}
.img_div > img{
  min-height: 100%;
  max-height: 100%;
}
</style>