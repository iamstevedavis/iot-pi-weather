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
      "city": {...},
      "cod": "200",
      "message": 0.0036,
      "cnt": 40,
      "list": [{...}]
    }

#### GET /weather/v1/find // Get the forecast for a city based on a textual search of that city.

__Request__

    q - The search value.

__Example__

    /weather/v1/forecast?q=Waterloo, Ontario

__Response__

    {
      "cod": "200",
      "message": 0.0036,
      "cnt": 40,
      "list": [{...}]
    }
