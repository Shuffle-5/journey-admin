'use client'

import { ReactNode, useCallback, useLayoutEffect, useState } from 'react'
import { blogAtom } from '@/store/blog.atom'
import { useRecoilState } from 'recoil'
import { userAtom } from '@/store/user.atom'
import { useAuth } from '@/hooks/useAuth'

export default function DashboardLayout({
  children // will be a page or nested layout
}: {
  children: ReactNode
}) {
  const [blog, setBlog] = useRecoilState(blogAtom)
  const [user, setUser] = useRecoilState(userAtom)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchData = useCallback(async () => {
    // Раскоментить на проде и протестировать
    // await fetchBlog().then(blog => {
    //   setBlog(blog)
    // })
  }, [setBlog, setUser])

  useAuth()

  useLayoutEffect(() => {
    fetchData().then(() => setIsLoading(true))
  }, [fetchData])

  return <>{isLoading ? <>{children}</> : null}</>
}
