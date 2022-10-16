<template>
  <button class="form-standard outline-content d-flex a-items-center j-content-center g-gap-1">
    {{svg}}
    {{label}}
  </button>
</template>

<script>
export default {
  name: "v-button-normal",
  props: ['label', 'svg']
}
</script>

<style scoped>
  button{
    text-align: center;
    padding-right: 1em;
    cursor: pointer;
  }
</style>