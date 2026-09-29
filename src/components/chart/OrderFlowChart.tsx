'use client';
import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData, HistogramData } from 'lightweight-charts';
import { useTradeWebSocket } from '@/hooks/useTradeWebSocket';

interface OrderFlowChartProps {
  symbol: string;
  source: 'bybit' | 'binance';
}

export default function OrderFlowChart({ symbol, source }: OrderFlowChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartApiRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const cvdSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);

  const { currentCandle, cvdAccumulator } = useTradeWebSocket(symbol, source);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Inisialisasi Chart Container
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 520,
      layout: {
        background: { color: '#080A08' },
        textColor: '#9CA3AF',
      },
      grid: {
        vertLines: { color: '#142800' },
        horzLines: { color: '#142800' },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // 1. Candlestick Main Series
    const candlestickSeries = chart.addCandlestickSeries({
      upColor: '#8fec00',
      downColor: '#ef4444',
      borderVisible: false,
      wickUpColor: '#8fec00',
      wickDownColor: '#ef4444',
    });

    // 2. CVD Histogram Series (Di Pane Bawah)
    const cvdSeries = chart.addHistogramSeries({
      color: '#8fec00',
      priceFormat: { type: 'volume' },
      priceScaleId: 'cvd',
    });

    chart.priceScale('cvd').applyOptions({
      scaleMargins: {
        top: 0.75, // Menempatkan CVD di 25% area bawah chart
        bottom: 0,
      },
    });

    chartApiRef.current = chart;
    candlestickSeriesRef.current = candlestickSeries;
    cvdSeriesRef.current = cvdSeries;

    // Resize Responsif
    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol, source]);

  // Update Tick Real-time dari WebSocket
  useEffect(() => {
    if (!currentCandle || !candlestickSeriesRef.current || !cvdSeriesRef.current) return;

    const candleData: CandlestickData = {
      time: currentCandle.time as any,
      open: currentCandle.open,
      high: currentCandle.high,
      low: currentCandle.low,
      close: currentCandle.close,
    };

    const isBuyerImbalance = currentCandle.delta >= 0;
    const cvdHistogramData: HistogramData = {
      time: currentCandle.time as any,
      value: currentCandle.delta,
      color: isBuyerImbalance ? '#8fec00' : '#ef4444', // Neon Green vs Red
    };

    candlestickSeriesRef.current.update(candleData);
    cvdSeriesRef.current.update(cvdHistogramData);
  }, [currentCandle]);

  return (
    <div className="rounded-2xl border border-secondary-surface bg-[#080A08] p-4 backdrop-blur-md">
      {/* Chart Header Meta Info */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-secondary-surface mb-4">
        <div className="flex items-center gap-3">
          <span className="font-heading text-lg font-bold text-white tracking-wider">
            {symbol}
          </span>
          <span className="rounded-md bg-[#142800] px-2.5 py-1 text-xs font-mono text-primary-accent uppercase border border-primary-accent/30">
            {source} Stream
          </span>
        </div>

        <div className="flex items-center gap-6 font-mono text-xs">
          <div>
            <span className="text-gray-400">Live Delta: </span>
            <span className={`font-bold ${currentCandle && currentCandle.delta >= 0 ? 'text-primary-accent' : 'text-red-400'}`}>
              {currentCandle ? currentCandle.delta.toFixed(2) : '0.00'}
            </span>
          </div>
          <div>
            <span className="text-gray-400">CVD Session: </span>
            <span className={`font-bold ${cvdAccumulator >= 0 ? 'text-primary-accent' : 'text-red-400'}`}>
              {cvdAccumulator.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* HTML5 Canvas Render Node */}
      <div ref={chartContainerRef} className="w-full h-[520px]" />
    </div>
  );
}
