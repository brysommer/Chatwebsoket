const time = () => {
    const date = new Date();
    const hours = date.getHours();
    let minutes = date.getMinutes().toString();
    if (minutes == 0) {
        minutes = '00';
    }
    if (minutes.length == 1) {
        minutes = '0' + minutes;
    } 
    const time = hours + ':' + minutes;
    console.log(time);
    return time;
};


const chatLog = document.querySelector('.chat-log');
let message = document.getElementById('Message');
const button = document.getElementById('button');
console.log(chatLog)

console.log(io);
const socket = io();
let userID;

button.addEventListener('click', (event) => {
    const dataMessage = message.value;
    socket.emit('chat', { message: dataMessage, time: time() } ,  (data) => {
        console.log('receive: ', data);
        userID = data;
    });
    message.value = '';
    
})

socket.on('chatreload', function(data) {
    createKeysData(data);    
})

//keywords HTML
const createKeysData = (data) => {
    let HTML = '';
    data.forEach(element => {
        let divClass = 'chat-log__item';
        if (element.id == userID) {
            divClass = 'chat-log__item chat-log__item--own'
        }
            HTML += `<div class="${divClass}">
                    <h3 class="chat-log__author">Felipe <small>${element.time}</small></h3>
                    <div class="chat-log__message">${element.massage}</div>
            </div>`;
    });
    chatLog.innerHTML = HTML;
};