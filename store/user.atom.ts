import { atom } from 'recoil'
import axios from 'axios'

interface IBaseUser {
  auth: boolean
}

export interface IUser extends IBaseUser {
  name: string
  email: string
  slug: string
  image: string
  cover: string
  location: string
  website: string
  bio: string
  password: string
  repeatedPassword: string
}

export const userAtom = atom<IUser>({
  key: 'userAtom',
  default: {
    name: '',
    email: '',
    slug: '',
    image: '',
    cover: '',
    location: '',
    website: '',
    bio: '',
    password: '',
    repeatedPassword: '',
    auth: false
  }
})

export const fetchUser = async (): Promise<IUser> => {
  const { data } = await axios.get('/admin/v1/api/blog')
  return data
}
