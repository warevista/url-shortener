import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { Url } from '@/types/url';
import styles from '@/styles/ListPage.module.css'; // Import the CSS module
export const getServerSideProps = (async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/list`);
    if (!res.ok) throw new Error('Failed to fetch data from backend.');
    const urls: Url[] = await res.json();
    return { props: { urls } };
  } catch (error) {
    console.error(error);
    return { props: { urls: [] } };
  }
}) satisfies GetServerSideProps<{ urls: Url[] }>;
export default function ListPage({ urls }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const shortUrlBase = process.env.NEXT_PUBLIC_API_URL;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>All Shortened Links</h1>
      <div className={styles.listContainer}>
        {urls.length === 0 ? (
          <p style={{ padding: '1rem', textAlign: 'center' }}>No links have been created yet.</p>
        ) : (
          <ul className={styles.list}>
            {urls.map((url) => (
              <li key={url.id} className={styles.listItem}>
                <div className={styles.itemContent}>
                  <div className={styles.urlGroup}>
                    <a
                      href={`${shortUrlBase}/${url.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.shortUrlLink}
                    >
                      {`${shortUrlBase?.replace(/https?:\/\//, '')}/${url.slug}`}
                    </a>
                    <p className={styles.originalUrl}>{url.originalUrl}</p>
                  </div>
                  <div className={styles.visits}>
                    Visits: <span className={styles.visitsCount}>{url.visits}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}