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
  <div className="w-screen h-screen">
    <Header />
    { album.length <= 0 ? <Load /> : <div className="flex flex-col items-center justify-center">
        <div className="flex gap-4 my-12">
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
        <div className="grid sm:grid-cols-3 gap-4 w-2/3 h-1/2 items-center justify-center">
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
