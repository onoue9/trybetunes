import { useEffect, useState, useContext } from "react";
import Context from "../Context";
import Header from "../components/Header";
import MusicCard from "../components/MusicCard";
import { getFavoriteSongs } from "../services/favoriteSongsAPI";

const Favorites = () => {
  const [favoriteSongs, setFavoriteSongs] = useState([]);

  useEffect(() => {
    const favorite = async () => {
      setFavoriteSongs(await getFavoriteSongs());
    }
    favorite();
  }, [favoriteSongs])

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <Header />
      <strong className="flex items-center justify-center mt-10 text-2xl text-zinc-200">Favoritas</strong>
      <div className="flex justify-center mt-5 text-zinc-200 h-[70%]">
      { favoriteSongs.length <= 0 ? <strong className="text-center">
        Não há músicas favoritas
        </strong> : <div className="grid sm:grid-cols-3 gap-4 w-2/3 h-full items-center justify-center overflow-auto">
          { favoriteSongs.map((music, index) => { if (music.trackName) {
            return (
              <MusicCard
                key={music.trackId}
                music={music}
                trackId={ music.trackId }
                musicName={ music.trackName }
                previewUrl={ music.previewUrl }
              />
          )}})}
        </div>
      }
      </div>
    </div>
  )
}

export default Favorites;
