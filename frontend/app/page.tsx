export default async function Home() {
  const res = await fetch(`${process.env.API_URL}/health`, { cache: "no-store" });
  const health = await res.json();
  return <main>ChaskiÑan — API: {health.status}</main>;
}