'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        // Default options
        duration: 4000,
        style: {
          background: '#1F2937', // gray-800
          color: '#F3F4F6', // gray-100
          border: '1px solid #374151', // gray-700
          padding: '16px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '500',
        },
        // Success
        success: {
          duration: 3000,
          iconTheme: {
            primary: '#5FAD56', // accent color - verde cannabis
            secondary: '#1F2937',
          },
          style: {
            background: '#1F2937',
            color: '#5FAD56',
            border: '1px solid #5FAD56',
          },
        },
        // Error
        error: {
          duration: 5000,
          iconTheme: {
            primary: '#EF4444', // red-500
            secondary: '#1F2937',
          },
          style: {
            background: '#1F2937',
            color: '#EF4444',
            border: '1px solid #EF4444',
          },
        },
        // Loading
        loading: {
          iconTheme: {
            primary: '#5FAD56',
            secondary: '#1F2937',
          },
          style: {
            background: '#1F2937',
            color: '#F3F4F6',
            border: '1px solid #5FAD56',
          },
        },
      }}
    />
  );
}
