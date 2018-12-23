import axios from "axios/index"
import {COMPANIES_PATH, fullPath, WIKI_ADD_PATH, WIKI_ENTRIES_PATH, WIKI_VOTE_PATH} from "./Path"

export class BackendConnector {

  static getCompanies = (token) => BackendConnector.getPageable(fullPath(COMPANIES_PATH), {}, token, 1000)
  static getWikiEntries = (token, filters) => BackendConnector.getPageable(fullPath(WIKI_ENTRIES_PATH), filters, token, 1000)
  static addWikiInfo = (token, body) => BackendConnector.post(fullPath(WIKI_ADD_PATH), body, token)
  static voteWikiInfo = (token, body) => BackendConnector.post(fullPath(WIKI_VOTE_PATH), body, token)

  static getPageable = (url, body, token, pageSize) => {
    return BackendConnector.get(url + "?size=" + pageSize, body, token)
  }

  static get = (url, body, token) => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        'X-HTTP-Method-Override': 'GET',
        Authorization: token
      }
    }
    return BackendConnector.sendRequest(url, body, params)
  }

  static post = (url, body, token) => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    }
    return BackendConnector.sendRequest(url, body, params)
  }

  static async sendRequest(url, body, params) {
    console.log('sending request: ', url)
    console.log('headers: ', params.headers)
    console.log('payload: ', body)
    const responseBody = await axios.post(url, body, params)
      .catch(err => console.log(err))

    console.log('response body: ', responseBody.data)
    return responseBody.data
  }

}