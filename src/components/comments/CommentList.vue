<template>
  <ul class="comments">
      <Comment
        v-for="comment of comments"
        :key="comment.id"
        :comment="comment"
        @delete="onDeleteClick"
        />
  </ul>
</template>

<script>
import Comment from '@/components/comments/Comment.vue'

export default {
  props: {
    comments: Array
  },
  components: {
    Comment
  },
  methods: {
    onDeleteClick (id) {
      this.$emit('delete-request', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.comments {
  list-style-type: none;
}
</style>
