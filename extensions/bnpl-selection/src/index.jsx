import React from 'react';
import {
  useExtensionApi,
  render,
  Banner,
  Button,
  InlineSpacer,
  useTranslate,
  View,
  useApplyAttributeChange,
  useApplyCartLinesChange,
  useCartLines
} from '@shopify/checkout-ui-extensions-react';

render('Checkout::Dynamic::Render', () => <App />);

function App() {
  const {extensionPoint} = useExtensionApi();
  const applyAttributeChange = useApplyAttributeChange();
  const applyCartLinesChange = useApplyCartLinesChange();
  const {lines} = useCartLines();
  const handlePress = (x) => {
    console.log('hello world', x)
    const bnpl_val = (x === 'bnpl') ? '1' : '0'
    applyAttributeChange({
      type: 'updateAttribute',
      key: 'bnpl',
      value: bnpl_val
    })
  }
  const addProduct = async () => {
    const result = await applyCartLinesChange({
      type: "addCartLine",
      merchandiseId: "gid://shopify/ProductVariant/41496739479691",
      quantity: 1,
    });
    console.log(result);
  }
  const clearBnpl = async () => {
    applyAttributeChange({
      type: 'updateAttribute',
      key: 'bnpl',
      value: ''
    })
    console.log(lines);
  }
  return (
    <View>
      <Button onPress={() => {
        handlePress('bnpl');
        addProduct();
      }}>BNPL</Button>
      <InlineSpacer spacing="tight" />
      <Button onPress={() => handlePress('non-bnpl')}>Non-BNPL</Button>
      <InlineSpacer spacing="tight" />
      <Button onPress={() => clearBnpl()}>Clear</Button>
    </View>
  );
}
