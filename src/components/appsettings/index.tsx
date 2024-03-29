import { useRef, FC } from "react"

interface Props {
    setSettings: React.Dispatch<React.SetStateAction<any>>
    settings: any
}

export const AppSettings: FC<Props> = ({setSettings, settings}) => {
    const inputRef: any= useRef<any>({
        timeOfSunset: false,
        feelsLike: false,
        airHummidity: false
    });

    const handleSubmit: React.ChangeEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        const values: any = {
            timeOfSunset: inputRef.current.timeOfSunset.checked,
            feelsLike: inputRef.current.feelsLike.checked,
            airHummidity: inputRef.current.airHummidity.checked
        }
        setSettings(values)
        localStorage.setItem('settings', JSON.stringify(values))
    }

  return (
    <div className="flex flex-col mt-4 h-[px]">
        <p className="text-xl">AppSettings</p>
        <form onSubmit={handleSubmit}>
            <p className="mt-2 text-lg"><input 
                type="checkbox" 
                name='timeOfSunset'
                defaultChecked={settings?.timeOfSunset}
                ref={(el) => inputRef.current.timeOfSunset = el}
                />time of sunset</p>
            <p className="mt-2 text-lg"><input 
                type="checkbox" 
                value='feelsLike'
                defaultChecked={settings?.feelsLike}
                ref={(el) => inputRef.current.feelsLike = el}
                />feels like</p>
            <p className="mt-2 text-lg"><input 
                type="checkbox" 
                value='airHummidity'
                defaultChecked={settings?.airHummidity}
                ref={(el) => inputRef.current.airHummidity = el}
                /> air humidity</p>
            <button className="flex w-[150px] rounded-lg bg-blue-500 text-white font-bold py-2 mt-2 px-4">Save changings</button>      
        </form>
    </div>
  )
}
