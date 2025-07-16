import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "3rem" }}>
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Aradığınız sayfa mevcut değil.</p>
      <p>
        <Link to="/">Ana sayfaya dön</Link>
      </p>
    </div>
  );
}
