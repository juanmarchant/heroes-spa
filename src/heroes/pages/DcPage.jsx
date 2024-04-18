import { HeroList } from "../components"

export const DcPage = () => {
  return (
    <>
      <h1>DC Comics</h1>
      <hr />
      
      {/* Listado de heroes */}
      <HeroList publisher={'DC Comics'}/>
    </>
  )
}
