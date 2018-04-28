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

        const message = JSON.parse(jsonMessage);
        switch (message.id % 3) {
            case 0:
                console.log("Разрешить " + jsonMessage); 
                message.decision = 'allow';
                break;
            case 1:
                console.log("Запретить " + jsonMessage);        
                message.decision = 'deny';
                break;
            case 2:
                console.log("Не отправлять " + jsonMessage);
                return false;        
        }

        const newMessage = JSON.stringify(message);
        for (var key in clients) {
            clients[key].send(newMessage);
        }
    });

    ws.on('close', function() {
        console.log(`Cоединение ${id} закрыто `);
        delete clients[id];
    });
});

console.log('Сервер запущен на порту 4500');
