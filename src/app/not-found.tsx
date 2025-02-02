export default function NotFound() {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#1A202C',
      color: 'white',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Not Found</h1>
      <p style={{ marginBottom: '2rem' }}>The page you are looking for does not exist.</p>
      <a 
        href="/"
        style={{
          backgroundColor: '#3182CE',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.375rem',
          textDecoration: 'none'
        }}
      >
        Go Home
      </a>
    </div>
  )
}
