import {useSelector} from "react-redux";

import {selectNews} from 'bus/news/selectors';
import Item from 'components/shared/Item';

const News = () => {
  const news = useSelector(selectNews);

  return (
    <div>
      <h1>News</h1>
      {news.map(item => (
        <Item
          key={item.id}
          type={'news'}
          {...item}
        />
      ))}
    </div>
  )
}

export default News;