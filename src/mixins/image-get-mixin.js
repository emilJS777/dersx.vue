const imageGetMixin = {
    data(){
        return{
            user_image_b64: null,
            user_image_type: null,
        }
    },
    methods:{
        image_get(image_path){
            this.$store.dispatch('user_image/GET', `?filename=${image_path}`).then(data => {
                if(data.success){
                    this.user_image_b64 = data.obj.b64
                    this.user_image_type = data.obj.format
                }
            })
        }
    }
}
export default imageGetMixin