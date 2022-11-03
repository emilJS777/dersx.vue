import request from "@/store/request";

const service_image = {
    namespaced: true,
    actions: {
        async CREATE(context, form){
            const data = await request(context, "/service_image"+form.query, "POST", form.form)
            return data
        },
        async DELETE(context, query){
            const data = await request(context, "/service_image"+query, "DELETE")
            return data
        }
    }
}

export default service_image