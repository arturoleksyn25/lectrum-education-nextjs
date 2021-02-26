//Core
import {useSelector} from "react-redux";

//Selectors
import {selectIsLoading} from 'bus/common/selectors';

//Styles
import styles from './loading.module.scss';

const Loading = () => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <p>
        Loading. Please wait ...
      </p>
    </div>
  )
}

export default Loading;