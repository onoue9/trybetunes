import './styles/main.css';
import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Context from './Context';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import Search from './pages/Search';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <BrowserRouter>
      <Context.Provider value={[isLoading, setIsLoading]}>
        <Routes>
          <Route path="/trybetunes" element={<Login />} />
          <Route path="/search" element={<Search />} />
          <Route path="/album/:id" element={<Album />}/>
          <Route path="/favorites" element={<Favorites />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/profile/edit" element={<ProfileEdit />}/>
          <Route element={<NotFound />} />
        </Routes>
      </Context.Provider>
    </BrowserRouter>
)
}
export default App;
