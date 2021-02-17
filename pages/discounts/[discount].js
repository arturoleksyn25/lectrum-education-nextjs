//Components
import {BackLayout} from "components/layouts";
import {Discount} from "components";

//Actions
import {discountsActions} from "bus/discounts/actions";

//Selectors
import {selectDiscounts} from "bus/discounts/selectors";

//Other
import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {getFile} from "helpers/fileHelper";
import {setCurrentDate} from "helpers/setCurrentDate";
import {redirectTo} from "helpers/redirectTo";
import {withUser} from "utils/withUser";

export const getServerSideProps = withUser(async (ctx, user) => {
  const store = await initialDispatcher(ctx, initializeStore());
  const discounts = await getFile('public/discounts.json');

  if (user.userType === 'guest' || !discounts.find(item => item.id === ctx.query.discount)) {
    redirectTo(ctx, '/')
  }

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

const DiscountPage = () => {
  return (
    <BackLayout>
      <Discount/>
    </BackLayout>
  )
}

export default DiscountPage;
