import {useSelector} from "react-redux";

import Item from 'components/shared/Item';

const Discounts = () => {
  const {discounts} = useSelector((state) => state);

  return (
    <div>
      <h1>Discounts</h1>
      {discounts.discounts.map(item => <Item key={item.id} {...item}/>)}
    </div>
  )
}

export default Discounts;