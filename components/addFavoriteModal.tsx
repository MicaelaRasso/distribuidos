import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

interface AddFavoriteModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (favoriteData: any) => void;
    pokemon: { id: string | number; name: string; sprites: any };
}

// Validación de los campos
const validationSchema = Yup.object({
    nickname: Yup.string()
        .min(3, "Debe tener al menos 3 caracteres")
        .max(20, "Máximo 20 caracteres")
        .required("El apodo es obligatorio"),
    description: Yup.string()
        .min(5, "Debe tener al menos 5 caracteres")
        .max(100, "Máximo 100 caracteres")
        .required("La descripción es obligatoria"),
});

export default function AddFavoriteModal({
    open,
    onClose,
    onSubmit,
    pokemon,
}: AddFavoriteModalProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-pink-50 rounded-2xl shadow-2xl w-96 p-6 relative border border-pink-200">
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-pink-600 text-xl font-bold hover:text-pink-800"
                >
                    ×
                </button>

                {/* Título */}
                <h2 className="text-pink-700 font-bold text-lg mb-4 text-center">
                    Agregar <span className="capitalize">{pokemon.name}</span> a favoritos
                </h2>

                <Formik
                    initialValues={{ nickname: "", description: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                        const image =
                            pokemon?.sprites?.front_default ||
                            pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
                            "/images/pokeball.png";

                        onSubmit({
                            id: String(pokemon.id),
                            name: pokemon.name,
                            nickname: values.nickname,
                            description: values.description,
                            image,
                        });

                        resetForm();
                        onClose();
                    }}
                >
                    {({ isValid, dirty }) => (
                        <Form className="flex flex-col gap-4">
                            {/* Campo nickname */}
                            <div>
                                <label
                                    htmlFor="nickname"
                                    className="block text-pink-700 font-semibold mb-1"
                                >
                                    Apodo
                                </label>
                                <Field
                                    name="nickname"
                                    placeholder={pokemon.name}
                                    className="w-full p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
                                />
                                <ErrorMessage
                                    name="nickname"
                                    component="p"
                                    className="text-sm text-red-500 mt-1"
                                />
                            </div>

                            {/* Campo descripción */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-pink-700 font-semibold mb-1"
                                >
                                    Descripción
                                </label>
                                <Field
                                    as="textarea"
                                    name="description"
                                    rows={3}
                                    placeholder="Descripcion"
                                    className="w-full p-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white resize-none"
                                />
                                <ErrorMessage
                                    name="description"
                                    component="p"
                                    className="text-sm text-red-500 mt-1"
                                />
                            </div>

                            {/* Botones */}
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-4 py-2 border border-pink-400 text-pink-600 font-semibold rounded-lg hover:bg-pink-100 transition-colors"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    disabled={!dirty || !isValid}
                                    className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors ${!dirty || !isValid
                                        ? "bg-pink-300 cursor-not-allowed"
                                        : "bg-pink-500 hover:bg-pink-600"
                                        }`}
                                >
                                    Guardar
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}
