// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
* @typedef {import("../generated/api").InputQuery} InputQuery
* @typedef {import("../generated/api").FunctionResult} FunctionResult
* @typedef {import("../generated/api").Target} Target
* @typedef {import("../generated/api").ProductVariant} ProductVariant
* @typedef {import("../generated/api").CartLine} CartLine
* @typedef {import("../generated/api").Product} Product
*/

/**
 * @type {FunctionResult}
 */
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  let discounts_ = 0;
  const linesArray = input.cart.lines
  let total_discount_value = 0.00;
  for (let i = 0; i < linesArray.length; ++i) {
    const line = linesArray[i];
    const variant = /** @type {ProductVariant} */ (line.merchandise);
    const cost = parseFloat(line.cost.amountPerQuantity.amount.toString());
    const custom_price = parseFloat(variant.custom_price?.value ?? "0.00");
    const discount_value = (custom_price !== 0.00) ? (cost - custom_price) * line.quantity : 0.00;
    total_discount_value += discount_value;
    discounts_ = (discount_value > 0) ? discounts_ + 1 : discounts_;
  }
  console.log('discounts count', discounts_)
  console.log('total discount value: ',total_discount_value)
  if (!discounts_) {
    // You can use STDERR for debug logs in your function
    console.error("No cart lines qualify for the discount.");
    return EMPTY_DISCOUNT;
  }

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    discounts: [
      {
        targets: [
          {
            orderSubtotal: {
              excludedVariantIds: [],
            }
          }
        ],
        value: {
          fixedAmount: { amount: total_discount_value.toString() }
        }
      }
    ],
    discountApplicationStrategy: DiscountApplicationStrategy.Maximum
  };
};
