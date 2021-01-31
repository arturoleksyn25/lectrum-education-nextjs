import Menu from "components/Menu";

const BaseLayout = ({children}) => {
  return (
    <div>
      <Menu/>
      <main>
        {children}
      </main>
    </div>
  )
}

export default BaseLayout;