import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../../styles/ProductForm.css";

const ProductAdminEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [photoPaths, setPhotoPaths] = useState([]);
    const [photoFiles, setPhotoFiles] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [brand, setBrand] = useState("");
    const [tags, setTags] = useState([]);
    const [weight, setWeight] = useState("");
    const [tagInput, setTagInput] = useState("");
    const [deletedPhotos, setDeletedPhotos] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/admin/products/${id}`)
            .then((response) => {
                const productData = response.data;
                setProduct(productData);
                setName(productData.name);
                setDescription(productData.description);
                setCategory(productData.category.id);
                setBrand(productData.brand || "");
                setTags(productData.tags || []);
                setWeight(productData.weight || "");
            })
            .catch(() => setError("Erreur lors de la récupération des données du produit!"));
    }, [id]);

    if (!product) return <div>Chargement...</div>;

    return (
        <div className="w-full">
            <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mt-8 mb-8">
                <div className="bg-white w-full shadow rounded p-8 sm:p-12">
                    <p className="text-3xl font-bold leading-7 text-center text-black">
                        Mettre à jour le produit
                    </p>
                    {message && <p className="success">{message}</p>}
                    {error && <p className="error">{error}</p>}
                    <form>
                        <div className="md:flex items-center mt-12">
                            <div className="w-full flex flex-col">
                                <label className="font-semibold leading-none text-black" htmlFor="name">
                                    Nom
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    aria-label="Nom du produit"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="p-3 border rounded bg-gray-100"
                                />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label className="font-semibold leading-none text-black" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    aria-label="Description du produit"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                    className="p-3 border rounded bg-gray-100"
                                    rows="5"
                                />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label className="font-semibold leading-none text-black" htmlFor="category">
                                    Catégorie
                                </label>
                                <select
                                    id="category"
                                    aria-label="Catégorie du produit"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                    className="p-3 border rounded bg-gray-100"
                                >
                                    <option value="">Sélectionnez une catégorie</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {category === "1" && (
                            <div className="md:flex items-center mt-8">
                                <div className="w-full flex flex-col">
                                    <label className="font-semibold leading-none text-black" htmlFor="brand">
                                        Marque
                                    </label>
                                    <input
                                        type="text"
                                        id="brand"
                                        aria-label="Marque du produit"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                        className="p-3 border rounded bg-gray-100"
                                    />
                                </div>
                            </div>
                        )}
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label className="font-semibold leading-none text-black" htmlFor="price">
                                    Prix
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    aria-label="Prix du produit"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    className="p-3 border rounded bg-gray-100"
                                />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label className="font-semibold leading-none text-black" htmlFor="stock">
                                    Stock
                                </label>
                                <input
                                    type="number"
                                    id="stock"
                                    aria-label="Stock disponible"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                    className="p-3 border rounded bg-gray-100"
                                />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label className="font-semibold leading-none text-black" htmlFor="photos">
                                    Photos
                                </label>
                                <input
                                    type="file"
                                    id="photos"
                                    aria-label="Ajouter des photos du produit"
                                    multiple
                                    onChange={(e) => setPhotoFiles(e.target.files)}
                                    className="p-3 border rounded bg-gray-100"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-center w-full mt-8">
                            <button
                                type="submit"
                                aria-label="Mettre à jour le produit"
                                className="py-4 px-10 bg-blue-700 text-white rounded hover:bg-blue-600"
                            >
                                Mettre à jour le produit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProductAdminEdit;
