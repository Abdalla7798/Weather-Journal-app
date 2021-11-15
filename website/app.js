
let d = new Date();

let baseURL = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "&appid=89ff5d8ea5d5b1453c1293653d6235e5&units=imperial";

const btnGenerate = document.querySelector("#generate");

btnGenerate.addEventListener('click',function(){
  const zipcode = document.querySelector("#zip").value;
  const feelings = document.querySelector("#feelings").value;

  getDataFromWebsite(baseURL,zipcode,apiKey)
  .then(function(data){
    postDataToServer('http://localhost:3000/push',{date: d, temp: data.list[0].main.temp, content: feelings});  
    setTimeout(updateUI, 30);
  })
});

// get the the weather data from api
const getDataFromWebsite = async (baseURL, zipcode, apiKey) =>{ 
  const request = await fetch(baseURL+zipcode+apiKey);
  try {
  const websiteData = await request.json();
  console.log(websiteData);
  return websiteData;
  }
  catch(error) {
    console.log("error", error);
  }
};

// post the data to server
const postDataToServer = async ( url = '', data = {})=>{
  console.log(data)
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),      
});

  try {
    const recent = await response.json();
    console.log(recent);
    return recent
  }catch(error) {
  console.log("error", error);
  }
}

// get the data from the server and update the dom element
const updateUI = async () => {
  const request = await fetch('http://localhost:3000/pull');
  try{
    const serverData = await request.json();
    const date = document.querySelector("#date");
    const temp = document.querySelector("#temp");
    const content = document.querySelector("#content");
    
    date.innerHTML =  "The Date:" + serverData.date;
    temp.innerHTML = "The Temperature: " + serverData.temp;
    content.innerHTML = "I feel " + serverData.content;
    
  }catch(error){
    console.log("error", error);
  }
}

