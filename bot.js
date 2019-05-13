//twitch
const tmi = require('tmi.js');
const fs = require('fs')
//
const io = require('socket.io-client');
const socket = io("https://socket.donationalerts.ru:443");




var options = {
    options: {
      debug: true
    },
    connection: {
      cluster: "aws",
      reconnect: true
    },
    identity: {
        username: "",//имя бота
        password: ""//токен бота
    },
    channels: [""]//каналы которые парсит бот
};


fs.readFile('settings.json', 'utf8', function(error, data){
	data = JSON.parse(data)
	options.identity.username = data.settings.username
	options.identity.password = data.settings.tokenBot
	options.channels[0] = data.settings.channels

  socket.emit('add-user', {
  token: data.settings.tokenDonate,//donation alerts токен
  type: "minor"
});

})

var client = new tmi.client(options);
client.connect();
console.log('Connected to Twitch succefully end')

//donation alerts
socket.on('connect', function(data){
    console.log('Connected to Donation Alerts succefully end ')
});
socket.on('donation', function(msg){
  donate = JSON.parse(msg)
  client.action(options.channels[0]," | "+ donate.username + " - " + "[" + donate.amount + " " +donate.currency+"]" + '\n' + donate.message)
}); 
