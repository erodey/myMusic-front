import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from '../../hooks/useRefreshToken'
import useAuth from "../../hooks/useAuth";

const PersistLogin = () => {

  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        const res = await refresh();
        console.log('res', res)
      }
      catch (err) {
        console.error(err);
      }
      finally {
        isMounted && setIsLoading(false);
      }
    }

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => isMounted = false;
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`)
    console.log(`user: ${JSON.stringify(auth?.username)}`)
  }, [isLoading])

  return (
    <>
      {!persist 
        ? <Outlet /> 
        : isLoading
          ? <p className="fetching">Loading...</p>
          : <Outlet />
      }
    </>
  )
}

export default PersistLogin
