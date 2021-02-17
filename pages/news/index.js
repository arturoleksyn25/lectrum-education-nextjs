//Components
import {BaseLayout} from "components/layouts";
import {News} from "components";

//Actions
import {newsActions} from "bus/news/actions";

//Selectors
import {selectNews} from "bus/news/selectors";

//Other
import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {withUser} from "utils/withUser";
import {setCurrentDate} from "helpers/setCurrentDate";
import {getFile} from "helpers/fileHelper";

export const getServerSideProps = withUser(async (ctx) => {
  const store = await initialDispatcher(ctx, initializeStore());
  const news = await getFile('public/news.json');

  store.dispatch(newsActions.fillNews(setCurrentDate(news)));

  const initialReduxState = {
    news: {
      list: selectNews(store.getState())
    }
  };

  return {
    initialReduxState
  }
});

const NewsPage = () => {
  return (
    <BaseLayout>
      <News/>
    </BaseLayout>
  )
}

export default NewsPage;
