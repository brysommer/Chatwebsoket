//upload file by websocket
const fileField = document.querySelector('#file');
fileField.addEventListener('change' , (e) => {
    let file = e.target.files[0];
    let name = file.name;
    let stream = ss.createStream();
    ss(socket).emit('file', stream, name);
      let blobStream = ss.createBlobReadStream(file);
      let size = 0;
      blobStream.on('data', function(chunk) {
        size += chunk.length;
        console.log(Math.floor(size / file.size * 100) + '%');
        // -> e.g. '42%'
      });
      blobStream.pipe(stream);
})

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

let nameH2 = document.querySelector('h2');
const chatLog = document.querySelector('.chat-log');
let message = document.getElementById('Message');
const button = document.getElementById('button');

const socket = io();
let userID;

const userName = prompt('What is your name?', 'анонім');
const submitUserName = (userName) => {
    
    if (userName == null) {
        userName = 'анонім'
    }
    nameH2.innerHTML = userName;
    socket.emit('name', userName), (data) => {
        console.log('receive: ', data);
    }
}
submitUserName(userName);


button.addEventListener('click', (event) => {
    const dataMessage = message.value;
    socket.emit('chat', { message: dataMessage, time: time() } ,  (data) => {
        console.log('receive: ', data);
        userID = data;
    });
    message.value = '';
    
})

socket.on('chatreload', function(data) {
    console.log(data)
    createKeysData(data);
})

//keywords HTML
const createKeysData = (data) => {
    const chat = data.chat;
    const userNames = data.usersName;
    
    let HTML = '';
    data.chat.forEach(element => {
        const name = userNames.find(item => item.UID == element.id);
        let divClass = 'chat-log__item';
        if (element.id == userID) {
            divClass = 'chat-log__item chat-log__item--own'
        }
            HTML += `<div class="${divClass}">
                    <h3 class="chat-log__author">${name.name} <small>${element.time}</small></h3>
                    <div class="chat-log__message">${element.massage}</div>
            </div>`;
    });
    chatLog.innerHTML = HTML;
};