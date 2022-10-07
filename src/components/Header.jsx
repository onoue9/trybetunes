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
    <header className="flex flex-col justify-center w-screen">
      <div className="h-10 sm:h-16 flex items-center border-black shadow justify-around">
        <strong className="text-2xl">TrybeTunes</strong>
        { !user ? <Load /> : <strong className="text-lg">{ user }</strong> }
      </div>
      <div className="h-10 flex text-center">
        <Link
          className="flex items-center justify-center text-md w-1/4 sm:w-full h-full rounded-md hover:bg-emerald-300 border-black shadow"
          to="/search"
        ><strong>Buscar</strong></Link>
        <Link
          className="flex items-center justify-center text-md w-1/4 sm:w-full h-full rounded-md hover:bg-emerald-300 border-black shadow"
          to="/favorites"
        ><strong>Favoritas</strong></Link>
        <Link
          className="flex items-center justify-center text-md w-1/4 sm:w-full h-full rounded-md hover:bg-emerald-300 border-black shadow"
          to="/profile"
        ><strong>Perfil</strong></Link>
        <Link
          className="flex items-center justify-center text-md w-1/4 sm:w-full h-full rounded-md hover:bg-emerald-300 border-black shadow"
          to="/trybetunes"
        ><strong>Sair</strong></Link>
      </div>
    </header>
  )
}

export default Header;
