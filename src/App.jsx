     import React, { useState } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState([]);

  const assets = [
    { id: 1, title: 'Quantum Glitch Pack', category: 'Plugins', price: 49, description: 'Next-gen data corruption and glitch effects.' },
    { id: 2, title: 'Cinematic LUTS Vol. 4', category: 'Presets', price: 29, description: 'Hollywood grade color grading look-up tables.' },
    { id: 3, title: 'Sci-Fi HUD Overlays 4K', category: 'Templates', price: 35, description: 'Fully customizable futuristic heads-up display elements.' }
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', color: '#f5f5f5', fontFamily: 'sans-serif', padding: '20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #262626', paddingBottom: '15px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, background: 'linear-gradient(to right, #818cf8, #c084fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Yk.FX Studio Suite</h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => setActiveTab('home')} style={{ background: activeTab === 'home' ? '#4f46e5' : '#262626', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>Home</button>
          <button onClick={() => setActiveTab('market')} style={{ background: activeTab === 'market' ? '#4f46e5' : '#262626', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>Marketplace ({cart.length})</button>
        </div>
      </header>

      {activeTab === 'home' ? (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Unleash Cinematic Power</h2>
          <p style={{ color: '#a3a3a3', maxWidth: '600px', margin: '0 auto 30px' }}>Professional grade plugins, motion presets, and sound FX designed for creators.</p>
          <button onClick={() => setActiveTab('market')} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '12px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>Explore Marketplace</button>
        </div>
      ) : (
        <div>
          <h2>Marketplace Assets</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
            {assets.map(item => (
              <div key={item.id} style={{ background: '#171717', border: '1px solid #262626', padding: '20px', borderRadius: '16px' }}>
                <span style={{ fontSize: '12px', color: '#818cf8', textTransform: 'uppercase' }}>{item.category}</span>
                <h3 style={{ margin: '10px 0' }}>{item.title}</h3>
                <p style={{ color: '#a3a3a3', fontSize: '14px' }}>{item.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                  <span style={{ fontWeight: 'bold', color: '#818cf8' }}>${item.price}</span>
                  <button onClick={() => setCart([...cart, item])} style={{ background: '#4f46e5', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '8px', cursor: 'pointer' }}>Add to Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
                                                 
