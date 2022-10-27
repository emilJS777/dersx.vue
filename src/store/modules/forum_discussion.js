import request from "@/store/request";

const forum_discussion = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/forum_discussion", "POST", body)
            return data
        },
        async UPDATE(context, form){
            const data = await request(context, "/forum_discussion?id="+form.id, "PUT", form.form)
            return data
        },
        async DELETE(context, forum_discussion_id){
            const data = await request(context, "/forum_discussion?id="+forum_discussion_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/forum_discussion"+query, "GET")
            return data
        }
    }
}

export default forum_discussion