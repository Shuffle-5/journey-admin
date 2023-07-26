import { atom } from 'recoil'
import axios from 'axios'

export interface INavItems {
  label: string
  url: string
}

export interface IBlog {
  title: string
  description: string
  logo: string
  cover: string
  postPerPage: number
  activeTheme: any
  themes: any[]
  navItems: INavItems[]
}

export const blogAtom = atom<IBlog>({
  key: 'blogAtom',
  default: {
    title: '',
    description: '',
    logo: '',
    cover: '',
    postPerPage: 1,
    activeTheme: '',
    themes: [],
    navItems: []
  }
})

export const fetchBlog = async (): Promise<IBlog> => {
  const { data } = await axios.get('/admin/v1/api/blog')
  return data
}

export const postBlog = async (blog: IBlog): Promise<IBlog> => {
  const { data } = await axios.patch('/admin/v1/api/blog', { blog: blog })
  return data
}
