import request from "@/store/request";

const publication_comment = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/publication_comment", "POST", body)
            return data
        },
        async UPDATE(context, form){
            const data = await request(context, "/publication_comment?id="+form.id, "PUT", form.form)
            return data
        },
        async DELETE(context, publication_comment_id){
            const data = await request(context, "/publication_comment?id="+publication_comment_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/publication_comment"+query, "GET")
            return data
        }
    }
}

export default publication_comment