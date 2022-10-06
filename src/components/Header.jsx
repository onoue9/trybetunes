import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../services/userAPI";
import Load from "./Load";

const Header = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const user = async () => {
      const { name } = await getUser();
      setUser(name);
    }
    user();
  }, []);

  return (
    <header className="w-screen">
      <div className="h-16 flex items-center border-black shadow justify-around">
        <strong className="text-2xl">TrybeTunes</strong>
        { !user ? <Load /> : <strong className="text-lg">{ user }</strong> }
      </div>
      <div className="w-full h-10 flex items-center justify-evenly text-center">
        <Link
          className="flex items-center justify-center text-lg w-full h-full rounded-md hover:bg-emerald-300 border-black shadow"
          to="/search"
        ><strong>Search</strong></Link>
        <Link
          className="flex items-center justify-center text-lg w-full h-full rounded-md hover:bg-emerald-300 border-black shadow"
          to="/favorites"
        ><strong>Favorites</strong></Link>
        <Link
          className="flex items-center justify-center text-lg w-full h-full rounded-md hover:bg-emerald-300 border-black shadow"
          to="/profile"
        ><strong>Profile</strong></Link>
        <Link
          className="flex items-center justify-center text-lg w-full h-full rounded-md hover:bg-emerald-300 border-black shadow"
          to="/trybetunes"
        ><strong>Sair</strong></Link>
      </div>
    </header>
  )
}

export default Header;
