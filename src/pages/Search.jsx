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
    <div className="w-screen h-screen flex flex-col gap-2">
      <Header />
      { isLoading ? <Load /> : <div className="flex flex-col items-center justify-evenly mt-20">
          { albums.length < 0 ? <Load /> : <form
            className="flex flex-col gap-4 items-center"
            onSubmit={ handleSearch }>
            <label>
              <input
                className="text-center rounded-md h-8"
                ref={ searchInput }
                type="text"
                placeholder="Search"
                onChange={ handleChange }
              />
            </label>
            <button
              className="bg-emerald-600 rounded-md w-1/2 h-8 mt-2 hover:bg-emerald-700"
              ref={ button }
              type="submit"
              disabled
            >Pesquisar</button>
          </form> }
          { console.log(albums) }
          { albums.length <= 0 ? <strong className="mt-20">Nenhum álbum foi encontrado</strong> : <div className="h-full flex flex-col gap-2 items-center mt-20">
              <span className="text-lg mb-14"><strong>Resultado de álbuns de:</strong> { search.current }</span>
              <div className="grid grid-cols-5 gap-4 w-2/3 h-1/2 items-center justify-center">
                { albums.map((album) => (
                  <div
                    className="w-full h-full flex flex-col gap-2 pt-2 items-center justify-center bg-gray-200 rounded-md text-center hover:bg-gray-300"
                    key={ album.collectionId }
                  >
                    <img className="rounded-md"src={ album.artworkUrl100 } alt={ album.collectionName } />
                    <Link
                      to={ `/album/${album.collectionId}` }s
                    >
                      <h2 className="text-lg">{ album.collectionName }</h2>
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
