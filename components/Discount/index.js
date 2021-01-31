import {useSelector} from "react-redux";
import {useRouter} from 'next/router';

import Item from "components/shared/Item";

const Discount = () => {
  const {query: {discount}} = useRouter();
  const {discounts} = useSelector((state) => state);

  const DiscountJSX = discounts.discounts && (
    <Item {...discounts.discounts.find(item => item.id === discount)}/>
  )

  return (
    <div>
      <h1>Discount</h1>
      {DiscountJSX}
    </div>
  )
}

export default Discount;