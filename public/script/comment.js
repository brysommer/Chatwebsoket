
//comment consts
const form = document.getElementById('form');
const el1 = document.querySelector('input[name="author"]');
const el2 = document.getElementById('exampleFormControlTextarea1');
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
moment.locale('uk');
//params consts
let url = window.location.href;
clearedURl = url.split('#')[0];
const slicedUrl = clearedURl.split('/');
const params = slicedUrl[4];
console.log(params);



//getting data from server
const getData = async () => {
    const {data}  = await axios.get(`/json/${params}`)
    console.log(data);
    contentData = data;
    createKeysData();
    renderData();
    renderComments();

};
getData();

//keywords HTML
const createKeysData = () => {
    let HTML = '';
    let keysArray = contentData.keywords;
    keysArray.forEach(element => {
        console.log(element.keyword);
        HTML += `<a href="/filter/${element._id}">#${element.keyword}</a> `;
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
    el8.innerHTML = moment(contentData.createdAt).format('lll');
    el9.innerHTML = moment(contentData.updatedAt).format('lll');   
    el10.innerHTML = contentData.price;
    el11.src = `/img/${contentData.picture}`;
};

//rendering comments
const renderComments = () =>{
    let commentsArray = contentData.comments;
    commentsArray.sort((a, b) => b.rating > a.rating ? 1 : -1);
    
    let HTML = '';
    contentData.comments.forEach(element => {
        let repliesArray = element.reply;
        repliesArray.sort((a, b) => b.rating > a.rating ? 1 : -1);
        let replies = ''
        element.reply.forEach(element => {
            replies += `
                <div class="row justify-content-end">           
                    <div class="col-9 align-self-end">
                        <div class="card text-start" style="width: 100%;">
                            <div class="card-body" id="${element._id}">
                                <h5 class="card-title">${element.author}</h5>
                                <p class="card-text">${element.comment}</p>
                                <a href="#exampleFormControlTextarea1" id="${element.author}" class="card-link">Відповісти</a>
                                <img class='like' src="/img/svg/like.svg" alt="${element._id}">                 
                                <span class="rating">${element.rating}</span>                 
                                <img class='dislike' src="/img/svg/dislike.svg" alt="${element._id}"> 
                                <span class="text-muted">${moment(element.createAt).format('lll')}</span>
                            </div>   
                        </div>
                    </div>
                </div>
            `
        })
        HTML += `
        <div class="row">
        <div class="col">
        <div class="card text-start" style="width: 100%;">
            <div class="card-body" id="${element._id}">
                <h6 class="card-title">${element.author}</h6>
                
                <p class="card-text">${element.comment}</p>
                <a href="#exampleFormControlTextarea1" id="${element.author}" class="card-link">Відповісти</a>
                <img class='like' src="/img/svg/like.svg" alt="${element._id}">                 
                <span class="rating">${element.rating}</span>                 
                <img class='dislike' src="/img/svg/dislike.svg" alt="${element._id}"> 
                <span class="text-muted">${moment(element.createAt).format('lll')}</span>
            </div>   
        </div>
        </div>
        </div>
        ${replies}
        `;
    });
    el12.innerHTML = HTML;
    //rating changing
    const dislike = document.querySelectorAll('.dislike');
    const like = document.querySelectorAll('.like');
    const commentRes = document.querySelectorAll('a[href="#exampleFormControlTextarea1"]');
    commentRes.forEach(element => {
        element.addEventListener('click', (event) => {
            const author = event.target.id;
            const id = event.path[1].id;
            el2.name = id; 
            el2.value = author + ', ';           
          })
    })
    dislike.forEach(element => {
        element.addEventListener('click', (event) => {
            const id = event.target.alt;
            const like = 0;
            postingLikes(like, id);
            console.log(id);         
          })
    })
    like.forEach( element => {
        element.addEventListener('click',async (event) => {
            const id = event.target.alt;
            const like = 1;
            postingLikes(like, id);            
            console.log(id);
          })
    })
};

//posting comments data to server
const postData = async () => {
    console.log('function start');
    const data = {
        author: el1.value,
        comment: el2.value,
        params,
        reply: el2.name,
    };
    console.log(data);

    await axios({
        method: 'post',
        url: '/postcomment',
        data: data,
        headers: { "Content-type": "application/json" }
        })
    .then(function(response) {
        console.log('Ответ сервера успешно получен!');
        console.log(response.data);
        getData();
        })
    .catch(function(error) {
        console.log(error);
    });    
};

function serializeForm(formNode) {
    return new FormData(formNode)
  }

//events
form.addEventListener('submit', (event) => {
    console.log('clicked')
    event.preventDefault();
    data = serializeForm(form);
    console.log(Array.from(data.entries()))
    postData();
});

//posting likes to server

const postingLikes = async (like, id) => {
    await axios.post('/rating', {
        id: id,
        like: like,
    }).then(function (response) {
        console.log(response);
        getData();
      })
      .catch(function (error) {
        console.log(error);
      });
}  


//clear reply reffer
const el14 = document.querySelector('button[name=clear]')
el14.addEventListener('click', (e) => {
    el2.name = ''; 
    el2.value = ''; 
})



  

