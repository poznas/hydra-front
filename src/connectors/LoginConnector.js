import axios from 'axios/index'
import { fullPath, LOGIN_PATH } from './Path'

export class LoginConnector {

  static login = async (idToken) => {

    const params = {
      headers: {
        'X-ID-TOKEN': idToken,
      },
    }
    console.log('login with idToken: ', idToken)
    return await axios.get(fullPath(LOGIN_PATH), params)
  }

}
