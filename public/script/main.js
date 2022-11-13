const el2 = document.querySelector('input[name="phone"]');
const el4 = document.querySelector('input[name="title"]');
const el10 = document.querySelector('input[name="keywordsinput"]');
const locationInput = document.querySelector('input[name="location"');
const locationOptions = document.getElementById('datalistOpt');
console.log(locationInput)
console.log(locationOptions)
locationInput.addEventListener('keypress',async (e) => {
    let HTML = '';
    const str = locationInput.value;
    const data = await getLocations(str);
    console.log(data)
    data.forEach(element => {
        HTML += `<option value="${element.MainDescription} - ${element.Area}">`
    })
    locationOptions.innerHTML = HTML;
})
//Get locations from NP
 const getLocations = async (str) => {
    const res = await axios.post('https://api.novaposhta.ua/v2.0/json/',  {
        "apiKey": "ad1807f5abe94965f34ef9491cb40338",
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName": `${str}`,
            "Limit": "10",
            "Page": "1"
        }
    } );
    return res.data.data[0].Addresses;
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
    //keywords from title
    let array
    el4.addEventListener('change',  (event) => {
    array = el4.value.split(' ');
    array.forEach(element => {
        tagify.whitelist.push(element);
    })
    })  
};

//events
getKeys();

//phone input mask
let im = new Inputmask('+38 (099) 999-99-99');
im.mask(el2);







