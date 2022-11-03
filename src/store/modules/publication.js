import request from "@/store/request";

const publication = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/publication", "POST", body)
            return data
        },
        async UPDATE(context, form){
            const data = await request(context, "/publication?id="+form.id, "PUT", form.form)
            return data
        },
        async DELETE(context, publication_id){
            const data = await request(context, "/publication?id="+publication_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/publication"+query, "GET")
            return data
        }
    }
}

export default publication