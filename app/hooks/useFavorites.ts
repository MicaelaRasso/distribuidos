'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { addFavorite, removeFavorite, fetchFavorites, FavoritePayload } from '@/app/services/favorites.service';

export function useFavoritesQuery() {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: fetchFavorites,
    staleTime: 120000,
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: FavoritePayload) => addFavorite(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    },
  });

  return mutation;
}

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
