<template>
    <div class="modal d-flex a-items-center j-content-center">
        <form class="modal-content h-max-content animation-from-hidden" @submit="createRestorePassword">
            <h3 class="m-top-0 m-bottom-1 t-center d-flex g-gap-1 a-items-center j-content-center"> восстановления пароля  </h3>
            <v-input-normal label="адрес эл. почты" span="мы отправим письмо на эл. почту для восстановления пароля" @value="value => form.address = value"/>


            <div class="btn_block d-flex g-gap-1 m-top-1 j-content-flex-end">
                <v-button-normal label="отправить" class="bg-content" @click="createRestorePassword"/>
                <v-button-normal label="закрыт" @click="this.$emit('close')"/>
            </div>
        </form>
    </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal.vue";
import VInputNormal from "@/components/_general/v-input-normal.vue";

export default {
    name: "v-create-restore-password",
    components: {VInputNormal, VButtonNormal},
    data(){
        return{
            form: {
                'address': ''
            }
        }
    },
    methods:{
        createRestorePassword(e){
            e.preventDefault()
            this.emitter.emit('load', true)
            this.$store.dispatch('restore_password/CREATE', this.form).then(data => {
                this.emitter.emit('message', data)
            }).finally(() => this.emitter.emit('load', false))
        }
    }
}
</script>

<style scoped>
.modal-content{
    width: 35%;
}
</style>