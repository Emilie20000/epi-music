import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryAdminEdit = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [image, setImage] = useState(null);
    const [existingImagePath, setExistingImagePath] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/admin/categories/${id}`);
                const categoryData = response.data;
                setName(categoryData.name);
                setExistingImagePath(categoryData.imagePath);
            } catch (error) {
                console.error("Erreur lors de la récupération de la catégorie : ", error);
                setError("Erreur lors de la récupération de la catégorie.");
            }
        };

        fetchCategory();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let imagePath = existingImagePath;

        if (image) {
            const formData = new FormData();
            formData.append("file", image);

            try {
                const uploadResponse = await axios.post("http://localhost:8000/upload", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                imagePath = uploadResponse.data.filePath;

                const newFileName = `category_${id}.${image.name.split('.').pop()}`;
                const renameData = {
                    oldPath: imagePath,
                    newPath: `/uploads/${newFileName}`,
                };

                await axios.post("http://localhost:8000/rename-upload", renameData, {
                    headers: { "Content-Type": "application/json" },
                });

                imagePath = renameData.newPath;
            } catch (error) {
                console.error("Erreur lors de l'upload ou du renommage de l'image : ", error);
                setError("Erreur lors du téléchargement ou du renommage de l’image.");
                return;
            }
        }

        const updateData = { name, imagePath };

        try {
            await axios.put(`http://localhost:8000/api/admin/categories/${id}`, updateData, {
                headers: { "Content-Type": "application/json" },
            });
            setMessage("Catégorie mise à jour avec succès !");
            setError("");
            setTimeout(() => {
                navigate("/admin/categories");
            }, 2000);
        } catch (error) {
            console.error("Erreur lors de la modification de la catégorie!", error);
            setError("Erreur lors de la mise à jour de la catégorie !");
            setMessage("");
        }
    };

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mt-8 mb-8">
                <div className="bg-white w-full shadow rounded p-8 sm:p-12">
                    <p className="text-3xl font-bold leading-7 text-center text-black">
                        Modifier la catégorie
                    </p>
                    {message && <p className="success">{message}</p>}
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        {/* Nom de la catégorie */}
                        <div className="md:flex items-center mt-12">
                            <div className="w-full flex flex-col">
                                <label htmlFor="name" className="font-semibold leading-none text-black">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    aria-label="Nom de la catégorie"
                                    placeholder="Entrez le nom de la catégorie"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                />
                            </div>
                        </div>

                        {/* Image actuelle */}
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label className="font-semibold leading-none text-black">
                                    Image actuelle
                                </label>
                                {existingImagePath && (
                                    <div className="mb-4 flex justify-center">
                                        <img
                                            src={`http://localhost:8000${existingImagePath}`}
                                            alt="Catégorie actuelle"
                                            className="rounded"
                                        />
                                    </div>
                                )}
                                
                                {/* Upload de la nouvelle image */}
                                <label htmlFor="image" className="font-semibold leading-none text-black mt-2">
                                    Changer l'image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    aria-label="Télécharger une nouvelle image pour la catégorie"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                                />
                            </div>
                        </div>

                        {/* Bouton de soumission */}
                        <div className="flex items-center justify-center w-full mt-8">
                            <button
                                type="submit"
                                className="font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none"
                            >
                                Mettre à jour la catégorie
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CategoryAdminEdit;
