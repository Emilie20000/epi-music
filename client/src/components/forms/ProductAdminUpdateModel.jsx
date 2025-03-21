import React, { useEffect, useState, useCallback } from 'react';
import Alert from '../Alerts/Alert';
import { useNavigate } from "react-router-dom";

const ProductAdminUpdateModel = ({ isOpen, onClose, modelId, productCategoryId, message }) => {
    const [model, setModel] = useState(null);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [formData, setFormData] = useState({
        color: '',
        size: '',
        price: '',
        stock: '',
        images: []
    });
    const [photoFiles, setPhotoFiles] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(null);
    const [deletedPhotos, setDeletedPhotos] = useState([]);
    const [alert, setAlert] = useState({ type: 'error', message: message });
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-800 opacity-50" onClick={onClose}></div>
            <div className="bg-white rounded-lg shadow-lg p-6 z-50 w-full max-w-lg">
                <h2 className="text-2xl font-semibold mb-4">Mettre à jour le modèle</h2>
                <Alert type={alert.type} message={alert.message} />
                <form>
                    {productCategoryId && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="color">Couleur :</label>
                            <select
                                id="color"
                                name="color"
                                aria-label="Sélectionner une couleur"
                                value={formData.color}
                                onChange={() => {}}
                                className="block w-full border border-gray-300 rounded p-2"
                            >
                                <option value="">Sélectionnez une couleur</option>
                                {colors.map(color => (
                                    <option key={color.id} value={color.id}>{color.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {productCategoryId && (
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="size">Taille :</label>
                            <select
                                id="size"
                                name="size"
                                aria-label="Sélectionner une taille"
                                value={formData.size}
                                onChange={() => {}}
                                className="block w-full border border-gray-300 rounded p-2"
                            >
                                <option value="">Sélectionnez une taille</option>
                                {sizes.map(size => (
                                    <option key={size.id} value={size.id}>{size.value} {size.unit}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="price">Prix :</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            aria-label="Entrer le prix du produit"
                            value={formData.price}
                            onChange={() => {}}
                            className="block w-full border border-gray-300 rounded p-2"
                            step="0.01"
                            min="0"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2" htmlFor="stock">Stock :</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            aria-label="Entrer le stock disponible"
                            value={formData.stock}
                            onChange={() => {}}
                            className="block w-full border border-gray-300 rounded p-2"
                            min="0"
                            required
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <label className="font-semibold leading-none text-black" htmlFor="photos">Photos</label>
                        <input
                            type="file"
                            id="photos"
                            aria-label="Ajouter des photos du produit"
                            multiple
                            onChange={() => {}}
                            className="leading-none text-gray-900 p-3 focus:outline-none focus:border-blue-700 mt-4 bg-gray-100 border rounded border-gray-200"
                        />
                        <div className="flex flex-col mt-4">
                            {formData.images.map((image, index) => (
                                <div key={index} className="flex items-center mt-2">
                                    <img src={image.path} alt={`Photo ${index}`} className="w-16 h-16 object-cover mr-4" />
                                    <button
                                        type="button"
                                        aria-label={image.is_main ? "Image principale" : "Définir comme image principale"}
                                        className={`mr-4 px-3 py-1 rounded ${image.is_main ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}
                                        onClick={() => {}}
                                    >
                                        {image.is_main ? 'Image principale' : 'Définir comme principale'}
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Supprimer cette image"
                                        className="ml-2 text-red-600"
                                        onClick={() => {}}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        aria-label="Enregistrer les modifications"
                        className="mt-4 bg-blue-500 text-white p-2 rounded"
                    >
                        Enregistrer les modifications
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProductAdminUpdateModel;
