import request from "@/store/request";

const forum = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/forum", "POST", body)
            return data
        },
        async UPDATE(context, form){
            const data = await request(context, "/forum?id="+form.id, "PUT", form.form)
            return data
        },
        async DELETE(context, forum_id){
            const data = await request(context, "/forum?id="+forum_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/forum"+query, "GET")
            return data
        }
    }
}

export default forum