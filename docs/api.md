# API Documentation

## Returns API

### Get Return Status
Retrieves the return and refund status for a specific order.

- **Endpoint**: `/api/returns/:orderId`
- **Method**: `GET`
- **Parameters**: 
  - `orderId` (URL Path): The unique identifier of the order.

#### Example Request
`GET /api/returns/NS1001`

#### Success Response
**Code**: `200 OK`
```json
{
  "orderId": "NS1001",
  "eligible": true,
  "returnStatus": "Approved",
  "refundStatus": "Completed"
}
```

#### Error Response
**Code**: `404 Not Found`
```json
{
  "error": "Order NS9999 was not found"
}
```

---

## Stock API

### Get Product Stock
Retrieves the total aggregate stock for a product across all variants.

- **Endpoint**: `/api/stock/:productId`
- **Method**: `GET`
- **Parameters**:
  - `productId` (URL Path): The unique identifier of the product.

#### Example Request
`GET /api/stock/P1001`

#### Success Response
**Code**: `200 OK`
```json
{
  "productId": "P1001",
  "productName": "Northstar Running Shoe",
  "variant": "All",
  "quantity": 6,
  "available": true
}
```

### Get Variant Stock
Retrieves the stock for a specific variant of a product.

- **Endpoint**: `/api/stock/:productId/:variant`
- **Method**: `GET`
- **Parameters**:
  - `productId` (URL Path): The unique identifier of the product.
  - `variant` (URL Path): The specific variant string (e.g., "Size 42").

#### Example Request
`GET /api/stock/P1001/Size%2042`

#### Success Response
**Code**: `200 OK`
```json
{
  "productId": "P1001",
  "productName": "Northstar Running Shoe",
  "variant": "Size 42",
  "quantity": 6,
  "available": true
}
```

#### Error Response
**Code**: `404 Not Found`
```json
{
  "error": "Size 44 is currently unavailable"
}
```
