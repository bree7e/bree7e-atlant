var http = require('http');
var ws = require('ws');

var clients = {};
var id = 0;

var ws = new ws.Server({ port: 4500 });
ws.on('connection', function(ws) {
    console.log('Новое соединение: ' + ++id);
    clients[id] = ws;

    ws.on('message', function(jsonMessage) {
        console.log('Получено сообщение ' + jsonMessage);
        let delay = Math.round(Math.random() * 5000) + 1000;
        const message = JSON.parse(jsonMessage);
        switch (message.action) {
            case 'allow':
                console.log("Разрешить " + jsonMessage); 
                break;
            case 'timeout':
                console.log("Запретить " + jsonMessage);        
                delay *= 5
                return false
                break;
        }
        message.delay = delay

        const newMessage = JSON.stringify(message);
        setTimeout(() => {
            for (var key in clients) {
                clients[key].send(newMessage);
            }
        }, delay)
    });

    ws.on('close', function() {
        console.log(`Cоединение ${id} закрыто `);
        delete clients[id];
    });
});

console.log('Сервер запущен на порту 4500');
