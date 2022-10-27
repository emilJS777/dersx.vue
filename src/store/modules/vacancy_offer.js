import request from "@/store/request";

const vacancy_offer = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/vacancy_offer", "POST", body)
            return data
        },
        async UPDATE(context, form){
            const data = await request(context, "/vacancy_offer?id="+form.id, "PUT", form.form)
            return data
        },
        async DELETE(context, vacancy_offer_id){
            const data = await request(context, "/vacancy_offer?id="+vacancy_offer_id, "DELETE")
            return data
        },
        async GET(context, query){
            const data = await request(context, "/vacancy_offer"+query, "GET")
            return data
        }
    }
}

export default vacancy_offer