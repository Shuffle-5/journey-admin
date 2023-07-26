'use client'

import React, { useState } from 'react'
import { NextPage } from 'next'
import styles from './login.module.scss'
import { Button } from 'hellaui'
import { useRouter } from 'next/navigation'
import axios from 'axios'

const Login: NextPage = () => {
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const router = useRouter()

  const handleLogin = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/login/`)
      await router.push('/')
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  return (
    <>
      <section className={styles.login}>
        <h1 className={styles.login_title}>Login</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.login_form}>
            <label className={styles.login_form_content}>
              <span className={styles.login_form_label}>E-Mail address</span>
              <input
                className={styles.login_form_input}
                autoFocus={true}
                type="text"
                value={userName}
                onChange={e => setUserName(e.target.value)}
                required
              />
            </label>
            <label className={styles.login_form_content}>
              <span className={styles.login_form_label}>Password</span>
              <input
                className={styles.login_form_input}
                autoFocus={true}
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
            <div className={styles.login_form_actions}>
              <Button
                type="submit"
                sizes="lg"
                variant="primary"
                loading={isLoading}
              >
                Login
              </Button>
            </div>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login
