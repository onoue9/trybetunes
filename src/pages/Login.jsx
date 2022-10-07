import { createRef, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";
import { createUser } from "../services/userAPI";
import Load from "../components/Load";


const Login = () => {
  const [isLoading, setIsLoading] = useContext(Context);
  const name = useRef('')
  const loginButton = createRef();
  const navigate = useNavigate();

  const handleName = ({ target }) => {
    name.current = target.value;
    if (name.current.length >= 3) {
      loginButton.current.disabled = false;
    }
    else {
      loginButton.current.disabled = true;
    }
  }

  const handleCreateUser = async (e) => {
    e.preventDefault();
    createUser({ name: name.current})
    setIsLoading(true);
    setTimeout(() => {
      navigate('/search')
      setIsLoading(false);
    }, 1000)
  }

  return (
    <div
      className="flex flex-col items-center justify-center h-screen w-screen"
    >
      <div className="flex flex-col items-center justify-center w-full sm:h-1/2 sm:w-1/3">
        <div className="w-full sm:w-4/5 sm:h-1/2 flex items-center justify-center mb-10">
          <strong className="text-5xl sm:text-6xl text-gray-800">TrybeTunes</strong>
        </div>
        
          { isLoading ? <Load /> : <form
            className="flex flex-col items-center gap-3 text-gray-800 pb-10 pr-5"
            onSubmit={ handleCreateUser }
            >
            <label htmlFor="nome"><strong className="text-lg">Login</strong></label>
            <input
              className="text-center rounded-md w-3/4 h-8"
              type="text"
              placeholder="Digite seu nome"
              onChange={ handleName }
            />
            <button
              className="bg-white rounded-md w-1/2 h-8 mt-2"
              ref={loginButton}
              type="submit"
              disabled
            >
              <strong>Entrar</strong>
            </button>
          </form>
          }
        </div>
    </div>
  )

}

export default Login;
