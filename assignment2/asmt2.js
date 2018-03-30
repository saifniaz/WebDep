$(document).ready(function () {
    
    $('#goButton').click(function(){
        var lon = $('#lon').val();
        var lat = $('#lat').val();
        $.fn.downloadWeather(lat, lon);
        $.fn.downloadForecast(lat, lon);
        $.fn.showMap(lat, lon);
    });
    
    
    $.fn.downloadWeather = function(lat, lon){
        var urlJ = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +"&units=metric&APPID=b24aad289e72adbdc40ef5d0693a4fa6";
        $.getJSON(urlJ, function(data) {
            var current = data.main.temp;
            var high = data.main.temp_max;
            var low = data.main.temp_min;
            var look = data.weather[0].description;
            var dir = data.wind.deg;
            var speed = data.wind.speed;
            var pressure = data.main.pressure;
            var humid = data.main.humidity;
            console.log(pressure + ", " + humid);
            
            $('#weather').addClass('box');
            $('#weather').append('<h2>Temperature</h2>');
            $('#weather').append('<p>Current: ' + current + '&deg;C</p>');
            $('#weather').append('<p>Low: ' + low + '&deg;C</p>');
            $('#weather').append('<p>High: ' + high + '&deg;C</p>');
            $('#weather').append('<h2>Outlook</h2>');
            $('#weather').append('<p> ' +look+ '</p>');
            $('#weather').append('<h2>Wind</h2>');
            $('#weather').append('<p>Direction: ' + dir + '&deg;</p>');
            $('#weather').append('<p>Speed: ' + speed + 'm/s</p>');        
            $('#weather').append('<h2>Pressure</h2>');
            $('#weather').append('<p>' + pressure + 'mB</p>');
            $('#weather').append('<h2>Humidity</h2>');
            $('#weather').append('<p>'+ humid + '%</p>');
            
        });
    };
    
    $.fn.downloadForecast = function(lat, lon){
        var urlX = "http://api.openweathermap.org/data/2.5/forecast/daily?cnt=10&mode=xml&lat=43.944847&lon=-78.891703&units=metric&APPID=b24aad289e72adbdc40ef5d0693a4fa6";
        $.ajax({
            type: "GET",
            url: urlX,
            dataType: "xml" ,
            success: function(xmlData){
                var table = document.createElement('table');
                table.setAttribute('class', 'table');
                var tr = document.createElement('tr');
                var th1 = document.createElement('th');
                th1.appendChild(document.createTextNode('Date'));
                var th2 = document.createElement('th');
                th2.appendChild(document.createTextNode('Symbol'));
                var th3 = document.createElement('th');
                th3.appendChild(document.createTextNode('High'));
                var th4 = document.createElement('th');
                th4.appendChild(document.createTextNode('Low'));
                var th5 = document.createElement('th');
                th5.appendChild(document.createTextNode('Wind'));        
                var th6 = document.createElement('th');
                th6.appendChild(document.createTextNode('Cloud'));
                tr.appendChild(th1);
                tr.appendChild(th2);
                tr.appendChild(th3);
                tr.appendChild(th4);
                tr.appendChild(th5);
                tr.appendChild(th6);
                table.appendChild(tr);
                $(xmlData).find('time').each(function(){
                    var tr = document.createElement('tr');
                    var td1 = document.createElement('td');
                    td1.appendChild(document.createTextNode($(this).attr('day')));
                    tr.appendChild(td1);
                    var td2 = document.createElement('td');
                    var img = $(this).find('symbol').attr('number');
                    var pic = document.createElement('img')
                    pic.setAttribute('src', 'images/'+img+'.png');
                    pic.setAttribute('id', 'image');
                    td2.prepend(pic);
                    tr.appendChild(td2);
                    var td3 = document.createElement('td');
                    td3.appendChild(document.createTextNode(($(this).find('temperature').attr('max'))));
                    tr.appendChild(td3);
                    var td4 = document.createElement('td');
                    td4.appendChild(document.createTextNode($(this).find('temperature').attr('min')));
                    tr.appendChild(td4);
                    
                    var td5 = document.createElement('td');
                    td5.appendChild(document.createTextNode($(this).find('windSpeed').attr('name')));
                    tr.appendChild(td5);
                    
                    var td6 = document.createElement('td');
                    td6.appendChild(document.createTextNode($(this).find('symbol').attr('name')));
                    tr.appendChild(td6);
                    
                    table.appendChild(tr);
                })
                $('#forecast').append('<p>Forecast:</p>');
                $('#forecast').append(table);
            }
        });
    };
            
    $.fn.showMap = function(lat, lon){
        console.log(parseFloat(lat) + ", " + parseFloat(lon));
        map = new google.maps.Map(document.getElementById('map-canvas'), {
          center: {lat: parseFloat(lat), lng: parseFloat(lon)},
          zoom: 8
        });
    };        
});