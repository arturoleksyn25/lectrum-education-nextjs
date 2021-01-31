import {useSelector} from "react-redux";
import {useRouter} from 'next/router';

import Item from "components/shared/Item";

const Car = () => {
  const {query: {car}} = useRouter();
  const {cars} = useSelector((state) => state);

  const CarJSX = cars.cars && (
    <Item {...cars.cars.find(item => item.id === car)}/>
  )

  return (
    <div>
      <h1>Car</h1>
      {CarJSX}
    </div>
  )
}

export default Car;