/* Global Variables */
const key='854296e77b76a6af16cb59919339e2a8';
const url ='https://api.openweathermap.org/data/2.5/weather?q='

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const clickHere = document.getElementById('generate');
clickHere.addEventListener('click', performAction);

function performAction(event){
    const location = document.getElementById('zip').value;
    const responseData = document.getElementById('feelings').value;

    callToAPI(url, location, key)
    .then(function(data) {
        //visit https://openweathermap.org/current to get an example of the json data received 
        postData('/send', {temperature: data.main.temp, date: newDate, responseData: responseData}); 
        updateInterface('/all'); 
    })
};

// function to get the data from the api
const callToAPI = async (url, location, key) => {
    const response  = await fetch( url + location + '&APPID=' + key);
    try {
        const data = await response.json();
        console.log('Response:', data.main.temp);
        return data;
    } catch(error) {
        console.log(error);
    };
};

// function to post data that the user entered
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch(error) {
        console.log(error);
    };
};
 
// function to update the user interface
const updateInterface = async(url='') => {
    const request = await fetch(url);
    try {
        const updatedData = await request.json();
        document.getElementById('date').innerHTML = updatedData[0].date;
        document.getElementById('temp').innerHTML = updatedData[0].temperature;
        document.getElementById('content').innerHTML = updatedData[0].resposeData;
    } catch(error) {
        console.log(error);
    };
};