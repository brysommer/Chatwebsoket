console.log(io);
const socket = io();
setTimeout(() => {
    console.log('send1');
    socket.emit('chat', {a: 123}, (data) => {
        console.log('receive: ', data);
    });
}, 3000);

setTimeout(() => {
    console.log('send1');
    socket.emit('chat', {a: 345}, (data) => {
        console.log('receive: ', data);
    });
}, 6000);