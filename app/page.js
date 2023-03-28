import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Hello World! Welcome to my Nextjs front end!</h1>
      <Link href="/login">Go to Login page</Link>
    </main>
  );
}
