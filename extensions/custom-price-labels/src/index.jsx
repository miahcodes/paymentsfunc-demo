import React from 'react';
import {
  useExtensionApi,
  render,
  useCartLines,
  useTarget,
  Text
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::CartLineDetails::RenderAfter', () => <App />);

function App() {
  const {extensionPoint} = useExtensionApi();
  const target = useTarget();
  const cartLines = useCartLines();
  const obj = cartLines.find((item) => item.id === target.id.replace('PresentmentCartLine','CartLine'));
  return (
    obj.attributes[0].value.length > 0 ?
      <Text appearance='subdued'>Discounted Price: {obj.attributes[0].value}</Text>
    : null
  );
}
