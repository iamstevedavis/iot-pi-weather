Weather
=====

Introduction
-----
This is a simple app that gets weather information from a third party. I wrote this to run on my pi.

Setup
-----
1) Run 'npm install'

API
-----
### Server Specific CRUD

#### GET /weather/v1/status // Get the current status of the weather app.

__Response__

- Returns 200.

```
{}
```

### Weather CRUD

#### GET /weather/v1/forecast // Get the forecast for a city based on that cities id.

__Request__

    locationId - The city id.

__Example__

    /weather/v1/forecast?locationId=123456

__Response__

    {
    "city": {
      "cityId": 5913695,
      "cityName": "Cambridge",
      "cityCountryCode": "CA"
    },
    "weatherData": [
      {
        "time": "2015-12-29 00:00:00",
        "temp": -5.28,
        "tempHigh": -3.44,
        "tempLow": -5.28,
        "humidity": 78,
        "description": "overcast clouds",
        "weatherIcon": "http://api.openweathermap.org/img/w/04n.png"
      },
      {<--->},
      {<--->},
      {<--->}
    ]

#### GET /weather/v1/find // Get the forecast for a city based on a textual search of that city.

__Request__

    q - The search value.

__Example__

    /weather/v1/forecast?q=Waterloo, Ontario

__Response__

    {
      "weatherData": [
        {
          "locationId": 5913695,
          "temp": -5.29,
          "tempHigh": -4,
          "tempLow": -7,
          "humidity": 85,
          "description": "snow",
          "weatherIcon": "http://api.openweathermap.org/img/w/13d.png"
        }
      ]
    }
