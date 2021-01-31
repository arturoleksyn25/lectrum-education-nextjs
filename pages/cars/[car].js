import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {getFile} from "helpers/getFile";
import {carsActions} from "bus/cars/actions";
import BackLayout from "components/layouts/BackLayout";
import Car from "components/Car";
import {setCurrentDate} from "helpers/setCurrentDate";
import {redirectTo} from "helpers/redirectTo";
import {withUser} from "utils/withUser";

export const getServerSideProps = withUser(async (ctx, user) => {
  const store = await initialDispatcher(ctx, initializeStore());
  const cars = await getFile('public/cars.json');

  if (user.userType === 'guest' || user.userType === 'friend' || !cars.find(item => item.id === ctx.query.car)) {
    redirectTo(ctx, '/')
  }

  store.dispatch(carsActions.fillCars(setCurrentDate(cars)));
  const initialReduxState = store.getState();

  return {
    initialReduxState
  }
});

const CarPage = () => {
  return (
    <BackLayout>
      <Car/>
    </BackLayout>
  )
}

export default CarPage;
