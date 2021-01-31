import {useSelector} from "react-redux";

import Item from 'components/shared/Item';

const Cars = () => {
  const {cars} = useSelector((state) => state);

  return (
    <div>
      <h1>Cars</h1>
      {cars.cars.map(item => <Item key={item.id} {...item}/>)}
    </div>
  )
}

export default Cars;