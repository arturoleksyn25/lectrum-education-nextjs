//Core
import {useSelector} from "react-redux";
import {useRouter} from 'next/router';

//Selectors
import {selectCars} from 'bus/cars/selectors';

//Components
import Item from "components/shared/Item";

const Car = () => {
  const {query: {car}} = useRouter();
  const cars = useSelector(selectCars);

  const CarJSX = cars && (
    <Item
      type={'cars'}
      {...cars.find(item => item.id === car)}
    />
  )

  return (
    <div>
      <h1>Car</h1>
      {CarJSX}
    </div>
  )
}

export default Car;