import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { phoneNumber } = await request.json();
    
    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      return NextResponse.json(
        { message: 'Invalid phone number' },
        { status: 400 }
      );
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(`OTP for ${phoneNumber}: ${otp}`);
    
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json({ 
        message: 'OTP sent successfully',
        otp: otp 
      });
    }
    
    return NextResponse.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    return NextResponse.json(
      { message: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
