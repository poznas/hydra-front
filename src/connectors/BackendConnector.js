/* eslint-disable lines-between-class-members */
import axios from 'axios/index'
import {
  COMPANIES_PATH,
  fullPath,
  JOB_ADD_PATH,
  JOB_JOBS_PATH,
  REFERRAL_ADD_PATH,
  REFERRAL_APPLICATIONS_PATH,
  REFERRAL_APPLIERS_PATH,
  REFERRAL_REFERRALS_PATH,
  WIKI_ADD_PATH,
  WIKI_ENTRIES_PATH,
  WIKI_VOTE_PATH,
} from './Path'

export class BackendConnector {

  static token = ''
  static userId = ''

  static getCompanies = () => BackendConnector.getPageable(fullPath(COMPANIES_PATH), {}, 1000)
  static getWikiEntries = (filters) => BackendConnector.getPageable(fullPath(WIKI_ENTRIES_PATH), filters, 1000)
  static addWikiInfo = (body) => BackendConnector.post(fullPath(WIKI_ADD_PATH), body)
  static voteWikiInfo = (body) => BackendConnector.post(fullPath(WIKI_VOTE_PATH), body)

  static getJobs = (filters) => BackendConnector.getPageable(fullPath(JOB_JOBS_PATH), filters, 1000)
  static addJob = (body) => BackendConnector.post(fullPath(JOB_ADD_PATH), body)

  static getReferrals = (filters) => BackendConnector.getPageable(fullPath(REFERRAL_REFERRALS_PATH), filters, 1000)
  static addReferral = (body) => BackendConnector.post(fullPath(REFERRAL_ADD_PATH), body)
  static getReferralAppliers = (id) => BackendConnector.get(fullPath(REFERRAL_APPLIERS_PATH) + '/' + id, {})
  static getReferralApplications = (id) => BackendConnector.get(fullPath(REFERRAL_APPLICATIONS_PATH) + '/' + id, {})

  static getPageable = (url, body, pageSize) =>
    BackendConnector.get(url + '?size=' + pageSize, body)

  static get = (url, body) => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        'X-HTTP-Method-Override': 'GET',
        Authorization: BackendConnector.token,
      },
    }
    return BackendConnector.sendRequest(url, body, params)
  }

  static post = (url, body) => {
    const params = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: BackendConnector.token,
      },
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
