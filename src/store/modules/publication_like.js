import request from "@/store/request";

const publication_like = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/publication_like", "POST", body)
            return data
        },
        async DELETE(context, publication_id){
            const data = await request(context, "/publication_like?publication_id="+publication_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/publication_like"+query, "GET")
            return data
        }
    }
}

export default publication_like