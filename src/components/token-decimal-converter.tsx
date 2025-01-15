import React, { useState, useEffect } from 'react';

interface TokenDecimalConverterProps {
  /**
   * Default number of decimals used for conversion (e.g., 6 for USDC).
   * If not provided, defaults to 6.
   */
  defaultDecimals?: number;
  /**
   * An optional label to differentiate multiple instances of the component.
   */
  label?: string;
}

export const TokenDecimalConverter: React.FC<TokenDecimalConverterProps> = ({
  defaultDecimals = 6,
  label = 'Token Decimal Converter',
}) => {
  // State for raw token amount (the amount in "wei-like" integer form)
  const [rawAmount, setRawAmount] = useState<string>('');
  // State for decimals
  const [decimals, setDecimals] = useState<number>(defaultDecimals);
  // State for the converted result
  const [convertedAmount, setConvertedAmount] = useState<string>('');

  useEffect(() => {
    // Whenever rawAmount or decimals changes, re-run the conversion
    try {
      // If either is empty/unset, clear the output
      if (rawAmount.trim() === '' || decimals < 0) {
        setConvertedAmount('');
        return;
      }

      // Attempt to parse the rawAmount as a BigInt
      const bigRawAmount = BigInt(rawAmount);
      const decimalFactor = BigInt(10 ** decimals);
      const result = Number(bigRawAmount) / Number(decimalFactor);

      setConvertedAmount(result.toString());
    } catch (err) {
      // If there's a parse error or anything, show an error
      setConvertedAmount('Error converting. Check input or decimals.');
    }
  }, [rawAmount, decimals]);

  return (
    <div className='mb-6 rounded-lg bg-white shadow p-4'>
      <h2 className='text-lg font-semibold mb-4'>{label}</h2>

      <div className='mb-3'>
        <label className='block text-sm font-medium mb-1'>
          Token Amount (raw / EVM):
        </label>
        <input
          type='number'
          value={rawAmount}
          onChange={(e) => setRawAmount(e.target.value)}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200'
          placeholder='e.g. 1000000'
        />
      </div>

      <div className='mb-3'>
        <label className='block text-sm font-medium mb-1'>Decimals:</label>
        <input
          type='number'
          value={decimals}
          onChange={(e) => setDecimals(parseInt(e.target.value, 10))}
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200'
          placeholder='e.g. 6 for USDC'
        />
      </div>

      <div className='mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md'>
        <strong>Amount:</strong> {convertedAmount}
      </div>
    </div>
  );
};
