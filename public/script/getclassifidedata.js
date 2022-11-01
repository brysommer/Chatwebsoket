let url = window.location.href;
const slicedUrl = url.split('/');
const params = slicedUrl[4];
console.log(params);

//getting data from server
const data = async () => {
    await axios({
        method: 'get',
        url: `/json/${params}`,
        })
    .then(function(response) {
        console.log('Ответ сервера успешно получен!');
        console.log(response.data);
        })
    .catch(function(error) {
        console.log(error);
    });    
};

console.log(data);