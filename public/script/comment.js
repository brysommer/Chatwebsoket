const postButton = document.querySelector('button[name="post"]');
const el1 = document.querySelector('input[name="author"]');
const el2 = document.querySelector('textarea[name="comment"]');

let url = window.location.href;
const slicedUrl = url.split('/');
const params = slicedUrl[4];
console.log(params);

//posting comments data to server
const postData = async () => {
    const data = {
        author: el1.value,
        comment: el2.value,
        params
    };
    await axios({
        method: 'post',
        url: '/postcomment',
        data: data,
        headers: { "Content-type": "application/json" }
        })
    .then(function(response) {
        console.log('Ответ сервера успешно получен!');
        console.log(response.data);
        })
    .catch(function(error) {
        console.log(error);
    });    
};



//events
postButton.addEventListener('click', (click) => {
    postData();
});
getComments();
