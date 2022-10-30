<template>
  <div class="d-flex a-items-center j-content-center">
    <div class="bg-fff padding-1 w-max h-max-content animation-from-hidden">
      <h3 class="m-top-0">контакт</h3>

      <v-input-normal label="тип"
                      placeholder="телефон"
                      span="укажите тип контакта, это может быть телефон, скайп или тому подобное"
                      @value="value => form.type = value"/>

      <v-input-normal label="контактная информация"
                      span="пропишите контактные данные. телефонный номер или имя пользователя, в зависимости какоой тип вы выбрали"
                      placeholder="(010) 123 123 123"
                      class="m-top-1"
                      @value="value => form.information = value"/>

      <div class="d-flex g-gap-1 m-top-1 j-content-flex-end">
        <v-button-normal label="сохранить" class="bg-content" @click="onContact"/>
        <v-button-normal label="закрыть" @click="this.$emit('close')"/>
      </div>
    </div>
  </div>
</template>

<script>
import VInputNormal from "@/components/_general/v-input-normal";
import VButtonNormal from "@/components/_general/v-button-normal";
export default {
  name: "v-contact-edit-form",
  components: {VButtonNormal, VInputNormal},
  data(){
    return{
      form: {
        type: null,
        information: null
      }
    }
  },
  methods: {
    onContact(){
      this.emitter.emit('load', true)
      this.$store.dispatch("user_contact/CREATE", this.form).then(data => {
        this.emitter.emit('message', data)
      }).finally(() => this.emitter.emit('load', false))
    }
  }
}
</script>

<style scoped>

</style>