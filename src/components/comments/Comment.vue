<template>
  <li class="comment">
    {{ body }}
    <button class="comment__delete-btn">Удалить</button>
  </li>
</template>

<script>
export default {
  props: {
    comment: Object
  },
  data: function () {
    return {
      body: this.comment.body
    }
  }
}
</script>

<style lang="scss" scoped>
.comment {
  margin-top: 2rem;
  padding-left: 1rem;
  border-left: 2px solid gray;
}
</style>
