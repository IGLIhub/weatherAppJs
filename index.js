const apiKey = "edf8976acf0f3772a362f552cc874d0e";

const input = document.querySelector(".search_city");
const b = document.querySelector(".submit");

var city = document.querySelector("#name");
var degrees = document.querySelector(".degrees");
var weather = document.querySelector(".weather");
var img = document.querySelector(".img");

window.addEventListener("load", () => {
  const h2 = document.createElement('h2');
  h2.setAttribute("class", "welcome_message");
  h2.innerHTML = 'Benvenuto, vuoi vedere se domani nevica? Cerca subito la tua città preferita';
  const main = document.querySelector('.main');
  main.appendChild(h2);

  const divWeakly = document.querySelector('.weather_weakly')
  divWeakly.style.display = 'none';
  const divInfo = document.querySelector('.main_info')
  divInfo.style.display = 'none';
});

b.addEventListener("click", function () {
  const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=metric`;

  const divWeakly = document.querySelector('.weather_weakly')
  divWeakly.style.display = 'block' ;

  const divInfo = document.querySelector('.main_info')
  divInfo.style.display = 'block';

  document.querySelector('.welcome_message').style.display = 'none';

  if(input.value == '') {
      const p = document.createElement("p");

      const newContent = document.createTextNode("Inserisci prima un valore");

      p.appendChild(newContent);

      p.style.color = "red";
      p.setAttribute('class', 'error2');

      const currentDiv = document.getElementById("error");

      currentDiv.append(p);
  } 

  fetch(urlApi)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      var nameValue = data.name;
      var weatherValue = data.weather[0].main + ' ';
      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var imgValue = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + imgValue + ".png";
      console.log(iconurl);

      city.innerHTML = nameValue;
      degrees.innerHTML = Math.round(data.main.temp_max) + "°";
      weather.innerHTML = weatherValue;
      img.setAttribute("src", iconurl);

      input.value = "";

      getDatafor7days(lat, lon);
    })
    .catch((err) => {
      
      const p = document.createElement("p");

      const newContent = document.createTextNode("Non è stato trovato nessuna città, riprova, scrivi meglio...");

      p.appendChild(newContent);
      p.style.color = "red";
      p.setAttribute("class", "error1")

      const currentDiv = document.getElementById("error");

      if(err) {
        currentDiv.append(p);

        const divWeakly = document.querySelector('.weather_weakly')
        divWeakly.style.display = 'none';
        const divInfo = document.querySelector('.main_info')
        divInfo.style.display = 'none';     
      }
      input.value = "";
    });


  const getDatafor7days = (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=7efa332cf48aeb9d2d391a51027f1a71&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        
        const dailyValues = [];
        dailyValues.push(data.daily);
        console.log(dailyValues);

        dailyValues.forEach((element) => {
          const lunedi = document.querySelector('.lunedi');
          const martedi = document.querySelector('.martedi');
          const mercoledi = document.querySelector('.mercoledi');
          const giovedi = document.querySelector('.giovedi');
          const venerdi = document.querySelector('.venerdi');
          const sabato = document.querySelector('.sabato');
          const domenica = document.querySelector('.domenica');

          const weatherIcon0 = document.querySelector('.weather_icon0');  
          const weatherIcon1 = document.querySelector('.weather_icon1');
          const weatherIcon2 = document.querySelector('.weather_icon2');
          const weatherIcon3 = document.querySelector('.weather_icon3');
          const weatherIcon4 = document.querySelector('.weather_icon4');
          const weatherIcon5 = document.querySelector('.weather_icon5');
          const weatherIcon6 = document.querySelector('.weather_icon6');

          var imgValue0 = element[0].weather[0].icon;
          var iconurl0 = "http://openweathermap.org/img/w/" + imgValue0 + ".png";

          var imgValue1 = element[1].weather[0].icon;
          var iconurl1 = "http://openweathermap.org/img/w/" + imgValue1 + ".png";

          var imgValue2 = element[2].weather[0].icon;
          var iconurl2 = "http://openweathermap.org/img/w/" + imgValue2 + ".png";

          var imgValue3 = element[3].weather[0].icon;
          var iconurl3 = "http://openweathermap.org/img/w/" + imgValue3 + ".png";
          
          var imgValue4 = element[4].weather[0].icon;
          var iconurl4 = "http://openweathermap.org/img/w/" + imgValue4 + ".png";

          var imgValue5 = element[5].weather[0].icon;
          var iconurl5 = "http://openweathermap.org/img/w/" + imgValue5 + ".png";

          var imgValue6 = element[6].weather[0].icon;
          var iconurl6 = "http://openweathermap.org/img/w/" + imgValue6 + ".png";

          weatherIcon0.setAttribute("src", iconurl0);
          weatherIcon1.setAttribute("src", iconurl1);
          weatherIcon2.setAttribute("src", iconurl2);
          weatherIcon3.setAttribute("src", iconurl3);
          weatherIcon4.setAttribute("src", iconurl4);
          weatherIcon5.setAttribute("src", iconurl5);
          weatherIcon6.setAttribute("src", iconurl6);

          lunedi.innerHTML = element[0].weather[0].main;
          martedi.innerHTML = element[1].weather[0].main;
          mercoledi.innerHTML = element[2].weather[0].main;
          giovedi.innerHTML = element[3].weather[0].main;
          venerdi.innerHTML = element[4].weather[0].main;
          sabato.innerHTML = element[5].weather[0].main;
          domenica.innerHTML = element[6].weather[0].main;  

          const error1  = document.querySelector('.error1');
          const error2  = document.querySelector('.error2');
    
          const divError = document.querySelector('#error');
          divError.removeChild(error1);
          divError.removeChild(error2);
    
        });

      })
      .catch((err) => console.log(err));
  };
});

const homeRefresh = document.querySelector('.title');

homeRefresh.addEventListener('click', () => {
  window.location.reload();ì
})
