'use client';

import '@/lib/env';
import { TokenDecimalConverter } from '@/components/token-decimal-converter';

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-3xl'>
        <h1 className='text-3xl font-bold text-center mb-8'>
          Multiple Token Decimal Converters
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <TokenDecimalConverter label='Converter 1' defaultDecimals={18} />
          <TokenDecimalConverter label='Converter 2' defaultDecimals={18} />
          <TokenDecimalConverter label='Converter 3' defaultDecimals={6} />
          <TokenDecimalConverter label='Converter 4' defaultDecimals={18} />
        </div>
      </div>
    </main>
  );
}
