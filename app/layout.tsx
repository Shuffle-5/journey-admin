'use client'

import './globals.scss'
import { Inter } from 'next/font/google'
import { RecoilRoot } from 'recoil'
import { usePathname } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'
import Header from '@/app/_components/Header'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const pathName = usePathname()
  const [useHeader, setUseHeader] = useState<boolean>(true)

  useLayoutEffect(() => {
    if (pathName === '/admin/login' || pathName === '/admin/registration')
      setUseHeader(false)
  }, [pathName])

  useLayoutEffect(() => {}, [])
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <RecoilRoot>
          <>
            {useHeader && <Header />}
            {children}
          </>
        </RecoilRoot>
      </body>
    </html>
  )
}
