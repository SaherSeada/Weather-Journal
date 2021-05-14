/* Global Variables */
const weatherURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey= "&appid=8b1006be04a5d19b85b462ebe17577ea"

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Adding event listener to button
button = document.getElementById('generate');
button.addEventListener('click', performAction);
function performAction() {
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    getData(weatherURL, zip, apiKey)
    .then(function(data) {
        postData('add', {date: d, temp: data.main.temp, content: feeling})
        updateUI();
    })
}

// Posting data
const postData = async (url, data ) => {
    const response = await fetch('/add', {
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });

    try {
        const newData = await response.json();
        return newData;

    }

    catch(error) {
        console.log("ERROR!", error);
    }
}

// Getting data from API
const getData = async(weatherURL, zip, apiKey) => {
    const response = await fetch(weatherURL+zip+apiKey)

    try {
        const data = await response.json();
        return data;
    }
    
    catch(error) {
        console.log("ERROR!", error);
    }
}

//Updating UI with the last version of the data
const updateUI = async() => {
    const request = await fetch('/all');

    try {
        const mostRecentEntry = await request.json();
        document.getElementById('date').innerHTML = `Date: ${mostRecentEntry.date}`;
        document.getElementById('temp').innerHTML = `Temperature: ${mostRecentEntry.temp}`;
        document.getElementById('content').innerHTML = `Feeling: ${mostRecentEntry.feeling}`;
    }

    catch(error) {
        console.log("ERROR!", error);
    }
}