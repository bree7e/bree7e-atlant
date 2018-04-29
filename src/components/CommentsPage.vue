<template>
  <div>
    <h2>Комментарии и WebSocket</h2>
    <CommentList
      :comments="comments"
      @delete-request="onRequestToDeleteComment"
    />
    <ul v-if="requests.length > 0">
      <h3>Запросы</h3>
      <li v-for="r of requests" :key="r.id">
        {{ r.id }} в состоянии {{ r.status }}
      </li>
    </ul>
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
      ],
      timeout: 3500,
      // promise like массив для обработки ответов
      requests: []
    }
  },
  methods: {
    connect: function () {
      const server = 'ws://localhost:4500'
      // const server = 'ws://echo.websocket.org'
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
    sendToServer: function (id, message) {
      if (!this.connected) {
        this.socket.send(message)
        const request = {
          id: id,
          status: 'pending'
        }
        this.requests.push(request)
        const self = this
        setTimeout(function () {
          self.setRequestStatus(id, 'timeouted')
        }, self.timeout)
      } else {
        console.error('Попытка отправить сообщение на закрытом соединении')
      }
    },
    receivedFromServer: function (event) {
      console.log('Вернулось ', event.data)
      const response = JSON.parse(event.data)
      const result = this.setRequestStatus(response.id, 'fulfilled')
      // здесь можно реализовать уникальные действия на клиенте
      if (result && (response.action === 'allow')) {
        const id = response.commentId
        this.deleteComment(id)
      }
    },
    setRequestStatus (id, status) {
      if ((this.getRequest(id).status === 'fulfilled') && (status === 'timeouted')) {
        console.warn(`Таймаут по запросу ${id} отклонён, т.к. запрос был выполнен`)
        return false
      }
      if (this.getRequest(id).status !== 'pending') {
        console.warn(`Запрос ${id} в состоянии ${this.getRequest(id).status}. ${status} отклонено`)
        return false
      }
      switch (status) {
        case 'timeouted':
          console.log(`Запрос ${id} сброшен по таймауту`)
          break
        case 'fulfilled':
          console.log(`Запрос ${id} выполнен`)
          break
      }
      // TODO надо проставить всем
      this.requests.find(request => request.id === id).status = status
      return true
    },
    getRequest (id) {
      return this.requests.find(request => request.id === id)
    },
    deleteComment (id) {
      console.log(`Комментарий ${id} удалён`)
      this.comments = this.comments.filter(comment => {
        return comment.id !== id
      })
    },
    // Эмуляция разных вариантов ответа сервера
    caseHelperShouldDelete (n) {
      switch (n % 2) {
        case 0:
          console.log(n, 'Allow')
          return 'allow'
        case 1:
          console.log(n, 'Timeout')
          return 'timeout'
      }
    },
    onRequestToDeleteComment: function (commentId) {
      // console.log('Запрос номер ', requestId, ' Коммент ', commentId)
      const action = this.caseHelperShouldDelete(requestId)
      var message = {
        id: requestId,
        commentId: commentId,
        action: action
      }
      var jsonMessage = JSON.stringify(message)
      this.sendToServer(requestId, jsonMessage)
      requestId++
    }
  },
  created: function () {
    this.connect()
    this.socket.onmessage = this.receivedFromServer
  },
  destroyed: function () {
    this.disconnect()
  }
}
</script>
