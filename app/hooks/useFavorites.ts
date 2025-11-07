'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  addFavorite,
  removeFavorite,
  fetchFavorites,
  FavoritePayload,
} from '@/app/services/favorites.service';

// 🔹 Hook para obtener los favoritos
export function useFavoritesQuery() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    staleTime: 120000, // 2 minutos
  });
}

// 🔹 Hook para agregar un favorito
export function useAddFavorite() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: FavoritePayload) => {
      // Validación rápida por seguridad
      if (!payload.id || !payload.name || !payload.nickname || !payload.description || !payload.image) {
        throw new Error('Faltan campos requeridos para guardar el favorito');
      }
      return addFavorite(payload);
    },
    onSuccess: () => {
      // Invalida la caché para que se actualice automáticamente la lista
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  return mutation;
}

// 🔹 Hook para eliminar un favorito
export function useRemoveFavorite() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string | number) => removeFavorite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  return mutation;
}
