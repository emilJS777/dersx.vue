import request from "@/store/request";

const group = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/group", "POST", body)
            return data
        },
        async UPDATE(context, form){
            const data = await request(context, "/group?id="+form.id, "PUT", form.form)
            return data
        },
        async DELETE(context, group_id){
            const data = await request(context, "/group?id="+group_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/group"+query, "GET")
            return data
        }
    }
}

export default group