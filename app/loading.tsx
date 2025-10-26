export default function PokemonesLoading() {
  return (
    <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto m-4">

      {/* El contenedor principal de la animación de pulso */}
      <div className="animate-pulse text-center space-x-4">

        {/* Placeholder para la imagen/avatar */}
        <div className="rounded-full mx-auto bg-gray-300 h-10 w-10"></div>

        {/* Placeholders para el texto */}
        <div className="flex-1 mx-auto space-y-4 py-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>

        </div>
      </div>
    </div>
  );
}