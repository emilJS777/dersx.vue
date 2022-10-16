const toggleMixin = {
    data(){
        return{
            modalName: false,
            id: null
        }
    },
    methods:{
        setModalName(modal_name, id=null){
            this.modalName = modal_name ? modal_name : !this.modalName
            this.id = id ? id : null
        }
    }
}
export default toggleMixin