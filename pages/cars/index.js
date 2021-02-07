import {carsActions} from "bus/cars/actions";
import {selectCars} from "bus/cars/selectors";
import BaseLayout from "components/layouts/BaseLayout";
import Cars from "components/Cars";
import {withUser} from "utils/withUser";
import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {getFile} from "helpers/getFile";
import {setCurrentDate} from "helpers/setCurrentDate";
import {redirectTo} from "helpers/redirectTo";

export const getServerSideProps = withUser(async (ctx, user) => {
  const store = await initialDispatcher(ctx, initializeStore());

  if (user.userType === 'guest' || user.userType === 'friend') {
    redirectTo(ctx, '/')
  }

  const cars = await getFile('public/cars.json');

  store.dispatch(carsActions.fillCars(setCurrentDate(cars)));
  const initialReduxState = {
    cars: {
      list: selectCars(store.getState())
    }
  };

  return {
    initialReduxState
  }
});

const CarsPage = () => {
  return (
    <BaseLayout>
      <Cars/>
    </BaseLayout>
  )
}

export default CarsPage;
