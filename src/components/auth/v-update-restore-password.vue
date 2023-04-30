<template>
    <div class="modal d-flex a-items-center j-content-center">
        <form class="modal-content h-max-content animation-from-hidden">
            <h4 class="m-top-0 m-bottom-1 t-center d-flex g-gap-1 a-items-center j-content-center" v-if="user">{{user.name}} восстановления пароля  </h4>
            <v-input-normal label="новый пароль" type="password" span="пароль должен содержать не менее 8 и не больше 32 символов" @value="value => form.new_password = value"/>
            <v-input-normal label="повторите пароль" type="password" class="m-top-1" @value="value => form.confirm_password = value"/>

            <div class="btn_block d-flex g-gap-1 m-top-1 j-content-flex-end">
                <v-button-normal label="отправить" class="bg-content" @click="updateRestorePassword"/>
                <v-button-normal label="закрыт" @click="this.$emit('close')"/>
            </div>
        </form>
    </div>
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal.vue";
import VInputNormal from "@/components/_general/v-input-normal.vue";

export default {
    name: "v-update-restore-password",
    components: {VInputNormal, VButtonNormal},
    data(){
        return{
            user: null,
            form: {
                new_password: '',
                confirm_password: ''
            }
        }
    },
    mounted() {
        this.emitter.emit('load', true)
        this.$store.dispatch('restore_password/GET', `?security_code=${this.$route.query.restore_password_security_code}`).then(data => {
            if(!data.success)
                this.$router.push({'path': '/'})
            else
                this.user = data.obj.user
        }).finally(() => this.emitter.emit('load', false))
    },
    methods: {
        updateRestorePassword(e){
            e.preventDefault()
            this.emitter.emit('load', true)
            this.$store.dispatch('restore_password/UPDATE', {security_code: this.$route.query.restore_password_security_code, form: this.form}).then(data => {
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