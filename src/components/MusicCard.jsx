import { createRef, useEffect, useState } from "react";
import { addSong, removeSong, getFavoriteSongs } from "../services/favoriteSongsAPI";
import Load from "./Load";

const MusicCard = (props) => {
  const {
    music,
    previewUrl,
    musicName,
    trackId,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const checkInput = createRef();

  useEffect(() => {
    const favorite = async () => {
      const favoriteSongs = await getFavoriteSongs();
      favoriteSongs.map(
        (favoriteSong) => (
          favoriteSong.trackId === trackId ? setIsChecked(true) : null
        )
      );
    }
    favorite();
  }, [isChecked])

  const addFavoriteSong = async () => {
    setIsLoading(true);
    await addSong(music)
    setIsChecked(!isChecked);
    setIsLoading(false);
  }

  const removeFavoriteSong = async () => {
    setIsLoading(true);
    await removeSong(music)
    setIsChecked(!isChecked);
    setIsLoading(false);
  }

  const handleFavorite = async () => {
    !isChecked ? addFavoriteSong() : removeFavoriteSong();
  }

  return (
    <div className="h-full flex flex-col gap-2 mb-4 items-center justify-center bg-emerald-400 rounded-md text-center">
      <strong className="m-2">{ musicName }</strong>
      <audio
        className="m-2"
        src={ previewUrl }
        controls
      >
        <track kind="caption" />
        O seu navegador não suporta o elemento <code>audio</code>.
      </audio>
      <div className="flex gap-2">
        <label>Favoritas</label>
          <input
            ref={ checkInput }
            type="checkbox"
            checked={ isChecked }
            onChange={ () => handleFavorite() }
          />
          { isLoading ? <Load /> : null }
      </div>
    </div>
  )
}

export default MusicCard;
