import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Load from "../components/Load";
import { getUser } from "../services/userAPI";

const Profile = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const user = async () => {
      setUser(await getUser())
    }
    user();
  }, [])

  return (
    <div className="w-screen h-screen">
      <Header />
      <strong className="flex items-center justify-center my-20 text-2xl">Perfil</strong>
      <div className="flex flex-col items-center justify-center">
        { !user ? <Load /> : <div className="w-1/2 h-full flex flex-col gap-5 items-center justify-center bg-gray-200 rounded-md">
            <img className="rounded-md" src={ user.image } alt="user image" />
            <strong className="text-2xl">{ user.name }</strong>
            <h2>Email: { user.email }</h2>
            <p>Descrição: { user.description }</p>
            <Link className="w-32 text-center mb-10 bg-gray-300 hover:bg-gray-400 rounded-md" to="/profile/edit">Editar perfil</Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Profile;
