// Core
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Actions
import { catsActions } from './actions';

// Selectors
import {
  selectCatsList
} from './selectors';

const Cats = () => {
  const list = useSelector(selectCatsList);

  const listJSX = list && list.map(({ _id, text }) => (
    <p key={_id}>
      {text}
    </p>
  ));

  return (
    <>
      <h2>Cats</h2>
      {listJSX}
    </>
  )
}

export default Cats;
