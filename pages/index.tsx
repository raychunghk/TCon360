import Link from 'next/link';
import { FC } from 'react';
import { useFeature } from 'src/client/hooks/useFeatures';
import { buildServerSideProps } from 'src/client/ssr/buildServerSideProps';
import { BlogPost } from 'src/shared/types/blog-post';
import { fetch } from 'src/shared/utils/fetch';

type THomeProps = {
  blogPosts: BlogPost[];
};
export const getServerSideProps: GetServerSideProps<THomeProps> = async () => {
  const blogPosts = await fetch('/absproxy/5000/api/blog-posts');
  return { props: { blogPosts } };
};
const Home: FC<THomeProps> = ({ blogPosts }) => {
  //const linkFeature = useFeature('blog_link');

  return (
    <div>
      <h1>Home</h1>
      {blogPosts.map(({ title, id }) => (
        <div key={id}>
          {
            <>
              {title}
              <Link href={`/${id}`}> Link</Link>
            </>
          }
        </div>
      ))}
    </div>
  );
};

export default Home;
