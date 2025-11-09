"use client";

type CartItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
};

type CartItemsProps = {
  cart: CartItem[];
  total: number;
  discountValid: boolean;
};

const CartItems: React.FC<CartItemsProps> = ({ cart, total, discountValid }) => {
  const discountedTotal = discountValid ? total * 0.9 : total;

  return (
    <div>
      <h3 className="font-medium text-black mb-2">Items</h3>
      <ul className="divide-y divide-gray-200">
        {cart.map((i) => (
          <li key={i.id} className="flex justify-between py-2 text-black">
            <span>
              {i.name} × {i.quantity}
            </span>
            <span>₹{(i.price * i.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="flex justify-between font-semibold mt-4 text-black">
        <span>Subtotal</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
      {discountValid && (
        <div className="flex justify-between text-sm text-green-700">
          <span>Discount (10%)</span>
          <span>-₹{(total * 0.1).toFixed(2)}</span>
        </div>
      )}
      <div className="flex justify-between font-bold mt-2 text-black border-t pt-2">
        <span>Total</span>
        <span>₹{discountedTotal.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default CartItems;