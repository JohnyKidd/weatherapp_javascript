//define the pre-made DOM elements
const contentDiv = document.querySelector(".content");
const weatherDiv = document.createElement("div");
const name = document.createElement("p");
const temperature = document.createElement("p");
const weatherPic = document.createElement("img");

//header generator
function genHeader(){
  const headerDiv = document.createElement("div");
  headerDiv.className += "header";
  contentDiv.appendChild(headerDiv);

  const logo = document.createElement("img");
  logo.className += "logo";
  logo.src = "graphics/logo.png";
  headerDiv.appendChild(logo);

  const title = document.createElement("h1");
  title.className += "header";
  title.innerText = "Weather Application";
  headerDiv.appendChild(title);

  const searchText = document.createElement("input");
  searchText.className += "inputFields";
  searchText.type = "text";
  searchText.placeholder = "Budapest";
  headerDiv.appendChild(searchText);

  const searchButton = document.createElement("button");
  searchButton.innerText = "Search";
  searchButton.className += "buttons";
  headerDiv.appendChild(searchButton);

  searchButton.addEventListener("click",function(e){

    fetch('https://api.openweathermap.org/data/2.5/weather?q='+searchText.value+'&appid=c5e413103e9c0cea0bb5ba4d4701783d', {mode: 'cors'})
        .then(function(response){
          return response.json();
        })
        .then(function(response){
          name.innerText = response.name;
          temperature.innerText = Math.round(response.main.temp-273) + " °C";
          if (Math.round(response.main.temp-273)>16){weatherPic.src="graphics/sunny.png"}
          else {weatherPic.src = "graphics/cloudy.png"};
        });

  });

}

function genFooter(){
  const footerDiv = document.createElement("div");
  footerDiv.className += "footer";
  contentDiv.appendChild(footerDiv);

  const githubLogo = document.createElement("img");
  githubLogo.className += "github";
  githubLogo.src = "graphics/github.png";
  footerDiv.appendChild(githubLogo);

  const copyrightText = document.createElement("h1");
  copyrightText.className += "footer";
  copyrightText.innerText = "Created By Tibor Enyedi - 2021"
  footerDiv.appendChild(copyrightText);

}

function initContent(){
  weatherDiv.className += "weather";
  contentDiv.appendChild(weatherDiv);

  fetch('https://api.openweathermap.org/data/2.5/weather?q=Budapest&appid=c5e413103e9c0cea0bb5ba4d4701783d', {mode: 'cors'})
      .then(function(response){
        return response.json();
      })
      .then(function(response){
        name.innerText = response.name;
        weatherDiv.appendChild(name);

        temperature.innerText = Math.round(response.main.temp-273) + " °C";
        weatherDiv.appendChild(temperature);

        weatherPic.className = "weatherPic";
        if (Math.round(response.main.temp-273)>16){weatherPic.src="graphics/sunny.png"}
        else {weatherPic.src = "graphics/cloudy.png"};
        weatherDiv.appendChild(weatherPic);
      });
}

genHeader();
initContent();
genFooter();
