//comment consts
const postButton = document.querySelector('button[name="post"]');
const el1 = document.querySelector('input[name="author"]');
const el2 = document.querySelector('textarea[name="comment"]');
//rendering card consts
let contentData;
const el3 = document.querySelector('span[name="title"]');
const el4 = document.querySelector('span[name="content"]');
const el5 = document.querySelector('span[name="author"]');
const el6 = document.querySelector('span[name="location"]');
const el7 = document.querySelector('span[name="phone"]');
const el8 = document.querySelector('span[name="createAt"]');
const el9 = document.querySelector('span[name="updateAt"]');
const el10 = document.querySelector('span[name="price"]');
const el11 = document.querySelector('img[name=pic]');
const el13 = document.querySelector('span[name="keywords"]');
//comments const
const el12 = document.querySelector('div[name=allcomments]');
//params consts
let url = window.location.href;
const slicedUrl = url.split('/');
const params = slicedUrl[4];
console.log(params);


//getting data from server
const getData = async () => {
    const {data}  = await axios.get(`/json/${params}`);
    console.log(data);
    contentData = data;
    createKeysData();
    renderData();
    renderComments();
 /*  await axios.get(`/json/${params}`)
   .then(function (response) {
      // handle success
      console.log(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
   })
    .finally(function () {
      // always executed
   });
  */ 
};
getData();

//keywords HTML
const createKeysData = () => {
    let HTML = '';
    let keysArray = contentData.keywords;
    keysArray.forEach(element => {
        console.log(element.keyword);
        HTML += `<a href="#">#${element.keyword}</a> `;
    });
    el13.innerHTML = HTML;
};



//rendering data
const renderData = () => {
    el3.innerHTML = contentData.title;
    el4.innerHTML = contentData.content;
    el5.innerHTML = contentData.author;
    el6.innerHTML = contentData.location;
    el7.innerHTML = contentData.phone;
    el8.innerHTML = contentData.createdAt;
    el9.innerHTML = contentData.updatedAt;    
    el10.innerHTML = contentData.price;
    el11.src = `/img/${contentData.picture}.jpg`;
};

//rendering comments
const renderComments = () =>{
    let HTML = '';
    contentData.comments.forEach(element => {
        HTML += `
        <div class="card text-start" style="width: 100%;">
            <div class="card-body">
                <h5 class="card-title">${element.author}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${element.createAt}</h6>
                <p class="card-text">${element.comment}</p>
                <a href="#" class="card-link">Відповісти</a>
                <a href="#" class="card-link">+</a>
                <a href="#" class="card-link">-</a>
            </div>   
        </div>
        `;
    });
    el12.innerHTML = HTML;
};


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

