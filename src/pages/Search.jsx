import { createRef, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Load from "../components/Load";
import Context from "../Context";
import searchAlbumsAPI from "../services/searchAlbumsAPI";

const Search = () => {
  const [isLoading, setIsLoading] = useContext(Context);
  const [albums, setAlbums] = useState([]);
  const button = createRef();
  const searchInput = createRef();
  const search = useRef()

  const handleChange = (e) => {
    search.current = e.target.value;
    if (search.current.length >= 2) {
      button.current.disabled = false;
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    searchInput.current.value = '';
    setAlbums( await searchAlbumsAPI(search.current))
  }

  return (
    <div className="w-screen h-screen flex flex-col gap-1">
      <Header />
      { isLoading ? <Load /> : <div className="flex flex-col items-center justify-evenly shadow-lg pt-10 w-full sm:w-1/2 h-screen self-center">
          { albums.length < 0 ? <Load /> : <form
            className="flex flex-col gap-4 items-center"
            onSubmit={ handleSearch }>
            <label>
              <input
                className="text-center rounded-md h-8"
                ref={ searchInput }
                type="text"
                placeholder="Buscar"
                onChange={ handleChange }
              />
            </label>
            <button
              className="bg-fuchsia-700 bg-opacity-50 rounded-md w-1/2 h-8 mt-2 hover:bg-fuchsia-800 text-zinc-200"
              ref={ button }
              type="submit"
              disabled
            >Buscar</button>
          </form> }
          { albums.length <= 0 ? <strong className="mt-20 text-zinc-200">Nenhum álbum foi encontrado</strong> : <div className="h-full flex flex-col gap-2 items-center mt-20 mb-4">
              <span className="text-lg mb-14 text-zinc-200"><strong>Resultado de álbuns de:</strong> { search.current }</span>
              <div className="grid grid-cols-5 gap-4 w-2/3 h-1/2 items-center justify-center">
                { albums.map((album) => (
                  <div
                    className="flex flex-col gap-2 items-center justify-center rounded-md"
                    key={ album.collectionId }
                  >
                    <Link
                      to={ `/album/${album.collectionId}` }s
                    >
                    <img className="rounded-md"src={ album.artworkUrl100 } alt={ album.collectionName } />
                      {/* <h2 className="text-lg">{ album.collectionName }</h2> */}
                    </ Link>
                  </div>
                ))}
              </div>
            </div>}
        </div>
      }
    </div>
  )
}

export default Search;
