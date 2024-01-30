import axios from '../api/axios'
import useAuth from './useAuth'

const useRefreshToken = () => {
  const {setAuth} = useAuth()

  const refresh = async () => {
    const response = await axios.get('/auth/refresh', {
      "withCredentials": "true"
    })

    console.log('refresh response', response)

    setAuth(() => {
      return {
        username: response.data.username,
        roles: response.data.roles,
        accessToken: response.data.accessToken
      }
    })

    return response.data
  }

  return refresh
}

export default useRefreshToken  
