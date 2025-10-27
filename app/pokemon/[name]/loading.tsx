export default function PokemonesLoading() {
    return (
        <div className="border border-gray-300 shadow rounded-md p-4 max-w-xl w-full mx-auto m-4">
            {/* Contenedor de animación */}
            <div className="animate-pulse">
                <div className="min-h-screen py-8 px-4">

                    {/* Título centrado */}
                    <div className="text-center space-y-2 mb-6">
                        <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-8 mb-8">
                        {/* Columna izquierda: Imágenes */}
                        <div className="flex-shrink-0 w-full md:w-1/2">
                            <div className="grid grid-cols-2 gap-4">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-gray-200 h-24 rounded-lg"></div>
                                ))}
                            </div>
                        </div>

                        {/* Columna derecha: Tipos, Habilidades y Medidas */}
                        <div className="flex-grow space-y-6">
                            {/* Medidas */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-200 h-16 rounded-lg"></div>
                                <div className="bg-gray-200 h-16 rounded-lg"></div>
                            </div>

                            {/* Tipos */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-20"></div>
                                <div className="flex gap-2">
                                    <div className="h-6 w-16 bg-gray-200 rounded-lg"></div>
                                    <div className="h-6 w-16 bg-gray-200 rounded-lg"></div>
                                </div>
                            </div>

                            {/* Habilidades */}
                            <div className="space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                                <div className="flex flex-wrap gap-2">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="h-6 w-20 bg-gray-200 rounded-full"></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Estadísticas base */}
                    <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between">
                                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-10 bg-gray-200 rounded"></div>
                                </div>
                                <div className="w-full bg-gray-200 h-2 rounded-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>


    );
}