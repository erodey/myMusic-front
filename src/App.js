import './App.css';
import { Route, Routes, useParams } from 'react-router-dom';
import AlbumsPage from './components/album/AlbumsPage';
import SongsPage from './components/song/SongsPage';
import ProfilePage from './components/profile/ProfilePage';
import HeroSection from './components/HeroSection';
import AlbumDetailsPage from './components/album/AlbumDetailsPage';
import AlbumsSearchPage from './components/album/AlbumsSearchPage';
import AlbumsSearchPageAlt from './components/album/AlbumsSearchPageAlt';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<HeroSection />}/>
        <Route path='/' element={<HeroSection />}/>
        <Route path='/albums' element={<AlbumsPage />} />
        <Route path='/songs' element={<SongsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/albums/:id' element={<AlbumDetailsPage />} />
        <Route path='/albums/search/:text' element={<AlbumsSearchPage />} />
        <Route path='/albums/sеаrch/:text' element={<AlbumsSearchPageAlt/>} />
      </Routes>
   </div>
  );
}

export default App;
