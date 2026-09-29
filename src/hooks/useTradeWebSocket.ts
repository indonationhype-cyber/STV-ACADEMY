'use client';
import { useEffect, useState, useRef } from 'react';

export interface TradeTick {
  price: number;
  volume: number;
  side: 'Buy' | 'Sell';
  timestamp: number;
}

export interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  buyVolume: number;
  sellVolume: number;
  delta: number;
}

export function useTradeWebSocket(symbol: string = 'BTCUSDT', source: 'bybit' | 'binance' = 'bybit') {
  const [currentCandle, setCurrentCandle] = useState<CandleData | null>(null);
  const [cvdAccumulator, setCvdAccumulator] = useState<number>(0);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const symbolFormatted = symbol.toUpperCase();
    let url = '';

    if (source === 'bybit') {
      url = 'wss://stream.bybit.com/v5/public/linear';
    } else {
      url = `wss://stream.binance.com:9443/ws/${symbolFormatted.toLowerCase()}@aggTrade`;
    }

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      if (source === 'bybit') {
        ws.send(
          JSON.stringify({
            op: 'subscribe',
            args: [`publicTrade.${symbolFormatted}`],
          })
        );
      }
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);

      let price = 0;
      let volume = 0;
      let side: 'Buy' | 'Sell' = 'Buy';
      let timestamp = Date.now();

      if (source === 'bybit' && message.topic?.startsWith('publicTrade')) {
        const trades = message.data;
        if (!trades || trades.length === 0) return;
        
        trades.forEach((t: { p: string; v: string; S: string; T: number }) => {
          price = parseFloat(t.p);
          volume = parseFloat(t.v);
          side = t.S === 'Buy' ? 'Buy' : 'Sell';
          timestamp = t.T;
          processTrade(price, volume, side, timestamp);
        });
      } else if (source === 'binance' && message.e === 'aggTrade') {
        price = parseFloat(message.p);
        volume = parseFloat(message.q);
        // On Binance aggTrade: m = true means buyer was maker -> aggressive Sell
        side = message.m ? 'Sell' : 'Buy';
        timestamp = message.T;
        processTrade(price, volume, side, timestamp);
      }
    };

    function processTrade(p: number, v: number, s: 'Buy' | 'Sell', t: number) {
      const candleTime = Math.floor(t / 1000 / 60) * 60; // 1-Minute Candle bucket
      const buyVol = s === 'Buy' ? v : 0;
      const sellVol = s === 'Sell' ? v : 0;
      const delta = buyVol - sellVol;

      setCvdAccumulator((prev) => prev + delta);

      setCurrentCandle((prev) => {
        if (!prev || prev.time !== candleTime) {
          return {
            time: candleTime,
            open: p,
            high: p,
            low: p,
            close: p,
            buyVolume: buyVol,
            sellVolume: sellVol,
            delta: delta,
          };
        }

        return {
          ...prev,
          high: Math.max(prev.high, p),
          low: Math.min(prev.low, p),
          close: p,
          buyVolume: prev.buyVolume + buyVol,
          sellVolume: prev.sellVolume + sellVol,
          delta: prev.delta + delta,
        };
      });
    }

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [symbol, source]);

  return { currentCandle, cvdAccumulator };
}
