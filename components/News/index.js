import {useSelector} from "react-redux";

import Item from 'components/shared/Item';

const News = () => {
  const {news} = useSelector((state) => state);

  return (
    <div>
      <h1>News</h1>
      {news.news.map(item => <Item key={item.id} {...item}/>)}
    </div>
  )
}

export default News;