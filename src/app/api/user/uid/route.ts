import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { userId, bybit_uid, exness_uid } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID dibutuhkan' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('members')
      .update({
        bybit_uid: bybit_uid || null,
        hfx_uid: exness_uid || null, // tersimpan di kolom hfx_uid / exness_uid
      })
      .eq('id', userId)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, member: data[0] });
  } catch (err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
