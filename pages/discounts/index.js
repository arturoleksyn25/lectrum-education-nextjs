import BaseLayout from "components/layouts/BaseLayout";
import Discounts from "components/Discounts";
import {withUser} from "utils/withUser";
import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {getFile} from "helpers/getFile";
import {setCurrentDate} from "helpers/setCurrentDate";
import {redirectTo} from "helpers/redirectTo";
import {discountsActions} from "bus/discounts/actions";

export const getServerSideProps = withUser(async (ctx, user) => {
  const store = await initialDispatcher(ctx, initializeStore());

  if (user.userType === 'guest') {
    redirectTo(ctx, '/')
  }

  const discounts = await getFile('public/discounts.json');

  store.dispatch(discountsActions.fillDiscounts(setCurrentDate(discounts)));
  const initialReduxState = store.getState();

  return {
    initialReduxState
  }
});

const DiscountsPage = () => {
  return (
    <BaseLayout>
      <Discounts/>
    </BaseLayout>
  )
}

export default DiscountsPage;
