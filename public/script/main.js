//constants defination
const postButton = document.querySelector('button[name="send"]');
const el1 = document.querySelector('input[name="author"]');
const el2 = document.querySelector('input[name="phone"]');
const el3 = document.querySelector('input[name="location"]');
const el4 = document.querySelector('input[name="title"]');
const el5 = document.querySelector('textarea[name="content"]');
const el6 = document.querySelector('input[name="picture"]');
const el7 = document.querySelector('input[name="keywords"]');
const el8 = document.querySelector('input[name="price"]');
const el9 = document.querySelector('datalist[name="keys"]');
const el10 = document.querySelector('input[name="keywordsinput"]');







//posting data to server
const postData = async () => {
    const data = {
        author: el1.value,
        phone: el2.value,
        location: el3.value,
        title: el4.value,
        content: el5.value,
        picture: el6.value,
        keywords: el7.value,
        price: el8.value,
    };
    await axios({
        method: 'post',
        url: '/postad',
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

//getkeys data
const getKeys = async () => {
    let HTML = '';
    const {data}  = await axios.get('/keys');
    data.forEach(element => {
        console.log(element.keyword);
        HTML += `<option value="${element.keyword}">`
    })
    el9.innerHTML = HTML;
};


//events
getKeys();
postButton.addEventListener('click', (click) => {
    postData();
});

//adding kewords
el10.addEventListener('change', (change) => {
    console.log(el10.value);
    el7.value = '';
    el7.value += el10.value;
})



