import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Load from "../components/Load";
import MusicCard from "../components/MusicCard";
import getMusics from "../services/musicsAPI";

const Album = () => {
  const [album, setAlbum] = useState([]);
  const params = useParams();

  useEffect(() => {
    const music = async () => {
      const { id } = params;
      const musics = await getMusics(id);
      setAlbum(musics)
    }
    music();
  }, [])

  return (
  <div className="flex flex-col items-center w-screen h-screen">
    <Header />
    { album.length <= 0 ? <Load /> : <div className="flex flex-col items-center mt-5 gap-10 w-full h-screen sm:w-1/2 overflow-auto">
        <div className="flex text-zinc-200 gap-10">
          <div>
            <img className="rounded-md" src={ album[0].artworkUrl100 } alt={ album[0].collectionName } />
          </div>
          <div className="flex flex-col items-start justify-end">
            <strong className="text-lg">
              {album[0].artistName}
            </strong>
            <h2>
              {album[0].collectionName}
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 px-3 gap-4 w-full h-1/2 items-center justify-center">
          { album.map((music, index) => { if (music.trackName) {
            return (
              <MusicCard
                key={music.trackId}
                music={music}
                trackId={ music.trackId }
                musicName={ music.trackName }
                previewUrl={ music.previewUrl }
              />
            )
          }})}
        </div>
      </div>
    }
  </div>
  )
}

export default Album;
