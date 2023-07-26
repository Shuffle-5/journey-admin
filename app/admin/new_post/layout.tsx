'use client'

import { ReactNode } from 'react'
import { useAuth } from '@/hooks/useAuth'

export default function NewPostLayout({
  children // will be a page or nested layout
}: {
  children: ReactNode
}) {
  useAuth()
  return <>{children}</>
}
