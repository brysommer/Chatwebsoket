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
// const el9 = document.querySelector('datalist[name="keys"]');
const el10 = document.querySelector('input[name="keywordsinput"]');
let keywordsList = [];

//Get locations from NP
/* const getLocations = async () => {
    const res = await axios.get('https://api.novaposhta.ua/v2.0/json/', { params: {
        "apiKey": "ad1807f5abe94965f34ef9491cb40338",
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName": "рівне",
            "Limit": "50",
            "Page": "2"
        }
    } });

console.log(res);
    
};
getLocations(); */

//keywors list arrange
const keysArrange = () => {
    console.log(el10.value);
    let data = JSON.parse(el10.value);
    data.forEach(element => {
        console.log(element.value);
        keywordsList.push(element.value);
    });
    console.log(keywordsList);
};

//posting data to server
const postData = async () => {
    keysArrange();
    const data = {
        author: el1.value,
        phone: el2.value,
        location: el3.value,
        title: el4.value,
        content: el5.value,
        picture: el6.value,
        keywords: keywordsList,
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
    let keywordsArray = [];
    const {data}  = await axios.get('/keys');    
    data.forEach(element => {
        keywordsArray.push(element.keyword);
    })
    // init Tagify script on the above inputs
    tagify = new Tagify(el10, {
        whitelist: keywordsArray,
        maxTags: 10,
        dropdown: {
          maxItems: 20,           // <- mixumum allowed rendered suggestions
          classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
          enabled: 0,             // <- show suggestions on focus
          closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
        }
      });  
};


//events
getKeys();
postButton.addEventListener('click', (click) => {
    postData();
});
/*
//adding kewords
el10.addEventListener('change', (change) => {
    console.log(el10.value.value);
    el7.value = '';
    el7.value += el10.value;
    keysArrange();
});
*/
//phone input mask
let im = new Inputmask('+38 (099) 999-99-99');
im.mask(el2);




