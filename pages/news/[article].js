//Components
import {BackLayout} from "components/layouts";
import {Article} from "components";

//Actions
import {newsActions} from "bus/news/actions";

//Selectors
import {selectNews} from "bus/news/selectors";

//Other
import {initialDispatcher} from "init/initialDispatcher";
import {initializeStore} from "init/store";
import {getFile} from "helpers/getFile";
import {setCurrentDate} from "helpers/setCurrentDate";
import {redirectTo} from "helpers/redirectTo";
import {withUser} from "utils/withUser";

export const getServerSideProps = withUser(async (ctx) => {
  const store = await initialDispatcher(ctx, initializeStore());
  const news = await getFile('public/news.json');

  if (!news.find(item => item.id === ctx.query.article)) {
    redirectTo(ctx, '/')
  }

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

const ArticlePage = () => {
  return (
    <BackLayout>
      <Article/>
    </BackLayout>
  )
}

export default ArticlePage;
