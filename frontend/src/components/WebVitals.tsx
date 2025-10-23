'use client';

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';
import { sendToGoogleAnalytics, WebVitalsMetric } from '@/lib/analytics';

export default function WebVitals() {
  useReportWebVitals((metric) => {
    // Converter para o formato esperado
    const webVitalsMetric: WebVitalsMetric = {
      id: metric.id,
      name: metric.name,
      value: metric.value,
      rating: metric.rating as 'good' | 'needs-improvement' | 'poor',
      delta: metric.delta,
      navigationType: metric.navigationType,
    };

    // Enviar para Google Analytics
    sendToGoogleAnalytics(webVitalsMetric);
  });

  return null;
}
