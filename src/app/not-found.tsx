import Link from "next/link";

export default function NotFound() {
  return (
    <main className="hero">
      <div className="container">
        <p className="mono accent">&gt; 404</p>
        <h1>Sayfa bulunamadı</h1>
        <p className="lead">Aradığın sayfa yok ya da taşınmış.</p>
        <div className="actions">
          <Link href="/" className="btn primary">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    </main>
  );
}
