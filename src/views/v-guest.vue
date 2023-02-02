<template>
  <div class="d-grid head_content g-gap-3  m-top-2 animation-from-hidden">
    <div class="">
      <span class="c-content">SkillX վեբ հարթակ</span>
      <h2>Հաշվապահական վեբ հարթակ</h2>
      <p>
        Հոգնե՞լ եք ձեր խանութի ֆինանսները ձեռքով կառավարելուց: Այլևս մի՛ փնտրեք։ Ներկայացնելով AchieverHQ-ը՝ վեբի
        վրա հիմնված հաշվապահական լուծումը, որը նախատեսված է հատուկ փոքր բիզնեսի համար: Մեր օգտատերերի համար
        հարմար հարթակը հեշտացնում է եկամուտներին և ծախսերին հետևելը, ֆինանսական հաշվետվություններ ստեղծելը և այլն:
        Իսկ ամենալավ մասը. Դուք կարող եք դա փորձել ինքներդ՝ մեր 3 ամիս անվճար փորձաշրջանի միջոցով: Ուրեմն ինչու
        սպասել: Գրանցվեք հիմա AchieverHQ-ում և վերահսկեք ձեր խանութի ֆինանսներն այսօր:
      </p>

      <v-button-normal label="Կարդալ ավելին" class="bg-content m-top-2 f-weight-bold"/>
    </div>

    <div class="d-flex j-content-flex-end h-max-content">
      <img class="w-max" src="https://freeagent-res.cloudinary.com/image/upload/c_limit,w_1000/dpr_auto,f_auto/website-images/shared/clay--devices-cropped.png" alt="">
    </div>
  </div>

  <div class="m-top-3 d-grid g-gap-3 footer_content animation-from-hidden">
    <div class="padding-1 bg-fff b-radius-8 h-max-content">
      <h3 class="f-weight-bold">Adding employees</h3>
      <p>
        Efficiently manage your store's staff with Cenance employee management feature. You can easily add and edit
        employee information, assign roles and track their sales performance. With real-time updates, you'll always
        know who's working and when. Plus, you can set permissions for each employee, so you have complete control over what
        they can access and do in the system. Streamline your store's operations and improve accountability with Cenance
        employee management feature.
      </p>
    </div>
    <div class="padding-1 bg-fff b-radius-8 h-max-content">
      <h3 class="f-weight-bold">Mobile app</h3>
      <p>
        Introducing the cenance mobile app - now you can access your store's financial information anytime,
        anywhere. With our app, you can view your financial reports, track income and expenses, and more, all
        from your mobile device. Never miss a beat with real-time updates and notifications. With the convenience of our
        mobile app, managing your store's finances has never been easier. Download the cenance mobile app now and take
        control of your store's finances on the go.
      </p>
    </div>
    <div class="padding-1 bg-fff b-radius-8 d-grid j-content-flex-end h-max-content">
      <h3 class="f-weight-bold">90 Day free</h3>
      <p class="">
        Signing up for cenance is quick and easy. And the best part? You can try it out for yourself with our 90-day free
        trial. No credit card required. Just go to cenance.com and register for a new account.
      </p>
    </div>
  </div>
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