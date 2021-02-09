import Link from 'next/link';
import {useRouter} from 'next/router';

import styles from './menu.module.scss';

const menuRoutes = [{
  href: '/',
  title: 'Home'
},{
  href: '/dashboard',
  title: 'Dashboard'
},{
  href: '/user',
  title: 'User'
}]

const Menu = () => {
  const {pathname} = useRouter();

  const renderLink = ({href, title}, index) => {
    return (
      <Link
        key={index}
        href={href}>
        <a className={pathname === href ? styles.active : null}>{title}</a>
      </Link>
    )
  }


  return (
    <div className={styles.menu}>
      {menuRoutes.map((item, index) => renderLink({...item}, index))}
    </div>
  )
}

export default Menu;