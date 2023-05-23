const deviceMixin = {
    data(){
        return{
            mobile: false
        }
    },
    created() {
        if(window.innerWidth < 640)
            this.mobile = true
    }
}
export default deviceMixin