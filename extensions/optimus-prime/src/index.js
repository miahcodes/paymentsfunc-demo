// @ts-check

/*
A straightforward example of a function that expands a bundle into its component parts.
The parts of a bundle are stored in a metafield on the product parent value with a specific format,
specifying each part's quantity and variant.

The function reads the cart. Any item containing the metafield that specifies the bundle parts
will return an Expand operation containing the parts.
*/

/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 * @typedef {import("../generated/api").CartOperation} CartOperation
 * @typedef {import("../generated/api").UpdateOperation} UpdateOperation
 * @typedef {import("../generated/api").PriceUpdateAdjustment} PriceUpdateAdjustment
 * @typedef {import("../generated/api").PriceAdjustment} PriceAdjustment
 * @typedef {import("../generated/api").PriceAdjustmentValue} PriceAdjustmentValue
 * @typedef {import("../generated/api").CartLineUpdateInput} CartLineUpdateInput
 * @typedef {import("../generated/api").CartLine} CartLine
 */

/**
 * @type {FunctionResult}
 */
const NO_CHANGES = {
  operations: [
    {
      "update": {
        "cartLineUpdates":[
          {
            "cartLineId":"gid://shopify/CartLine/2",
            "price": {
              "fixedPrice": {
                "value": 100
              },
            }
          }
        ]
      }
    }
  ],
};

export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  const operations = [];
  input.cart.lines.reduce(
    /** @param {CartOperation[]} acc */
    (acc, cartLine) => {
      const updateOperation = {
        "cartLineId":`${cartLine.id}`,
        "price": {
          "fixedPrice": {
            "value": 100
          },
        }
      };

      if (updateOperation) {
        return [...acc, { update: {"cartLineUpdates":[updateOperation] }}];
      }

      return acc;
    },
    []
  );
  console.log(operations);

  return operations.length > 0 ? { operations } : NO_CHANGES;
};
