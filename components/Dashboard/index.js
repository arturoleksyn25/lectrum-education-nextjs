//Core
import {useSelector} from "react-redux";
import Link from "next/link";

//Selectors
import {selectNews} from 'bus/news/selectors';
import {selectDiscounts} from 'bus/discounts/selectors';
import {selectCars} from 'bus/cars/selectors';

const Dashboard = () => {
  const news = useSelector(selectNews);
  const discounts = useSelector(selectDiscounts);
  const cars = useSelector(selectCars);

  const newsJSX = !!news.length && (
    <>
      <Link href={'/news'}>
        <a>
          <h4>News List</h4>
        </a>
      </Link>
    </>
  )

  const discountsJSX = !!discounts.length && (
    <>
      <Link href={'/discounts'}>
        <a>
          <h4>Discounts List</h4>
        </a>
      </Link>
    </>
  )

  const carsJSX = !!cars.length && (
    <>
      <Link href={'/cars'}>
        <a>
          <h4>Cars List</h4>
        </a>
      </Link>
    </>
  )

  return (
    <>
      {newsJSX}
      {discountsJSX}
      {carsJSX}
    </>
  )
}

export default Dashboard;