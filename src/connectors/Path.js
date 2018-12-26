import { BASE_URL } from 'react-native-dotenv'

export const LOGIN_PATH = '/auth/login'
export const COMPANIES_PATH = '/register/company/companies'

export const WIKI_ENTRIES_PATH = '/wiki/recruitment/info/entries'
export const WIKI_ADD_PATH = '/wiki/recruitment/info/add'
export const WIKI_VOTE_PATH = '/wiki/recruitment/info/vote'

export const JOB_JOBS_PATH = '/job/jobs'
export const JOB_ADD_PATH = '/job/add'

export const REFERRAL_REFERRALS_PATH = '/referral/referrals'

export const fullPath = (path) => [BASE_URL, path].join('')
