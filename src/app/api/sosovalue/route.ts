import { NextResponse } from 'next/server';

export async function GET() {
  const SOSO_API_KEY = process.env.SOSOVALUE_API_KEY || '';

  try {
    // JIKA API CODE KAMU SUDAH SIAP:
    // Un-comment kode fetch di bawah dan sesuaikan endpoint resmi dari SoSoValue:
    /*
    const response = await fetch('https://api.sosovalue.com/v1/etf/hero-data', {
      headers: {
        'x-api-key': SOSO_API_KEY,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 } // Cache 5 menit
    });
    const data = await response.json();
    return NextResponse.json(data);
    */

    // TEMPORARY FALLBACK DATA (Menampilkan struktur data default)
    return NextResponse.json({
      btcDailyInflow: '+$420.5M',
      ethDailyInflow: '+$85.2M',
      btcCumulativeInflow: '$30.45B',
      totalAum: '$104.2B',
      status: 'BUYING / ACCUMULATING',
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch SoSoValue API' },
      { status: 500 }
    );
  }
}
