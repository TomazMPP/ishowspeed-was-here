'use client'

import { useState, useEffect } from 'react'
import { InteractiveMap } from '@/components/interactive-map'
import { Loading } from '@/components/loading'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-[#1a365d] flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro ao carregar o mapa</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="fixed inset-0 bg-[#1a365d] overflow-hidden">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <h1 className="text-4xl font-bold text-white text-center drop-shadow-lg">
          IShowSpeed World Tour
        </h1>
      </div>
      <div className="w-full h-full">
        <InteractiveMap />
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <p className="text-xl font-bold text-white text-center drop-shadow-lg">
          Made by <a href="https://github.com/TomazMPP" className='text-green-500'>Tomaz</a>
        </p>
      </div>
    </main>
  );
}

