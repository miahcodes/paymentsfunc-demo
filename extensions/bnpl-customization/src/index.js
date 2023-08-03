// @ts-check

// Use JSDoc annotations for type safety
/**
 * @typedef {import("../generated/api").InputQuery} InputQuery
 * @typedef {import("../generated/api").FunctionResult} FunctionResult
 * @typedef {import("../generated/api").HideOperation} HideOperation
 */

/**
 * @type {FunctionResult}
 */
const NO_CHANGES = {
  operations: [],
};

// The @shopify/shopify_function package will use the default export as your function entrypoint
export default /**
 * @param {InputQuery} input
 * @returns {FunctionResult}
 */
(input) => {
  // Get the cart total from the function input, and return early if it's below 100
  const bnpl = input.cart.bnpl;
  console.log("BNPL", bnpl?.value);
  let doHide = "";
  if (bnpl?.value.length > 0) {
    doHide = (bnpl.value == "1") ? "Non-BNPL" : "BNPL";
    if (bnpl == "1") {
      // You can use STDERR for debug logs in your function
      console.log("Hide non-BNPL payment method.");
    } else {
      console.log("Hide BNPL payment method.");
    }
  } else {
    return NO_CHANGES;
  }

  // Find the payment method to hide
  const hidePaymentMethod = input.paymentMethods.find((method) =>
    method.name.includes(doHide)
  );

  if (!hidePaymentMethod) {
    return NO_CHANGES;
  }

  // The @shopify/shopify_function package applies JSON.stringify() to your function result
  // and writes it to STDOUT
  return {
    operations: [
      {
        hide: {
          paymentMethodId: hidePaymentMethod.id,
        },
      },
    ],
  };
};
