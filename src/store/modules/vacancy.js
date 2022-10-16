import request from "@/store/request";

const vacancy = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/vacancy", "POST", body)
            return data
        },
        async UPDATE(context, vacancy_id, body){
            const data = await request(context, "/vacancy?id="+vacancy_id, "PUT", body)
            return data
        },
        async DELETE(context, vacancy_id){
            const data = await request(context, "/vacancy?id="+vacancy_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/vacancy"+query, "GET")
            return data
        }
    }
}

export default vacancy