import type { FC } from 'react';
import GlassCard from '@/lib/GlassCard';
import './index.css';

const App: FC = () => {
    return (
        <div style={{ width: '100vw', height: '200vh' }}>
        <div
            style={{
                width: '100%',
                height: '200vh',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundImage: "url('https://picsum.photos/1200/800')",
                position: 'relative',
            }}
        >
        </div>

        <GlassCard style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <h1 style={{ color: 'white' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
        </GlassCard>
        </div>
    );
};

export default App;
