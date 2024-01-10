import './App.css';
import { Route, Routes } from 'react-router-dom';
import AlbumsPage from './components/album/AlbumsPage';
import HeroSection from './components/HeroSection';
import AlbumDetailsPage from './components/album/AlbumDetailsPage';
import AlbumsSearchPage from './components/album/AlbumsSearchPage';
import AlbumsSearchPageAlt from './components/album/AlbumsSearchPageAlt';
import RegisterPage from './components/profile/RegisterPage';
import LoginPage from './components/profile/LoginPage';
import RateAlbumPage from './components/album/RateAlbumPage';
import RequireAuth from './components/profile/RequireAuth';
import ProfilePage from './components/profile/ProfilePage';
import ReRateAlbumPage from './components/album/ReRateAlbumPage';
import AboutPage from './components/AboutPage';
import AddAlbumPage from './components/album/AddAlbumPage';
import Unauthorized from './components/profile/Unauthorized';
import AlbumDetailsEditPage from './components/album/AlbumDetailsEditPage';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<HeroSection />}/>
        <Route path='/' element={<HeroSection />}/>
        <Route path='/albums' element={<AlbumsPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route element={<RequireAuth allowedRoles={["ROLE_USER"]}/>}>
          <Route path='/profile' element={<ProfilePage/>} />
        </Route>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/albums/:id' element={<AlbumDetailsPage />} />
        <Route path='/albums/:id/edit' element={<AlbumDetailsEditPage />} />
        <Route path='/albums/search/:text' element={<AlbumsSearchPage />} />
        <Route path='/albums/sеаrch/:text' element={<AlbumsSearchPageAlt/>} />
        <Route element={<RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}/>}>
          <Route path='/albums/:id/rate' element={<RateAlbumPage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}/>}>
          <Route path='/albums/:id/rerate' element={<ReRateAlbumPage />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]}/>}>
          <Route path='/albums/addAlbum' element={<AddAlbumPage />} />
        </Route>
      </Routes>
   </div>
  );
}

export default App;
