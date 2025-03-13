'use client';

import { useState, useRef, useEffect } from 'react';
import HackingText from '../app/components/HackingText';

export default function Home() {
  const [inputText, setInputText] = useState('Access granted. Initializing system override...');
  const [speed, setSpeed] = useState(50);
  const [glitchProbability, setGlitchProbability] = useState(0.03);
  const [protocolVersion, setProtocolVersion] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  
  useEffect(() => {
    const majorVersion = Math.floor(Math.random() * 10);
    const minorVersion = Math.floor(Math.random() * 100);
    setProtocolVersion(`v${majorVersion}.${minorVersion}`);
    
    const date = new Date().toISOString().split('T')[0];
    setCurrentDate(date);
  }, []);
  
  const {
    displayText,
    isAnimating,
    isComplete,
    startAnimation,
    stopAnimation
  } = HackingText({
    text: inputText,
    speed,
    glitchProbability
  });

  return (
    <main className="flex min-h-screen flex-col items-center bg-black text-green-400 p-4">
      <div className="w-full max-w-3xl space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-mono font-bold glitch-text">Hack<span className="text-red-500">Animation</span></h1>
          <p className="text-green-300 opacity-80">Text hacking animation simulator</p>
        </div>
        
        <div className="border border-green-500/30 bg-black/60 backdrop-blur-sm rounded-lg p-6 shadow-lg shadow-green-500/10">
          <div className="mb-4">
            <label htmlFor="input-text" className="block mb-2 text-sm font-mono">
              TARGET MESSAGE
            </label>
            <textarea
              id="input-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={isAnimating}
              className={`w-full h-24 bg-black/70 border border-green-500/50 rounded p-3 text-green-300 font-mono focus:outline-none focus:ring-1 focus:ring-green-500 placeholder-green-700 ${
                isAnimating ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              placeholder="Enter your message here..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2 text-sm font-mono">
                PROCESSING SPEED ({speed}ms)
              </label>
              <input
                type="range"
                min={10}
                max={200}
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                disabled={isAnimating}
                className={`w-full accent-green-500 ${
                  isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-mono">
                GLITCH INTENSITY ({Math.round(glitchProbability * 100)}%)
              </label>
              <input
                type="range"
                min={0}
                max={10}
                step={0.1}
                value={glitchProbability * 100}
                onChange={(e) => setGlitchProbability(Number(e.target.value) / 100)}
                disabled={isAnimating}
                className={`w-full accent-green-500 ${
                  isAnimating ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              />
            </div>
          </div>
          
          <div className="flex space-x-3 mb-6">
            <button
              onClick={startAnimation}
              disabled={isAnimating}
              className={`flex-1 py-2 px-4 rounded font-mono text-sm ${
                isAnimating 
                  ? 'bg-green-900/50 text-green-700 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-500 text-black'
              }`}
            >
              EXECUTE
            </button>
            <button
              onClick={stopAnimation}
              disabled={!isAnimating}
              className={`py-2 px-4 rounded font-mono text-sm ${
                !isAnimating 
                  ? 'bg-red-900/30 text-red-700/50 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-500 text-black'
              }`}
            >
              ABORT
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-transparent pointer-events-none rounded" />
            <div className="border border-green-500/30 bg-black rounded h-48 p-4 font-mono text-lg overflow-y-auto whitespace-pre-wrap">
              {displayText || (
                <span className="text-green-700">Awaiting input sequence...</span>
              )}
              {isAnimating && (
                <span className="inline-block w-2 h-4 ml-1 bg-green-500 animate-pulse" />
              )}
              {isComplete && (
                <div className="mt-4 text-sm text-green-400 font-bold">
                  PROCESS COMPLETE ✓
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="text-xs text-green-700 font-mono text-center">
          {protocolVersion && currentDate ? 
            `SECURE CONNECTION ESTABLISHED • PROTOCOL ${protocolVersion} • ${currentDate}` : 
            'INITIALIZING CONNECTION...'}
        </div>
        <div className="text-xs text-green-700 font-mono text-center">
          <p>Made by: Nishanth Gandhe</p>
        </div>
      </div>
    </main>
  );
}