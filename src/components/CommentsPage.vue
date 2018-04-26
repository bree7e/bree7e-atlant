<template>
  <div>
    <h2>Комментарии и WebSocket</h2>
    <CommentList/>
  </div>
</template>

<script>
import CommentList from '@/components/comments/CommentList.vue'

export default {
  components: {
    CommentList
  }
}
</script>
