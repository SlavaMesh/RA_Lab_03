import { CityCard } from "../../components/citycard"


export const Technical = () => {
  const getCityList = () => {
    const list: string | null = localStorage.getItem('cities')
    return list ? JSON.parse(list) : []
  }
  
  return (
    <div>
      { getCityList().map((el:any) => <CityCard id={el.id} name={el.name} key={el.id}/>) }
      
    </div>
  )
}
