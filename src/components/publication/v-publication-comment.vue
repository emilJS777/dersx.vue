<template>
  <div class="publication_comment m-top-2 d-grid bg-ccc-opacity padding-05">
    <div class="d-grid g-gap-1 p-relative">
      <div class="d-flex a-items-center g-gap-_5 p-relative w-max" >
        <router-link :to="`/profile?id=${publication_comment.creator.id}`" class="img_block b-content-hover p-relative c-pointer o-hidden b-radius-50 d-flex j-content-center a-items-center">
          <!--            <img src="@/assets/images/user-unknown-1.png" alt="" v-if="!vacancy.creator.image">-->
          <span v-if="!publication_comment.creator.image">{{publication_comment.creator.first_name[0]}}</span>
          <img :src="'data:image/'+publication_comment.creator.image.filename+';charset=utf-8;base64, ' + publication_comment.creator.image.b64" class="p-absolute absolute-center profile_image" v-else>
        </router-link>
        <div class="d-grid info_block j-content-flex-end">
          <i>{{ publication_comment.creator.first_name }} {{ publication_comment.creator.last_name }}</i>
          <span class="f-size-small">{{publication_comment.creator.name}}</span>
        </div>
      </div>
    </div>
    <span class="f-size-small m-top-1">{{publication_comment.text}}</span>

    <p class="m-bottom-0 f-size-small"><b>опубликовано</b> {{publication_comment.creation_date}}</p>
  </div>
</template>

<script>
export default {
  name: "v-publication-comment",
  props: ['publication_comment']
}
</script>

<style scoped>
.img_block{
  border: 1px solid #ccc;
  height: 40px;
  width: 40px;
}
.profile_image{
  width: 120%;
  height: auto;
}
</style>