### API Endpoints

#### `GET /api/iss-location`

Fetches the current location of the International Space Station (ISS) from the server.

##### Response

- **Status Code**: `200 OK`
- **Content-Type**: `application/json`
- **Body**:
  ```json
  {
  	"message": "success",
  	"timestamp": 1697049600,
  	"iss_position": {
  		"latitude": "48.858844",
  		"longitude": "2.294351"
  	}
  }
  ```
- The `timestamp` field is a UNIX timestamp representing the time of the ISS location data.
- The `iss_position` object contains the latitude and longitude of the ISS as strings.

##### Error Response

- **Status Code**: `500 Internal Server Error`  
  Returned if there is an issue fetching the ISS location from the external API.
