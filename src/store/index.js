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
import vacancy_comment from "./modules/vacancy_comment";
import vacancy_offer from "./modules/vacancy_offer"
import forum from "./modules/forum";
import forum_discussion from "./modules/forum_discussion";
import service from "./modules/service";
import service_image from "./modules/service_image"
import publication from "./modules/publication";
import publication_image from "./modules/publication_image"
import publication_comment from "./modules/publication_comment";
import publication_like from "./modules/publication_like";
import image from "./modules/image";
import message from "./modules/messager/message";
import room from "./modules/messager/room";
import friend from "./modules/friend"
import notification from "./modules/notification"
import company from "@/store/modules/company";
import group from "@/store/modules/group";
import group_invite from "@/store/modules/group_invite";
import email from "@/store/modules/email";
import restore_password from "@/store/modules/restore_password";
import lang from "@/store/modules/lang";
import complaint from "@/store/modules/complaint";
import dynamic_link from "@/store/modules/dynamic_link";
import file from "@/store/modules/file"

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
        vacancy_comment,
        vacancy_offer,
        forum,
        forum_discussion,
        service,
        service_image,
        publication,
        publication_image,
        publication_comment,
        publication_like,
        image,
        message,
        room,
        friend,
        notification,
        company,
        group,
        group_invite,
        email,
        restore_password,
        lang,
        complaint,
        dynamic_link,
        file,
    }
})