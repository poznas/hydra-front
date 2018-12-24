import { BASE_URL } from 'react-native-dotenv'

export const LOGIN_PATH = '/auth/login'
export const COMPANIES_PATH = '/register/company/companies'

export const WIKI_ENTRIES_PATH = '/wiki/recruitment/info/entries'
export const WIKI_ADD_PATH = '/wiki/recruitment/info/add'
export const WIKI_VOTE_PATH = '/wiki/recruitment/info/vote'

export const fullPath = (path) => [BASE_URL, path].join('')
