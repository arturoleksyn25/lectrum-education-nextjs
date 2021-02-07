import {useSelector} from "react-redux";

import {selectCars} from "bus/cars/selectors";
import Item from 'components/shared/Item';

const Cars = () => {
  const cars = useSelector(selectCars);

  return (
    <div>
      <h1>Cars</h1>
      {cars.map(item => (
        <Item
          key={item.id}
          type={'cars'}
          {...item}
        />
      ))}
    </div>
  )
}

export default Cars;