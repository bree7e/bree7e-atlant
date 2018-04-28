<template>
  <li class="comment">
    {{ comment.body }}
    <button
      class="comment__delete-button"
      @click="$emit('delete', comment.id)"
      >Удалить</button>
  </li>
</template>

<script>
export default {
  props: {
    comment: {
      type: Object,
      required: true
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
