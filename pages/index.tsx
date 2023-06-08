import Head from 'next/head';
import { Inter } from 'next/font/google';
import homeStyles from '../styles/Home.module.css';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Simple Blog</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[Simple Blog Introduction]</p>
        <p>(This is a website built with Next.js)</p>
      </section>
      <section className={`${homeStyles.headingMd} ${homeStyles.padding1px}`}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}></ul>
      </section>
    </div>
  );
}
