//Core
import {useRouter} from 'next/router';

//Styles
import styles from './layout.module.scss';

const BackLayout = ({children}) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  }

  return (
    <div className={styles.content}>
      <button onClick={handleClick}>Go Back</button>
      {children}
    </div>
  )
}

export default BackLayout;