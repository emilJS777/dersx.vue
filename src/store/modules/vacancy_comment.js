import request from "@/store/request";

const vacancy_comment = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/vacancy_comment", "POST", body)
            return data
        },
        async UPDATE(context, form){
            const data = await request(context, "/vacancy_comment?id="+form.id, "PUT", form.form)
            return data
        },
        async DELETE(context, vacancy_comment_id){
            const data = await request(context, "/vacancy_comment?id="+vacancy_comment_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/vacancy_comment"+query, "GET")
            return data
        }
    }
}

export default vacancy_comment