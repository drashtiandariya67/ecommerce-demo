"use client";

import Button from "../Button/Button";

type CouponInputProps = {
  discountCode: string;
  setDiscountCode: (val: string) => void;
  handleValidateCoupon: () => void;
  loading: boolean;
};

const CouponInput: React.FC<CouponInputProps> = ({
  discountCode,
  setDiscountCode,
  handleValidateCoupon,
  loading,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-black mb-2">
        Discount code
      </label>
      <div className="flex gap-2">
        <input
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Enter code"
          className="flex-1 border px-3 py-2 rounded focus:ring-2 focus:ring-black focus:outline-none"
        />
        <Button onClick={handleValidateCoupon} disabled={loading} variant="primary">
          Apply
        </Button>
      </div>
    </div>
  );
}

export default CouponInput;
