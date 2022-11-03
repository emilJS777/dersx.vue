import request from "@/store/request";

const publication_image = {
    namespaced: true,
    actions: {
        async CREATE(context, form){
            const data = await request(context, "/publication_image"+form.query, "POST", form.form)
            return data
        },
        async DELETE(context, query){
            const data = await request(context, "/publication_image"+query, "DELETE")
            return data
        }
    }
}

export default publication_image