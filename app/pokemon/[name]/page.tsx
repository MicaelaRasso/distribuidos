'use server';
import { PokemonDetails } from '@/components/PokemonDetails';
import Link from 'next/link';


export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {

  const { name } = await params
  return (
    <div className='flex flex-col items-center'>
      <PokemonDetails name={name} />
      <Link
        href="/"
        className="py-4 text-pink-700 hover:text-pink-900 font-medium mb-6">
        Volver a la lista
      </Link>
    </div>
  );
}
