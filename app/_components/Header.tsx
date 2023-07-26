import { FC, useEffect, useState } from 'react'
import styles from './Header.module.scss'
import { Drawer } from 'hellaui'
import { HiMenuAlt3 } from 'react-icons/hi'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useRecoilValue } from 'recoil'
import { blogAtom } from '@/store/blog.atom'

const Header: FC = () => {
  const [isOpaque, setIsOpaque] = useState<boolean>(false)
  const [mobileVisible, setMobileVisible] = useState<boolean>(false)
  const [pagePath, setPagePath] = useState<string>('')

  const router = useRouter()
  const pathName = usePathname()
  const blog = useRecoilValue(blogAtom)

  const hideDrawer = () => {
    if (window.innerWidth > 768) setMobileVisible(false)
  }

  useEffect(() => {
    window.addEventListener('resize', hideDrawer, false)
    return () => window.removeEventListener('resize', hideDrawer, false)
  }, [])

  useEffect(() => {
    if (pathName === pagePath) return
    setMobileVisible(false)
    setPagePath(pathName)
  }, [pagePath, pathName, router])

  useEffect(() => {
    let offset = 50
    const onScroll = () => {
      if (!isOpaque && window.scrollY > offset) {
        setIsOpaque(true)
      } else if (isOpaque && window.scrollY <= offset) {
        setIsOpaque(false)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [isOpaque])
  return (
    <div
      className={`${styles.container} ${
        isOpaque ? styles.active : styles.inactive
      }`}
    >
      <div className={styles.header}>
        <ul className={styles.nav}>
          <li>
            <Link href="/admin">{blog.title}</Link>
          </li>
          <li>
            <Link href="content">Content</Link>
          </li>
          <li>
            <Link href="new_post">New Post</Link>
          </li>
          <li>
            <Link href="settings">Settings</Link>
          </li>
        </ul>
        <button
          className={styles.nav_mobile_button}
          onClick={() => setMobileVisible(true)}
        >
          <HiMenuAlt3 size={28} />
        </button>
        <Drawer
          sizes="xl"
          position="top"
          height={300}
          closeOnOutsideClick
          backgroundColor="#EBF1FC"
          textColor="#179CDE"
          title="Навигация"
          isVisible={mobileVisible}
          onClose={() => setMobileVisible(false)}
        >
          <div className="space-y-4">
            <ul className={styles.nav_mobile}>
              <li>
                <Link href="/admin">{blog.title}</Link>
              </li>
              <li>
                <Link href="content">Content</Link>
              </li>
              <li>
                <Link href="new_post">New Post</Link>
              </li>
              <li>
                <Link href="settings">Settings</Link>
              </li>
            </ul>
          </div>
        </Drawer>
      </div>
    </div>
  )
}

export default Header
