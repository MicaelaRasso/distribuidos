import { NextRequest, NextResponse } from 'next/server';
import db from '@/app/lib/database/database';



export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const {id} = await params;
  console.log('DELETE /api/favorites/[id] called with id:', id);
  if (!id) {
    return NextResponse.json({ message: 'Missing id parameter' 
    }, { status: 400 });
  }

  try {
    try {
      const removed = await db.remove(String(id));
      return NextResponse.json(removed, { status: 200 });
    } catch (e: any) {
      if (String(e.message) === 'NOT_FOUND') {
        return NextResponse.json({ message: 'Favorite not found' 
        }, { status: 404 });
      }
      throw e;
    }
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error' 
    }, { status: 500 });
  }
}
