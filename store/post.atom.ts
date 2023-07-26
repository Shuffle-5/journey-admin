import { atom } from 'recoil'

interface IPost {
  title: string
  markdown: string
  tags: string
  isPublished: boolean
}

export const postAtom = atom<IPost>({
  key: 'postAtom',
  default: {
    title: '',
    markdown: '',
    tags: '',
    isPublished: false
  }
})
