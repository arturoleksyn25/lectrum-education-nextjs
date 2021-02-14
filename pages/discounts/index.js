//Components
import {BaseLayout} from "components/layouts";
import {Discounts} from "components";

//Actions
import {discountsActions} from "bus/discounts/actions";

//Selectors
import {selectDiscounts} from "bus/discounts/selectors";

//Other
import {withUser} from "utils/withUser";
import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {getFile} from "helpers/getFile";
import {setCurrentDate} from "helpers/setCurrentDate";
import {redirectTo} from "helpers/redirectTo";

export const getServerSideProps = withUser(async (ctx, user) => {
  const store = await initialDispatcher(ctx, initializeStore());

  if (user.userType === 'guest') {
    redirectTo(ctx, '/')
  }

  const discounts = await getFile('public/discounts.json');
  store.dispatch(discountsActions.fillDiscounts(setCurrentDate(discounts)));

  const initialReduxState = {
    discounts: {
      list: selectDiscounts(store.getState())
    }
  };

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
