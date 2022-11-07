//constants defination
const el1 = document.querySelector('div[name="cards_container"]');


//getAdds data
const getAddsData = async () => {
    let HTML = '';
    
    const {data}  = await axios.get('/getAdds');
    console.log(data);
    data.forEach(element => {
        let keywordsString ='';
        const keywords = element.keywords;
        keywords.forEach(element => {
            keywordsString += element.keyword + ' ';
        });
        HTML += `
        <div class="col">
            <div class="card h-100">
              <img src="/img/${element.picture}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${keywordsString}</p>
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

