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
    <div className="w-screen h-screen">
      <Header />
      <strong className="flex items-center justify-center mt-20 text-2xl">Profile Edit</strong>
      { !user ? <Load /> : <div className="flex flex-col">
        <form className="flex flex-col gap-2 mt-20 items-center justify-center"onSubmit={ handleUpdateUser }>
          <label htmlFor="name">Nome</label>
          <input
            className="w-40 rounded-md text-center"
            type="text"
            name="name"
            value={ user.name }
            onChange = { handleChange }
          />
          <label htmlFor="email">Email</label>
          <input
            className="w-40 rounded-md text-center"
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
          <label htmlFor="image">Imagem</label>
          <input
            className="w-40 rounded-md text-center"
            type="text"
            name="image"
            value={ user.image }
            onChange={ handleChange }
          />
          <button
            className="w-20 mt-5 bg-emerald-600 rounded-md"
            ref={ editButton }
            disabled
          >Salvar</button>
        </form>
      </div>}
    </div>
  )
}

export default ProfileEdit;
