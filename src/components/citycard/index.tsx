import { FC } from 'react'

interface City {
    lat: number
    long: number
    name: string
    setCityList: React.Dispatch<React.SetStateAction<any>>
    setCrd: React.Dispatch<React.SetStateAction<any>>     
    }


export const CityCard: FC<City> = ({ name, setCityList, setCrd, lat, long}) => {
    
    const handleOnDelete = () => {
        setCityList((prev: any) => prev.filter((el:{ name: string}) => el.name !== name))
        
    }
    

    return (
        <li className='cursor-pointer mt-2 rounded-md flex h-[30px] border-2 w-[200px] justify-between pl-2 hover:bg-gray-200'
            onClick={() => {setCrd({ 
                lat: lat, 
                long: long
              })}}
        >
            {name}
            <button className="rounded-lg bg-blue-500 text-white ml-2 px-2" onClick={handleOnDelete}>X</button>
        </li>
  )
}
