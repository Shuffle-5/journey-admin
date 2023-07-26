import { atom } from 'recoil'

interface IPost {
  username: string
  slug: string
  avatar: string
  cover: string
  website: string
  bio: string
  email: string
  password: string
}

export const postAtom = atom<IPost>({
  key: 'postAtom',
  default: {
    username: '',
    slug: '',
    avatar: '',
    cover: '',
    website: '',
    bio: '',
    email: '',
    password: ''
  }
})
