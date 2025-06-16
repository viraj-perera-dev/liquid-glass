import type { FC } from 'react';
import GlassCard from '@/lib/GlassCard';
import './index.css';

const App: FC = () => {
    return (
        <div style={{ width: '100vw', height: '200vh' }}>
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundImage: "url('https://picsum.photos/1200/800')",
                    position: 'relative',
                }}
            >
                <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <GlassCard>
      <div className="p-6">
        <h2>Welcome to Liquid Glass</h2>
        <p>Experience the future of UI design with smooth, organic animations.</p>
      </div>
    </GlassCard>
                </div>
            </div>


        </div>
    );
};

export default App;
