import React, { useState } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/learn/welcome">
            开始阅读
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const [date, setDate] = useState(new Date());
  const trackedDate = new Date("2022-07-15T03:00:13Z");
  return (
    <Layout
      title="主页"
      description="Ceramic Developers 文档非官方中文翻译">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div className={styles.rowCenter}>
              <div className={clsx('col col--8')}>
                <div className="text--center padding-horiz--md">
                  <h3>这是 <Link to="http://developers.ceramic.network/">Ceramic Developers</Link> 文档的一份非官方中文翻译。</h3>
                  <p>当前追踪的原仓库提交：<code>400ccdf</code>
                  {` (${Math.floor((date.getTime() - trackedDate.getTime()) / (1000 * 60 * 60 * 24))} 天前) `}
                  <Link to="https://github.com/ceramicnetwork/docs/tree/400ccdffbe0926da1565e0234fb75e2ce52a5231">查看提交</Link></p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
