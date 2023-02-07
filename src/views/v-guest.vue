<template>
  <div class="d-grid head_content g-gap-3  m-top-2 animation-from-hidden">
    <div class="">
      <h2>Веб платформа для фриланса </h2>
      <p>
        Это Фриланс онлайн биржа - это место, где можно добавлять вакансии, предложения своих услуг, искать айтишников и вакансии.
        Здесь вы можете выставить свой опыт работы, показать свои навыки и умения, а также заниматься своими публикациями.
        профиль и станьте частью активно растущей сети фрилансеров на нашей платформе!
      </p>

      <v-button-normal label="" class="w-max bg-content m-top-2 f-weight-bold"/>
    </div>

    <div class="d-flex j-content-flex-end h-max-content">
      <img class="w-max" src="@/assets/images/082065f5d7b560b8f9c4c66c94b1429e.png" alt="">
    </div>
  </div>

<!--  <div class="m-top-3 d-grid g-gap-3 footer_content animation-from-hidden">-->
<!--    <div class="padding-1 bg-fff b-radius-8 h-max-content">-->
<!--      <h3 class="f-weight-bold">Adding employees</h3>-->
<!--      <p>-->
<!--        Efficiently manage your store's staff with Cenance employee management feature. You can easily add and edit-->
<!--        employee information, assign roles and track their sales performance. With real-time updates, you'll always-->
<!--        know who's working and when. Plus, you can set permissions for each employee, so you have complete control over what-->
<!--        they can access and do in the system. Streamline your store's operations and improve accountability with Cenance-->
<!--        employee management feature.-->
<!--      </p>-->
<!--    </div>-->
<!--    <div class="padding-1 bg-fff b-radius-8 h-max-content">-->
<!--      <h3 class="f-weight-bold">Mobile app</h3>-->
<!--      <p>-->
<!--        Introducing the cenance mobile app - now you can access your store's financial information anytime,-->
<!--        anywhere. With our app, you can view your financial reports, track income and expenses, and more, all-->
<!--        from your mobile device. Never miss a beat with real-time updates and notifications. With the convenience of our-->
<!--        mobile app, managing your store's finances has never been easier. Download the cenance mobile app now and take-->
<!--        control of your store's finances on the go.-->
<!--      </p>-->
<!--    </div>-->
<!--    <div class="padding-1 bg-fff b-radius-8 d-grid j-content-flex-end h-max-content">-->
<!--      <h3 class="f-weight-bold">90 Day free</h3>-->
<!--      <p class="">-->
<!--        Signing up for cenance is quick and easy. And the best part? You can try it out for yourself with our 90-day free-->
<!--        trial. No credit card required. Just go to cenance.com and register for a new account.-->
<!--      </p>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import VButtonNormal from "@/components/_general/v-button-normal.vue";

export default {
  name: "v-guest",
  components: {VButtonNormal}
}
</script>

<style scoped>
.head_content{
  grid-template-columns: 1.2fr 1fr;
}
p{
  font-size: 18px;
}
.footer_content{
  grid-template-columns: 1fr 1fr 1fr;
}
</style>