import {useSelector} from "react-redux";
import {useRouter} from 'next/router';

import {selectDiscounts} from 'bus/discounts/selectors';
import Item from "components/shared/Item";

const Discount = () => {
  const {query: {discount}} = useRouter();
  const discounts = useSelector(selectDiscounts);

  const DiscountJSX = discounts && (
    <Item
      type={'discounts'}
      {...discounts.find(item => item.id === discount)}
    />
  )

  return (
    <div>
      <h1>Discount</h1>
      {DiscountJSX}
    </div>
  )
}

export default Discount;