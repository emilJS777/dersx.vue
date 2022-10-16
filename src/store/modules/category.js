import request from "@/store/request";

const category = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/category", "POST", body)
            return data
        },
        async UPDATE(context, category_id, body){
            const data = await request(context, "/category?id="+category_id, "PUT", body)
            return data
        },
        async DELETE(context, category_id){
            const data = await request(context, "/category?id="+category_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/category"+query, "GET")
            return data
        }
    }
}

export default category