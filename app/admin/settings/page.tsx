'use client'

import React, { FormEvent, useLayoutEffect, useState } from 'react'
import { NextPage } from 'next'
import { useRecoilValue } from 'recoil'
import { blogAtom, IBlog } from '@/store/blog.atom'
import styles from './settings.module.scss'
import { Button } from 'hellaui'
import Image from 'next/image'
import { IUser, userAtom } from '@/store/user.atom'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const Settings: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const blog = useRecoilValue(blogAtom)
  const user = useRecoilValue(userAtom)

  const [newBlog, setNewBlog] = useState<IBlog>(blog)
  const [newUser, setNewUser] = useState<IUser>(user)
  const [checkPasswords, setCheckPasswords] = useState<boolean>(false)

  const router = useRouter()

  useLayoutEffect(() => {
    if (newUser.password !== newUser.repeatedPassword) setCheckPasswords(true)
    else setCheckPasswords(false)
  }, [newUser.password, newUser.repeatedPassword])

  const handleSaveForm = async (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)

    if (newUser.password !== newUser.repeatedPassword) {
      setIsLoading(false)
      return
    }

    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/v1/api/blog`,
        { blog: newBlog }
      )
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/v1/api/user`,
        { user: newUser }
      )
      await router.push('/')
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  const handleOpenModal = (
    event: React.MouseEvent<HTMLButtonElement | MouseEvent>
  ) => {
    event.preventDefault()
  }

  const handleDeleteNavItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault()
    const filteredNewItems = [...newBlog.navItems]
    filteredNewItems.splice(id, 1)

    setNewBlog(inf => ({
      ...inf,
      navItems: filteredNewItems
    }))
  }

  const handleAddNavItem = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault()
    setNewBlog(inf => ({
      ...inf,
      navItems: [...newBlog.navItems, { label: '', url: '' }]
    }))
  }

  const handleChangeField = (
    index: number,
    info: { label?: string; url?: string }
  ) => {
    if (!newBlog.navItems) return

    const newNavItems = [...newBlog.navItems]
    if (info.label)
      newNavItems[index] = {
        label: info.label,
        url: newNavItems[index].url
      }
    if (info.url)
      newNavItems[index] = {
        label: newNavItems[index].label,
        url: info.url
      }
    setNewBlog(inf => ({ ...inf, navItems: newNavItems }))
  }

  return (
    <section className={styles.settings}>
      <form onSubmit={event => handleSaveForm(event)}>
        {/*Blog*/}
        <h3 className={styles.settings_title}>Blog</h3>
        <div className={styles.settings_form}>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Title</span>
            <input
              className={styles.settings_form_input}
              type="text"
              value={newBlog.title}
              onChange={e =>
                setNewBlog(inf => ({ ...inf, title: e.target.value }))
              }
              required
            />
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Description</span>
            <input
              className={styles.settings_form_input}
              type="text"
              value={newBlog.description}
              onChange={e =>
                setNewBlog(inf => ({ ...inf, description: e.target.value }))
              }
              required
            />
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Logo</span>
            <button onClick={event => handleOpenModal(event)}>
              <Image
                className={styles.settings_form_image}
                src={`${
                  newBlog.logo
                    ? newBlog.logo
                    : 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                }`}
                width={400}
                height={400}
                priority
                alt="blogLogo"
                unoptimized
              />
            </button>
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Cover</span>
            <button onClick={event => handleOpenModal(event)}>
              <Image
                className={styles.settings_form_image}
                src={`${
                  newBlog.cover
                    ? newBlog.cover
                    : 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                }`}
                width={400}
                height={400}
                priority
                alt="blogLogo"
                unoptimized
              />
            </button>
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Post Per Page</span>
            <input
              className={styles.settings_form_input}
              type="number"
              min={1}
              value={newBlog.postPerPage}
              onChange={e =>
                setNewBlog(inf => ({ ...inf, postPerPage: +e.target.value }))
              }
              required
            />
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Theme</span>
            <select
              className={styles.settings_form_input}
              value={newBlog.activeTheme}
              onChange={e =>
                setNewBlog(inf => ({ ...inf, activeTheme: e.target.value }))
              }
            >
              {newBlog.themes.map((theme, index) => (
                <option key={index} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/*Navigation*/}
        <h3 className={styles.settings_title}>Navigation</h3>
        <div className={styles.settings_form}>
          {newBlog.navItems.map((navItem, index) => {
            return (
              <div key={index} className={styles.settings_nav}>
                <label className={styles.settings_nav_item}>
                  <span className={styles.settings_nav_label}>Label</span>
                  <input
                    type="text"
                    value={navItem.label}
                    onChange={e =>
                      handleChangeField(index, { label: e.target.value })
                    }
                    className={styles.settings_nav_input}
                  />
                </label>
                <label className={styles.settings_nav_item}>
                  <span className={styles.settings_nav_label}>Url</span>
                  <input
                    type="text"
                    value={navItem.url}
                    onChange={e =>
                      handleChangeField(index, { url: e.target.value })
                    }
                    className={styles.settings_nav_input}
                  />
                </label>
                <button
                  className={styles.settings_nav_delete}
                  onClick={e => handleDeleteNavItem(e, index)}
                >{`>- Item`}</button>
              </div>
            )
          })}
          <button
            onClick={e => handleAddNavItem(e)}
            className="bg-blue-500 p-2"
          >{`>+ Item`}</button>
        </div>
        {/*User*/}
        <h3 className={styles.settings_title}>User {user.name}</h3>
        <div className={styles.settings_form}>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Name</span>
            <input
              className={styles.settings_form_input}
              type="text"
              value={newUser.name}
              onChange={e =>
                setNewUser(inf => ({ ...inf, name: e.target.value }))
              }
              required
            />
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Slug</span>
            <input
              className={styles.settings_form_input}
              type="text"
              value={newUser.slug}
              onChange={e =>
                setNewUser(inf => ({ ...inf, slug: e.target.value }))
              }
              required
            />
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Avatar</span>
            <button onClick={event => handleOpenModal(event)}>
              <Image
                className={styles.settings_form_image}
                src={`${
                  newUser.image
                    ? newUser.image
                    : 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                }`}
                width={400}
                height={400}
                priority
                alt={newUser.image}
                unoptimized
              />
            </button>
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Cover</span>
            <button onClick={event => handleOpenModal(event)}>
              <Image
                className={styles.settings_form_image}
                src={`${
                  newUser.cover
                    ? newUser.cover
                    : 'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'
                }`}
                width={400}
                height={400}
                priority
                alt={newUser.cover}
                unoptimized
              />
            </button>
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Email</span>
            <input
              className={styles.settings_form_input}
              type="email"
              value={newUser.email}
              onChange={e =>
                setNewUser(inf => ({ ...inf, email: e.target.value }))
              }
              required
            />
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Location</span>
            <input
              className={styles.settings_form_input}
              type="text"
              value={newUser.location}
              onChange={e =>
                setNewUser(inf => ({ ...inf, location: e.target.value }))
              }
            />
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Website</span>
            <input
              className={styles.settings_form_input}
              type="text"
              value={newUser.website}
              onChange={e =>
                setNewUser(inf => ({ ...inf, website: e.target.value }))
              }
            />
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>Bio</span>
            <textarea
              className={styles.settings_form_input}
              value={newUser.bio}
              onChange={e =>
                setNewUser(inf => ({ ...inf, bio: e.target.value }))
              }
            />
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>New password</span>
            <input
              className={styles.settings_form_input}
              type="password"
              value={newUser.password}
              onChange={e =>
                setNewUser(inf => ({ ...inf, password: e.target.value }))
              }
            />
          </label>
          <label className={styles.settings_form_content}>
            <span className={styles.settings_form_label}>
              Repeat New Password
            </span>
            <input
              className={styles.settings_form_input}
              type="password"
              value={newUser.repeatedPassword}
              onChange={e =>
                setNewUser(inf => ({
                  ...inf,
                  repeatedPassword: e.target.value
                }))
              }
            />
            {checkPasswords && (
              <p className={styles.settings_nav_password_check}>
                Пароли не совпадают!
              </p>
            )}
          </label>
          {/*Action*/}
          <div className={styles.settings_form_actions}>
            <Button
              type="submit"
              sizes="lg"
              variant="primary"
              loading={isLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </section>
  )
}

export default Settings
