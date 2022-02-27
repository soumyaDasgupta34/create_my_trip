# Create My Trip

# Bus Tours API Documentation

# Login API

---

This API will be used to log in to the Create My Trip portal using email.

- **URL**: `{{baseUrl}}/login`
- **Method**: `POST`
- **Headers**:
    - **Content-Type**: application/json
- **Request Body**:
    
    ```json
    {"emailId": "<string>"}
    ```
    
- **Success status code**: 200
- **Success response**:
    
    ```json
    {"token": "<string>"}
    ```
    
- **Error Response**:
    
    ```json
    {
    	"status": "error",
    	"errorCode": "<number>",
    	"error": "<string>"
    }
    ```
    

[Error Codes](https://www.notion.so/9dc1155554ea49a9b5459f85b646097a)

# Reserve Seat API

---

This API will be used to book bus seats in to the Create My Trip portal while the user is logged in.

- **URL**: `{{baseUrl}}/seat/reserve`
- **Method**: `POST`
- **Headers**:
    - **Content-Type**: application/json
    - **Authorization**: Token
- **Request Body**:
    
    ```json
    {    
    	"seatNumber": "<number>",    
    	"passengerPhone": "<number>",    
    	"passengerName": "<string>",    
    	"passengerAge": "<number>"
    }
    ```
    
- **Success status code**: 201
- **Success response**:
    
    ```json
    {
    	"status": "success",
    	"statusCode": 201,
    	"data": {
    		"booking": {
    			"seatNumber": "<number>",
    			"passengerPhone": "<number>",
    			"passengerName": "<string>",
    			"passengerAge": "<number>"
    		}
    	}
    }
    ```
    
- **Error Response**:
    
    ```json
    {
    	"status": "error",
    	"errorCode": "< number >",
    	"error": "<string>"
    }
    ```
    

[Error Codes](https://www.notion.so/dead03989fbd46da9fa558e7ba1d5446)

# Reset Seat API

---

This API will be used to reset bookings associated to bus seats in to the Create My Trip portal while the admin is logged in.

- **URL**: `{{baseUrl}}/seat/reset`
- **Method**: `DELETE`
- **Headers**:
    - **Content-Type**: application/json
    - **Authorization**: Token
- **Success status code**: 204
- **Error Response**:
    
    ```json
    {
    	"status": "error",
    	"errorCode": "<number>",
    	"error": "<string>"
    }
    ```
    

[Error Codes](https://www.notion.so/2250bb13d37b405d8862dcfc964a3f37)