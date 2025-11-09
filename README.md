# E-commerce Assignment

A simple e-commerce backend with checkout and discount functionality. Built with **Next.js**, **TypeScript**, and **in-memory store**.

---

## Features

- Add items to cart and checkout.
- Apply discount codes on checkout.
- Generate a discount code for every **Nth order**. (As an Example set as 5th)
- Admin stats: total items, total purchase, discount codes, total discount amount.
- Fully tested with **Vitest**.

---

## Setup

1. Clone the repo:

   ```bash
   git clone <your-repo-url>
   cd ecommerce-demo
   ```

2. Install dependencies:
   npm install

3. Run development server:
   npm run dev

4. Run tests to verify functionality:
   npm run test

API
POST /api/checkout
Request body example:
{
"userId": "user-123",
"items": [
{ "id": "p1", "name": "Product 1", "price": 100, "quantity": 2 }
],
"discountCode": "SAVE10" // optional
}
Response example:
{
"success": true,
"order": {
"id": "order-xyz",
"userId": "user-123",
"items": [
{ "id": "p1", "name": "Product 1", "price": 100, "quantity": 2 }
],
"subtotal": 200,
"discountCode": "SAVE10",
"discountAmount": 20,
"total": 180,
"createdAt": "2025-11-09T12:00:00.000Z"
},
"generatedCoupon": {
"code": "SAVE10-XYZ123",
"percentage": 10,
"used": false
}
}

    Admin Stats API
        GET /api/admin/stats
        Returns overall store statistics:
        Example response:
            {
            "totalOrders": 10,
            "totalItems": 45,
            "totalPurchase": 4500,
            "discounts": [
                { "code": "UBX-ABC123", "percentage": 10, "used": true }
            ],
            "totalDiscountAmount": 400,
            "usedDiscountsCount": 4
            }

Testing
Run unit tests with Vitest: npm run test
Tests cover:
Order creation
Discount application
Nth order discount generation
Checkout API behavior

Notes
#All data is stored in-memory, so server restart will reset all orders and discounts.
#Discount codes apply to the entire order, not individual items.
#Every Nth order generates a new discount code automatically.
