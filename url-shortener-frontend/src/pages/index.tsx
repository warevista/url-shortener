import { useState, FormEvent } from 'react';
import styles from '@/styles/HomePage.module.css'; 
const LinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
);
const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path></svg>
);
export default function HomePage() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setShortUrl('');
    setCopied(false);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ originalUrl: url }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message[0] || 'An unknown error occurred.');
      setShortUrl(data.shortUrl);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <LinkIcon />
          <h1 className={styles.title}>URL Shortener</h1>
        </div>
        <p className={styles.subtitle}>Enter the URL to shorten</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="url">URL</label>
            <input
              id="url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://your-long-url.com"
              required
            />
          </div>
          <button type="submit" disabled={isLoading} className={styles.button}>
            {isLoading ? 'Shortening...' : 'Shorten'}
          </button>
        </form>
        {error && (
          <div className={styles.errorBox}>
            <strong>Error:</strong> {error}
          </div>
        )}
        {shortUrl && (
          <div className={styles.successBox}>
            <p className={styles.successText}>Success! Here is your short URL:</p>
            <div className={styles.resultBox}>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className={styles.shortUrl}>
                {shortUrl}
              </a>
              <button onClick={handleCopy} className={styles.copyButton}>
                <CopyIcon />
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}