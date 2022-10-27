const toggleMixin = {
    data(){
        return{
            modalName: false,
            id: null
        }
    },
    methods:{
        setModalName(modal_name, id=null){
            this.modalName = false;
            this.id = null;
            setTimeout(() => {
                this.modalName = modal_name
                this.id = id
            }, 20)
        },
        refreshModalName(){

        }
    }
}
export default toggleMixin