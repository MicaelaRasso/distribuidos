export type FavoritePayload = {
  id: string | number;
  name: string;
  [key: string]: any;
};

const BASE = '/api/favorites';

export async function addFavorite(payload: FavoritePayload) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.status === 201) {
    return res.json();
  } else {
    const err = await res.json().catch(() => ({ message: 'Unknown error' }));
    const error: any = new Error(err.message || 'Error adding favorite');
    error.status = res.status;
    throw error;
  }
}

export async function removeFavorite(id: string | number) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'DELETE',
  });

  if (res.status === 200 || res.status === 204) {
    const text = await res.text();
    try {
      return text ? JSON.parse(text) : { id };
    } catch {
      return { id };
    }
  } else {
    const err = await res.json().catch(() => ({ message: 'Unknown error' }));
    const error: any = new Error(err.message || 'Error removing favorite');
    error.status = res.status;
    throw error;
  }
}

export async function fetchFavorites() {
  const res = await fetch(BASE);
  if (res.ok) return res.json();
  throw new Error('Error fetching favorites');
}
