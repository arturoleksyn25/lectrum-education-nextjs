import {useRouter} from 'next/router';

const BackLayout = ({children}) => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  }

  return (
    <div>
      <button onClick={handleClick}>Go Back</button>
      {children}
    </div>
  )
}

export default BackLayout;