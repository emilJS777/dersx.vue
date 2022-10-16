const paginateMixin = {
    data(){
        return{
            page_count: 1,
            page: 1,
            per_page: 15
        }
    },
    methods:{
        setPaginate(page_count, page, per_page){
            this.page_count = page_count
            this.page = page
            this.per_page = per_page
        }
    }
}
export default paginateMixin
