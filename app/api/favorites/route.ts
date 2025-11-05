import { NextRequest, NextResponse } from 'next/server';
import db, { FavoriteItem } from '@/app/lib/database/database';

export async function GET() {
  try {
    const items = await db.getAll();
    return NextResponse.json(items, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body || (!body.id && body.id !== 0) || !body.name) {
      return NextResponse.json({ message: 'Invalid payload. Require id and name.' 
      }, { status: 400 });
    }
    const item: FavoriteItem = {
      ...body,
      id: String(body.id),
      name: String(body.name),
    };

    try {
      const created = await db.add(item);
      return NextResponse.json(created, { status: 201 });
    } catch (e: any) {
      if (String(e.message) === 'ALREADY_EXISTS') {
        return NextResponse.json({ message: 'Favorite already exists' 
        }, { status: 409 });
      }
      throw e;
    }
  } catch (err: any) {
    if (err?.name === 'SyntaxError') {
      return NextResponse.json({ message: 'Invalid JSON' }, { status: 400 });
    }
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
