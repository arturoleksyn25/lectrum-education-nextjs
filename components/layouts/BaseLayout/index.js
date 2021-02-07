import Menu from "components/Menu";

import styles from './layout.module.scss';

const BaseLayout = ({children}) => {
  return (
    <div>
      <Menu/>
      <main className={styles.content}>
        {children}
      </main>
    </div>
  )
}

export default BaseLayout;