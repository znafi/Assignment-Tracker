import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Not authenticated'
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Authenticated'
      },
      { status: 200 }
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
