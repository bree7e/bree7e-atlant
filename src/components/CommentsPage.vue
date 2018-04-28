<template>
  <div>
    <h2>Комментарии и WebSocket</h2>
    <CommentList
      :data="data"
      @delete="onRequestToDeleteComment"
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
      data: [
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
      this.socket = new WebSocket('ws://localhost:4500')

      this.socket.onopen = function () {
        console.log('Соединение установлено')
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
    onRequestToDeleteComment: function (event) {
      console.log('Запрос номер ', requestId)
      var message = {
        id: requestId++,
        body: 'something'
      }
      var jsonMessage = JSON.stringify(message)
      this.socket.send(jsonMessage)
    }
  },
  created: function () {
    this.connect()
    this.socket.onmessage = function (event) {
      console.log(event.data)
      var id = JSON.parse(event.data).id
      switch (id % 3) {
        case 0:
          console.log('Case 1. Данные ' + event.data)
          break
        case 1:
          console.log('Case 2. Данные ' + event.data)
          break
        case 2:
          console.log('Case 3. Данные ' + event.data)
          break
      }
    }
  },
  destroyed: function () {
    this.disconnect()
  }
}
</script>
