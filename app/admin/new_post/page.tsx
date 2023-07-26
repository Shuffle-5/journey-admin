'use client'

import React, { FormEvent, useState } from 'react'
import { NextPage } from 'next'
import { useRecoilState } from 'recoil'
import styles from './newPost.module.scss'
import { Button } from 'hellaui'
import { useRouter } from 'next/navigation'
import { postAtom } from '@/store/post.atom'
import ReactMarkdown from 'react-markdown'

const NewPost: NextPage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [post, setPost] = useRecoilState(postAtom)

  const router = useRouter()

  const handleSaveNewPost = async (event: FormEvent) => {
    event.preventDefault()
    setIsLoading(true)
    try {
      // await axios.post(
      //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/v1/api/post`,
      //   { new_post: post }
      // )
      await router.push('/')
    } catch (e) {
      console.log(e)
    }
    setIsLoading(false)
  }

  return (
    <section>
      <div className={styles.new_post}>
        {/*Text*/}
        <div className={styles.new_post_text}>
          <input
            className={styles.new_post_input}
            type="text"
            value={post.title}
            onChange={e => setPost(inf => ({ ...inf, title: e.target.value }))}
          />
          <textarea
            className="p-2"
            value={post.markdown}
            onChange={e =>
              setPost(inf => ({ ...inf, markdown: e.target.value }))
            }
          ></textarea>
        </div>
        {/*Markwodn*/}
        <div className={styles.new_post_markdown}>
          <p>{post.title}</p>
          <ReactMarkdown>{post.markdown}</ReactMarkdown>
        </div>
      </div>
      <label className={styles.new_post_form_content}>
        <span className={styles.new_post_form_label}>Tags</span>
        <input
          className={styles.new_post_form_input}
          type="text"
          value={post.tags}
          onChange={e => setPost(inf => ({ ...inf, tags: e.target.value }))}
          required
        />
      </label>
      <label className={styles.new_post_form_content}>
        <span className={styles.new_post_form_label}>isPublished</span>
        <input
          className={styles.new_post_form_input}
          type="checkbox"
          checked={post.isPublished}
          onChange={e =>
            setPost(inf => ({ ...inf, isPublished: !post.isPublished }))
          }
          required
        />
      </label>
      {/*Action*/}
      <div className={styles.new_post_actions}>
        <Button
          type="button"
          onClick={handleSaveNewPost}
          sizes="lg"
          variant="primary"
          loading={isLoading}
        >
          Save
        </Button>
      </div>
    </section>
  )
}

export default NewPost
