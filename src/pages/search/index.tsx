import { useState, FC, useEffect } from "react"
import { CityCard } from "../../components/citycard"
import { AppSettings } from "../../components/appsettings";

const API_KEY = 'f7a05de8e3766fc6c6f42e619d277de7';

const filterCity = (searchString: string, cityArray: [{name: string, lat: number, long: number}]): any => {
  if (!searchString) {
    return cityArray;
  } 
  
  return cityArray.filter(({ name } ) => name.toLowerCase().includes(searchString.toLowerCase()))
  
};

interface Props  {
  setCrd: React.Dispatch<React.SetStateAction<any>>
  setSettings: React.Dispatch<React.SetStateAction<any>>
}

export const Search: FC<Props> = ({ setCrd, setSettings }) => {

  const [value, setValue] = useState<string>('');

  const [city, setCity] = useState<{name:string, lat: number, long: number}>({name: '', lat: NaN, long: NaN});

  const [cityList, setCityList] = useState<any>(() => {
    const list: string | null = localStorage.getItem('cities')
    return (list ? [...JSON.parse(list)] : [])
  });

  const [search, setSearch] = useState<string>('');

  const [citySearchList, setCitySearchList] = useState<any>(() => {
    const list: string | null = localStorage.getItem('cities')
    return (list ? [...JSON.parse(list)] : [])
  });

  useEffect(() => {
    const debounce = setTimeout(() => {
      const filteredCities = filterCity(search, cityList);
      console.log(filteredCities)
      setCitySearchList(filteredCities)
      console.log(citySearchList);
    }, 300);
    return () => clearTimeout(debounce)
  }, [search]);

  const getWetherCity = async () => {
    const request = `https://api.openweathermap.org/data/2.5/weather?q=${value}&units=metric&lang=ru&appid=${API_KEY}`;
    const response = await fetch(request);
    const weather = await response.json();
    if (weather.cod === 200) {
      setCity({name: weather.name, lat: weather.coord.lat, long: weather.coord.lon})
      console.log(setSettings)
    } else {
    console.log(weather.cod);
    }
  }

  const addCity = () => {
    const cityItem = {
      name: city.name,
      lat: city.lat,
      long: city.long
    }
    if (cityList.find((i: {id:string, name: string}) => i.name === city.name)) {
      console.log('City already exist in City list')
      setValue('')
      setCity({name: '', lat: NaN, long: NaN}) 
    } else {
      console.log(cityList)
      localStorage.setItem('cities', JSON.stringify([...cityList, cityItem]))
      setCityList((prev: any) => [...prev, cityItem])
      console.log(localStorage)
      setValue('')
      setCity({name: '', lat: NaN, long: NaN})
    }

  };

  return (
    <div className="flex justify-around">
      <form className="pl-4 pt-4 flex flex-col space-y-4">
        <label className="text-xl">Add new city to your personal list</label>
        <input 
        className="text-xl pl-2 h-[43px] w-[250px] rounded-lg hover:bg-gray-200"
          name="city"
          type="text" 
          value={value} 
          placeholder="Input the city..."
          onChange={(e) => {setValue(e.target.value)}}
          onKeyDown={(e) => {if(e.key === 'Enter'){
            e.preventDefault()
            getWetherCity()
          }}}/>
        {city.name ? 
          <button className="w-[200px] rounded-lg bg-blue-500 text-white font-bold mt-2 py-2 px-4" 
                  onClick={addCity}> 
                  Add city to your list? 
          </button> : <p>There`s no such city</p>}
      </form>
      <div className="flex flex-col mt-4">
        <p className="text-xl">Click to switch the city on home page</p>
        {/* { cityList.map((el:any) => <CityCard setCrd={setCrd} setCityList={setCityList}  name={el.name} lat={el.lat} long={el.long} key={el.name}/>) } */}
        { citySearchList.map((el:any) => <CityCard setCrd={setCrd} setCityList={setCityList}  name={el.name} lat={el.lat} long={el.long} key={el.name}/>) }
        {cityList && <button 
          className="w-[150px] rounded-lg bg-blue-500 text-white font-bold mt-2 py-2 px-4" 
          onClick={() => localStorage.setItem('cities', JSON.stringify([...cityList]))}>
          Save changings
        </button>}
      </div>
      <AppSettings setSettings={setSettings}/>

      <form className="pl-4 pt-4 flex flex-col space-y-4">
        <label className="text-xl">Search city into your personal list</label>
        <input 
        className="text-xl pl-2 h-[43px] w-[250px] rounded-lg hover:bg-gray-200"
          name="search"
          type="text" 
          value={search} 
          placeholder="Input the city you search..."
          onChange={(e) => {setSearch(e.target.value)}}
          onKeyDown={(e) => {if(e.key === 'Enter'){
            e.preventDefault()
            console.log(search)
          }}}/>
        </form>
    </div>
  )
};
