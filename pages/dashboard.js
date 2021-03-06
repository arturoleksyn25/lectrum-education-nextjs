//Components
import {BaseLayout} from "components/layouts";
import {Dashboard} from "components";

//Actions
import {userActions} from "bus/user/actions";
import {discountsActions} from "bus/discounts/actions";
import {carsActions} from "bus/cars/actions";
import {newsActions} from "bus/news/actions";

//Selectors
import {selectNews} from "bus/news/selectors";
import {selectDiscounts} from "bus/discounts/selectors";
import {selectCars} from "bus/cars/selectors";

//Others
import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {getFile} from 'helpers/fileHelper';
import {setCurrentDate} from "helpers/setCurrentDate";
import {withUser} from 'utils/withUser';

export const getServerSideProps = withUser(async (ctx, user) => {
  const store = await initialDispatcher(ctx, initializeStore());
  const news = await getFile('public/news.json');
  const discounts = user.userType === 'friend' || user.userType === 'familyMember'? await getFile('public/discounts.json') : null;
  const cars = user.userType === 'familyMember' ? await getFile('public/cars.json') : null;

  store.dispatch(userActions.fillUser(user));
  store.dispatch(newsActions.fillNews(setCurrentDate(news)));
  store.dispatch(discountsActions.fillDiscounts(setCurrentDate(discounts)));
  store.dispatch(carsActions.fillCars(setCurrentDate(cars)));

  const state = store.getState();
  const initialReduxState = {
    news: {
      list: selectNews(state)
    },
    discounts: {
      list: selectDiscounts(state)
    },
    cars: {
      list: selectCars(state)
    },
    user
  };

  return {
    initialReduxState
  }
});

const DashboardPage = () => {
  return (
    <BaseLayout>
      <Dashboard/>
    </BaseLayout>
  )
}

export default DashboardPage;