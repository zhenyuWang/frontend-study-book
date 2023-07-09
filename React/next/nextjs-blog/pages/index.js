import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

import useSWR from 'swr'

// import { getSortedPostsData } from '../lib/posts'

// export async function getStaticProps() {
//   const allPostsData = getSortedPostsData()
//   return {
//     props: {
//       allPostsData,
//     },
//   }
// }

// export async function getServerSideProps() {
//   const allPostsData = await fetch('https://jsonplaceholder.typicode.com/posts')
//     .then((response) => response.json())
//     .then((data) => {
//       return data
//     })
//   return {
//     props: { allPostsData },
//   }
// }

// export default function Home({ allPostsData }) {
export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json())
  const {
    data: allPostsData,
    error,
    isLoading,
  } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)

  const getContent = () => {
    if (isLoading) return <div>loading...</div>
    else if (error) return <div>error</div>
    else if (allPostsData)
      return (
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, title, body }) => (
            <li className={utilStyles.listItem} key={id}>
              id: {id}
              <br />
              {title}
              <br />
              {body}
            </li>
          ))}
        </ul>
      )
  }

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hi, my name is runnnig snail. I'm a front-end development engineer
        </p>
        {/* <ul className={utilStyles.list}> */}
        {/* getStaticProps */}
        {/* {allPostsData.map(({ id, date, title, author }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
              <br />
              {author}
            </li>
          ))} */}
        {/* getServerSideProps */}
        {/* {allPostsData.map(({ id, title, body }) => (
            <li className={utilStyles.listItem} key={id}>
              id: {id}
              <br />
              {title}
              <br />
              {body}
            </li>
          ))} */}
        {/* </ul> */}
        {getContent()}
      </section>
      <Link href="/posts/first-post">Read first post</Link>
    </Layout>
  )
}
