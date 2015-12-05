$(document).ready(function () {

    console.log("hello");

  
    
    weatherApp = {
        $targetArea : $("#weather"),
        weatherApiKey : "",

        localStorageKey : "openWeatherApi",

        getFormData: function () {
            if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === ""){
            weatherApp.weatherApiKey = $("#apikey").val();
                weatherApp.saveApiKey();
            
            }
            var zip = $("#zip").val();
            if (zip === null || zip === ""){
                weatherApp.$targetArea.html("enter a zip code.");
        } else{
        weatherApp.getWeatherData(zip);
    }
            console.log(apikey);
            console.log(zip);


        },
        
        getWeatherData : function(zipcode) {
            var url = "http://api.openweathermap.org/data/2.5/weather?zip=" + zipcode + ",us&appid=" + weatherApp.weatherApiKey + "&units=imperial";
            $.getJSON(url, function(data){
                weatherApp.$targetArea.html("Works")
                
                weatherD = data.weather[0].description;
                weatherApp.$targetArea.html(weatherD);
                
            }).fail(function(){
                weatherApp.$targetArea.html("sorry");
            });
        },
        LoadApiKey : function () {
            if (typeof (localStorage) === 'undefined') {
                weatherApp.$targetArea.html("will not work");
            } else {
                weatherApp.weatherApiKey = localStorage.getItem(weatherApp.localStorageKey);
                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey ==="") {
                   // weatherApp.$targetArea.html("sorry, no api key was found")
                    return false;
                }
                return true;
            }
        },

        saveApiKey : function () {
            if (typeof (localStorage) === 'undefined') {
                $targetArea.html("you cant use save localstorage");
            } else {

                if (weatherApp.weatherApiKey === null || weatherApp.weatherApiKey === "") {
                    weatherApp.$targetArea.html("Sorry, you must enter an API Key.");
                } else {
                    localStorage.setItem(weatherApp.localStorageKey, weatherApp.weatherApiKey);
                    $("#apidiv").attr("class", "hide");
                }
            }
        },
    }
        $("#submit").click(function () {
        weatherApp.getFormData();
        return false;
    });
    
   if ( weatherApp.LoadApiKey() ){
       $("#apidiv").attr("class", "hide");
   }
    
});