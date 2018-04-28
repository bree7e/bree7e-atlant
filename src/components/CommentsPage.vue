<template>
  <div>
    <h2>Комментарии и WebSocket</h2>
    <CommentList
      :comments="comments"
      @delete-request="onRequestToDeleteComment"
    />
  </div>
</template>

<script>
import CommentList from '@/components/comments/CommentList.vue'

let autoId = 137 // удовлетворить требование иметь key для v-for
let requestId = 0 // запросы к серверу

export default {
  components: {
    CommentList
  },
  data: function () {
    return {
      socket: null,
      connected: false,
      comments: [
        { id: autoId++, body: 'Тестовый коммент 1' },
        { id: autoId++, body: 'Это шедевр' },
        { id: autoId++, body: 'Это прекрасно' },
        { id: autoId++, body: 'Лучшее, что я видел' },
        { id: autoId++, body: 'Два чая этому автору' }
      ]
    }
  },
  methods: {
    connect: function () {
      // const server = 'ws://localhost:4500'
      const server = 'ws://echo.websocket.org'
      this.socket = new WebSocket(server)

      this.socket.onopen = function () {
        console.log('Соединение установлено c сервером', server)
        this.connected = true
      }

      this.socket.onclose = function (event) {
        if (event.wasClean) {
          console.log('Соединение закрыто без ошибок')
        } else {
          console.log('Обрыв соединения')
        }
        // console.log('Код: ' + event.code + ' причина: ' + event.reason)
      }

      this.socket.onerror = function (error) {
        console.log('Ошибка ' + error.message)
      }
    },
    disconnect: function () {
      this.socket.close()
      this.connected = false
    },
    sendToServer: function (message) {
      if (this.connected) {
        this.socket.send(message)
      } else {
        console.error('Попытка отправить сообщение на закрытом соединении')
      }
    },
    getComment (id) {
      return this.comments.filter(comment => {
        return comment.id === id
      })
    },
    deleteComment (id) {
      console.log(`Комментарий ${id} удалён`)
      this.comments = this.comments.filter(comment => {
        return comment.id !== id
      })
    },
    caseHelperShouldDelete (n) {
      switch (n % 3) {
        case 0:
          console.log('Allow')
          return 'allow'
        case 1:
          console.log('Deny')
          return 'deny'
        case 2:
          console.log('Timeout')
          return 'timeout'
      }
    },
    onRequestToDeleteComment: function (commentId) {
      // console.log('Запрос номер ', requestId, ' Коммент ', commentId)
      const action = this.caseHelperShouldDelete(requestId)
      var message = {
        id: requestId++,
        commentId: commentId,
        action: action
      }
      var jsonMessage = JSON.stringify(message)
      this.socket.send(jsonMessage)
    }
  },
  created: function () {
    this.connect()
    const self = this
    this.socket.onmessage = function (event) {
      console.log(event.data)
      const action = JSON.parse(event.data).action
      if (action === 'allow') {
        const id = JSON.parse(event.data).commentId
        self.deleteComment(id)
      }
    }
  },
  destroyed: function () {
    this.disconnect()
  }
}
</script>
