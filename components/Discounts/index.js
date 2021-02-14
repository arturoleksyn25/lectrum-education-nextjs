//Core
import {useSelector} from "react-redux";

//Selectors
import {selectDiscounts} from 'bus/discounts/selectors';

//Components
import Item from 'components/shared/Item';

const Discounts = () => {
  const discounts = useSelector(selectDiscounts);

  return (
    <div>
      <h1>Discounts</h1>
      {discounts.map(item => (
        <Item
          key={item.id}
          type={'discounts'}
          {...item}
        />
      ))}
    </div>
  )
}

export default Discounts;