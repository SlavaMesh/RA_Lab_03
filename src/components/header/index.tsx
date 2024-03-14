import { Link } from "react-router-dom"
import { GlobalSvgSelector } from "../../assets/icons/global"

export const Header = () => {
  return (
    <nav className="flex justify-between items-center text-xl px-5 h-[70px] bg-gray-200">
      <GlobalSvgSelector id="header-logo" />
      <div className="flex space-x-4">
        <Link to={"/"}>Home</Link>
        <Link to={"/search"}>Search&Settings</Link>
        <Link to={"/technical"}>Technical</Link>
      </div>

    </nav>
  )
}
