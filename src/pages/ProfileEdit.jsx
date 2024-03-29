import { createRef, useEffect, useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Load from "../components/Load";
import Context from "../Context";
import { getUser, updateUser } from "../services/userAPI";

const ProfileEdit = () => {
  const [isLoading, setIsLoading] = useContext(Context);
  const [user, setUser] = useState();
  const name = useRef('');
  const editButton = createRef();
  const navigate = useNavigate();

  useEffect(() => {
    const user = async () => {
      setUser(await getUser())
    }
    user();
  }, [])

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const buttonVerify = () => {
    const isValidyEmail = validateEmail(user.email)
    if (user.name.length > 0 && user.description.length > 0 && user.image.length > 0 && user.email.length > 0 && isValidyEmail) {
      editButton.current.disabled = false;
    }
  }

  const handleChange = ({ target }) => {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setUser({ ...user, [name]: value });
    buttonVerify();
  }

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    updateUser(user);
    setIsLoading(true);
    setTimeout(() => {
      navigate('/profile')
      setIsLoading(false);
    }, 1000)
  }

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center text-zinc-200">
        <strong className="flex items-center justify-center my-20 text-2xl">Editar Perfil</strong>
        { !user ? <Load /> : <div className="flex flex-col">
          <form className="flex flex-col gap-2 items-center justify-center"onSubmit={ handleUpdateUser }>
            <label htmlFor="name">Nome</label>
            <input
              className="w-40 h-8 rounded-md text-center"
              type="text"
              name="name"
              value={ user.name }
              onChange = { handleChange }
            />
            <label htmlFor="email">Email</label>
            <input
              className="w-40 h-8 rounded-md text-center"
              type="email"
              name="email"
              value={ user.email }
              onChange = { handleChange }
            />
            <label htmlFor="description">Descrição</label>
            <textarea
              className="w-40 rounded-md text-center"
              htmlFor="description"
              name="description"
              value={ user.description }
              onChange={ handleChange }
            />
            <label htmlFor="image">Imagem (URL)</label>
            <input
              className="w-40 h-8 rounded-md text-center"
              type="text"
              name="image"
              value={ user.image }
              onChange={ handleChange }
            />
            <button
              className="w-20 h-8 mt-5 bg-fuchsia-700 bg-opacity-50 hover:bg-fuchsia-800 rounded-md"
              ref={ editButton }
              disabled
            >Salvar</button>
          </form>
        </div>
      }
      </div>
    </div>
  )
}

export default ProfileEdit;
