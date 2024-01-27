import './App.css';
import { Route, Routes } from 'react-router-dom';
import AlbumsPage from './components/album/AlbumsPage';
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
import PersistLogin from './components/profile/PersistLogin';
import HomePage from './components/home/HomePage';
import HamburgerMenu from './components/HamburgerMenu';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/' element={<HomePage />}/>
        <Route path='/albums' element={<AlbumsPage />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/unauthorized' element={<Unauthorized />} />
        <Route path='/albums/:id' element={<AlbumDetailsPage />} />
        <Route path='/albums/search/:text' element={<AlbumsSearchPage />} />
        <Route path='/albums/sеаrch/:text' element={<AlbumsSearchPageAlt/>} />
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}/>}>
            <Route path='/albums/:id/rate' element={<RateAlbumPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}/>}>
            <Route path='/profile' element={<ProfilePage/>} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["ROLE_USER", "ROLE_ADMIN"]}/>}>
            <Route path='/albums/:id/rerate' element={<ReRateAlbumPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]}/>}>
            <Route path='/albums/addAlbum' element={<AddAlbumPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]}/>}>
            <Route path='/albums/:id/edit' element={<AlbumDetailsEditPage />} />
          </Route>
        </Route>
        {/* <Route path='/albums/addAlbum' element={<AddAlbumPage />} /> */}
      </Routes>
   </div>
  );
}

export default App;
