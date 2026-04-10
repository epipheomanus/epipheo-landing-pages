export default function NotFound() {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#1A1A1A', fontFamily: 'Barlow, sans-serif'
    }}>
      <div style={{ textAlign: 'center', color: 'white', padding: 32 }}>
        <h1 style={{ fontSize: 72, fontFamily: 'Oswald, sans-serif', fontWeight: 700, margin: 0 }}>404</h1>
        <p style={{ fontSize: 18, color: '#999', marginTop: 12 }}>Page not found.</p>
        <a
          href="/"
          style={{
            display: 'inline-block', marginTop: 24,
            padding: '12px 32px', borderRadius: 999,
            background: '#FF5F3C', color: 'white',
            textDecoration: 'none', fontFamily: 'Oswald, sans-serif',
            textTransform: 'uppercase', fontWeight: 600, fontSize: 14,
            letterSpacing: '0.05em'
          }}
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
