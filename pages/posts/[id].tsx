import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../lib/post';
import Head from 'next/head';
import Date from '../../components/date';
import utilStyles from '../../styles/utils.module.css';
import { GetStaticProps, GetStaticPaths} from 'next';

export const getStaticPaths:GetStaticPaths = async()=> {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps:GetStaticProps = async ({ params: { id } }) => {
  const postData = await getPostData(id as string); //当路由允许嵌套时，传入的就是一个列表，而该文件不是嵌套路由
  return { props: { postData } };
}

export default function Post({ postData }) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
