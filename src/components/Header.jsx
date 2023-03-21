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
    <header className="flex flex-col justify-center w-1/2 self-center text-zinc-200">
      <div className="h-10 sm:h-16 flex items-center justify-around">
        <strong className="text-2xl">TrybeTunes</strong>
        { !user ? <Load /> : <strong className="text-lg">{ user }</strong> }
      </div>
      <div className="h-10 flex text-center">
        <Link
          className="flex items-center justify-center text-md w-1/4 sm:w-full h-full rounded-lg hover:bg-fuchsia-800 hover:bg-opacity-50 transition"
          to="/search"
        ><strong>Buscar</strong></Link>
        <Link
          className="flex items-center justify-center text-md w-1/4 sm:w-full h-full rounded-lg hover:bg-fuchsia-800 hover:bg-opacity-50 transition"
          to="/favorites"
        ><strong>Favoritas</strong></Link>
        <Link
          className="flex items-center justify-center text-md w-1/4 sm:w-full h-full rounded-lg hover:bg-fuchsia-800 hover:bg-opacity-50 transition"
          to="/profile"
        ><strong>Perfil</strong></Link>
        <Link
          className="flex items-center justify-center text-md w-1/4 sm:w-full h-full rounded-lg hover:bg-fuchsia-800 hover:bg-opacity-50 transition"
          to="/trybetunes"
        ><strong>Sair</strong></Link>
      </div>
    </header>
  )
}

export default Header;
