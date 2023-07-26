'use client'

import React, { useLayoutEffect, useState } from 'react'
import { NextPage } from 'next'
import styles from './registraion.module.scss'
import { Button } from 'hellaui'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Registration: NextPage = () => {
  const [userName, setUserName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')
  const [checkPasswords, setCheckPasswords] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  useLayoutEffect(() => {
    if (password !== repeatPassword) setCheckPasswords(true)
    else setCheckPasswords(false)
  }, [password, repeatPassword])

  const handleRegister = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== repeatPassword) {
      setIsLoading(false)
      return
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/register/`)
      await router.push('/')
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  return (
    <>
      <section className={styles.registration}>
        <h1 className={styles.registration_title}>Registration</h1>
        <form onSubmit={handleRegister}>
          <div className={styles.registration_form}>
            <label className={styles.registration_form_content}>
              <span className={styles.registration_form_label}>User Name</span>
              <input
                className={styles.registration_form_input}
                autoFocus={true}
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                required
              />
            </label>
            <label className={styles.registration_form_content}>
              <span className={styles.registration_form_label}>
                E-Mail address
              </span>
              <input
                className={styles.registration_form_input}
                autoFocus={true}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </label>
            <label className={styles.registration_form_content}>
              <span className={styles.registration_form_label}>Password</span>
              <input
                className={styles.registration_form_input}
                autoFocus={true}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
            <label className={styles.registration_form_content}>
              <span className={styles.registration_form_label}>
                Repeat Password
              </span>
              <input
                className={styles.registration_form_input}
                autoFocus={true}
                type="password"
                value={repeatPassword}
                onChange={e => setRepeatPassword(e.target.value)}
                required
              />
              {checkPasswords && (
                <p className={styles.registration_form_password_check}>
                  Пароли не совпадают!
                </p>
              )}
            </label>
            <div className={styles.registration_form_actions}>
              <Button
                type="submit"
                sizes="lg"
                variant="primary"
                loading={isLoading}
              >
                Register
              </Button>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default Registration
