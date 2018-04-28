<template>
  <ul class="comments">
      <Comment
        v-for="comment of comments"
        :key="comment.id"
        :comment="comment"
        @remove="removeClick"
        />
  </ul>
</template>

<script>
import Comment from '@/components/comments/Comment.vue'

export default {
  props: {
    data: Array
  },
  components: {
    Comment
  },
  data: function () {
    return {
      comments: this.data
    }
  },
  methods: {
    removeClick (idToRemove) {
      console.log('Удаляем комментарий')
      // this.todos = this.todos.filter(todo => {
      // return todo.id !== idToRemove
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.comments {
  list-style-type: none;
}
</style>
