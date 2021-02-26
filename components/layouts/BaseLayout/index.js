//Core
import {useEffect} from 'react';
import {useDispatch} from "react-redux";

//Actions
import {commonActions} from 'bus/common/actions';

//Components
import {Menu, Loading} from "components";

//Styles
import styles from './layout.module.scss';

const BaseLayout = ({children}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(commonActions.toggleIsLoading(false));
    }, 1000)
  }, [])

  return (
    <div>
      <Loading/>
      <Menu/>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  )
}

export default BaseLayout;