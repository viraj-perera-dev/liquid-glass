import type { FC } from 'react';
import GlassCard from '@/lib/GlassCard';
import './index.css';

const App: FC = () => {
  return (
    <div style={{ width: '100%', height: '200vh' }}>
      {/* Background Section */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundImage: "url('https://picsum.photos/200/300')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Centered GlassCard */}
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
          }}
        >
          <GlassCard
            style={{
              color: 'white',
            }}
          >
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Gold_Nugget.png/128px-Gold_Nugget.png"
                alt="Gold Nugget"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: '2px solid rgba(255,255,255,0.3)',
                }}
              />
              <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Careisgold</h2>
              <p style={{ fontSize: '1rem', opacity: 0.9 }}>
                Scopri l’eccellenza dei lingotti con purezza 999,9‰ Good Delivery.
              </p>
              <button
                style={{
                  backgroundColor: '#FFD700',
                  color: '#000',
                  border: 'none',
                  borderRadius: '0.75rem',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Scopri di più
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default App;
