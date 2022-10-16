import Vuex from "vuex";

import auth from "./modules/auth";
import user from "./modules/user"
import skill from "./modules/skill";
import rubric from "./modules/rubric"
import category from "./modules/category";
import work_experience from "./modules/work_experience"
import gender from "./modules/gender"
import user_about from "./modules/user_about";
import user_contact from "./modules/user_contact";
import user_image from "./modules/user_image";
import vacancy from "./modules/vacancy";
import payment_interval from "./modules/payment_interval";

export default new Vuex.Store({
    namespaced: true,
    modules: {
        auth,
        user,
        skill,
        rubric,
        category,
        work_experience,
        gender,
        user_about,
        user_contact,
        user_image,
        vacancy,
        payment_interval,
    }
})