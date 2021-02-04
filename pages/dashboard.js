import Link from "next/link";

import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {userActions} from "bus/user/actions";
import {getFile} from 'helpers/getFile';
import {setCurrentDate} from "helpers/setCurrentDate";
import {withUser} from 'utils/withUser';
import BaseLayout from "components/layouts/BaseLayout";

export const getServerSideProps = withUser(async (ctx, user) => {
  const store = await initialDispatcher(ctx, initializeStore());
  store.dispatch(userActions.fillUser(user));

  const initialReduxState = store.getState();

  const news = await getFile('public/news.json');
  const discounts = user.userType === 'friend' || user.userType === 'familyMember'? await getFile('public/discounts.json') : null;
  const cars = user.userType === 'familyMember' ? await getFile('public/cars.json') : null;

  return {
    initialReduxState,
    news: setCurrentDate(news),
    discounts: setCurrentDate(discounts),
    cars: setCurrentDate(cars)
  }
});

const Dashboard = ({news, discounts, cars}) => {
  const renderLink = (id, category) => {
    return (
      <div key={id}>
        <Link href={`/${category}/${id}`}>
          <a>
            {`${category} ${id}`}
          </a>
        </Link>
      </div>
    )
  }

  const newsJSX = news && (
    <div>
      <h4>News List</h4>
      <Link href={'/news'}>
        <a>
          news
        </a>
      </Link>
      {news.map(line => renderLink(line.id, 'news'))}
    </div>
  )

  const discountsJSX = discounts && (
    <div>
      <h4>Discounts List</h4>
      <Link href={'/discounts'}>
        <a>
          discounts
        </a>
      </Link>
      {discounts.map(line => renderLink(line.id, 'discounts'))}
    </div>
  )

  const carsJSX = cars && (
    <div>
      <h4>Cars List</h4>
      <Link href={'/cars'}>
        <a>
          cars
        </a>
      </Link>
      {cars.map(line => renderLink(line.id, 'cars'))}
    </div>
  )

  return (
    <BaseLayout>
      {newsJSX}
      {discountsJSX}
      {carsJSX}
    </BaseLayout>
  )
}

export default Dashboard;