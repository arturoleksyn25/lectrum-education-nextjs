import Link from 'next/link';
import {useRouter} from 'next/router';

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
        <a style={{color: pathname === href ? 'gray' : 'blue'}}>{title}</a>
      </Link>
    )
  }


  return (
    <div className={'menu'}>
      {menuRoutes.map((item, index) => renderLink({...item}, index))}
      <style>{`
        .menu {
          display: flex
        }      
        a {
          margin: 0 20px;
          text-decoration: none;
        }
      `}</style>
    </div>
  )
}

export default Menu;