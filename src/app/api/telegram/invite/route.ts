import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { nama_lengkap } = await request.json();

    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHANNEL_ID = process.env.TELEGRAM_VIP_CHANNEL_ID; // Contoh: -1001234567890

    if (!BOT_TOKEN || !CHANNEL_ID) {
      return NextResponse.json(
        { error: 'Telegram Bot Token atau Channel ID belum dikonfigurasi.' },
        { status: 500 }
      );
    }

    // Panggil Telegram API untuk membuat Single-Use Invite Link (member_limit: 1)
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/createChatInviteLink`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHANNEL_ID,
          name: `VIP Access - ${nama_lengkap || 'Member Stonevalley'}`,
          member_limit: 1, // Hanya dapat digunakan 1 kali
          expire_date: Math.floor(Date.now() / 1000) + 86400, // Expire dalam 24 jam
        }),
      }
    );

    const data = await response.json();

    if (!data.ok) {
      console.error('Telegram API Error:', data);
      return NextResponse.json({ error: data.description }, { status: 400 });
    }

    // Link sekali pakai yang dihasilkan Telegram
    const inviteLink = data.result.invite_link;

    return NextResponse.json({
      success: true,
      invite_link: inviteLink,
    });
  } catch (err) {
    console.error('Telegram Invite Error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
