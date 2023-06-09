import { getAllPostIds, getPostData } from '@/lib/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import homeStyles from '../../styles/Home.module.css';
import Head from 'next/head';
import React from 'react';

function Post({
  postData,
}: {
  postData: {
    title: string;
    date: string;
    contentHtml: string;
  };
}) {
  return (
    <div>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={homeStyles.headingXl}>{postData.title}</h1>
        <div>{postData.date}</div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
      </article>
    </div>
  );
}

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  debugger;
  //[{params: {id:'pre-rndereing'}}, {params: {id: 'ssg-ssr'}}]
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  console.log(postData);
  return {
    props: {
      postData,
    },
  };
};
