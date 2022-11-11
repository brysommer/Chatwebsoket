moment.locale('uk');
//constants defination
const el1 = document.querySelector('div[name="cards_container"]');
const el2 = document.querySelector('div[name="keys"]');

//filter routes
let url = window.location.href;
const slicedUrl = url.split('/');
const params = slicedUrl[4];
console.log(params);

//choose right rought
let route
if (params) {
  route = `/getAddsfilter/${params}`;
} else {
  route = '/getAdds';
}

//getAdds data
const getAddsData = async () => {
    let HTML = '';    
    const {data}  = await axios.get(route);
    console.log(data);
    data.forEach(element => {
        let keywordsString ='';
        const keywords = element.keywords;
        keywords.forEach(element => {
            keywordsString += ` <a class="nodec" href="/filter/${element._id}">#${element.keyword}</a>  `;
        });
        HTML += `
        <div class="col">
            <div class="card h-100">
              <a  href="/classified/${element._id}"><img src="/img/${element.picture}" class="card-img-top" alt="..."></a>
              <div class="card-body">
                <a class="nodec" href="/classified/${element._id}"><h5 class="card-title">${element.title}</h5></a>
                <p class="card-text">${keywordsString}</p>
                <p class="muted card-text">${moment(element.createAt).format('lll')} - ${element.location}</p>
                <h5>${element.price} грн</h5>
              </div>
            </div>
          </div>
        `;
    });
    el1.innerHTML = HTML;
};


//events
getAddsData();

const renderKeywords = async () => {
  let keywordsHTML = '';
  const {data}  = await axios.get('/keys');
  data.forEach(element => {
    keywordsHTML += ` <a class="nodec" href="/filter/${element._id}">#${element.keyword}</a>  `;
  });
  el2.innerHTML = keywordsHTML;
};
renderKeywords()
