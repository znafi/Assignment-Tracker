import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Here you would typically validate credentials against a database
    // For now, we'll just do a simple check
    if (email && password) {
      // In a real app, you would:
      // 1. Verify credentials against database
      // 2. Create a proper JWT token
      // For now, we'll just create a mock token
      const mockToken = Buffer.from(email).toString('base64');
      
      const response = NextResponse.json(
        { 
          success: true, 
          message: 'Login successful',
          token: mockToken,
          user: { email }
        },
        { status: 200 }
      );

      // Set the token as an HTTP-only cookie
      response.cookies.set({
        name: 'token',
        value: mockToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      // Set user email in a readable cookie (non-http-only)
      response.cookies.set({
        name: 'user_email',
        value: email,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });

      return response;
    }

    return NextResponse.json(
      { 
        success: false, 
        message: 'Invalid credentials'
      },
      { status: 401 }
    );

  } catch (error) {
    return NextResponse.json(
      { 
        success: false, 
        message: 'Internal server error'
      },
      { status: 500 }
    );
  }
}
