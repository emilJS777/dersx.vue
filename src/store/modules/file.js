import request from "@/store/request";

const file = {
    namespaced: true,
    actions: {
        async CREATE(context, body){
            const data = await request(context, "/file"+body.query, "POST", body.form)
            return data
        },
        async DELETE(context, filename){
            const data = await request(context, "/file?filename="+filename, "DELETE")
            return data
        },
        async GET(context, filename){
            const data = await request(context, `/file?filename=${filename}`, "GET")
            return data
        }
    }
}

export default file