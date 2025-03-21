import React, { useState, useEffect } from 'react';
import ProductTitle from '../ProductDetails/ProductTitle';
import ProductDescription from '../ProductDetails/ProductDescription';
import ProductImage from '../ProductDetails/ProductImage';
import ProductColors from '../ProductDetails/ProductColors';
import ProductSizes from '../ProductDetails/ProductSizes';
import Alert from '../Alerts/Alert';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../../context/CartContext';

const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [alert, setAlert] = useState({ message: '', type: 'error' });
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [editingReview, setEditingReview] = useState(null);
    const [editReviewContent, setEditReviewContent] = useState('');
    const [canPostReview, setCanPostReview] = useState(false);
    const [hasPostedReview, setHasPostedReview] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const { updateItemCount } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/products/${id}`);
                const data = await response.json();

                if (response.ok) {
                    setProduct(data);
                   
                    if (data.models.length > 0) {
                        const firstModel = data.models[0];
                        setSelectedColor(firstModel.color);
                        setSelectedSize(firstModel.size);
                    }
                    const uniqueReviews = Array.from(new Set(data.reviews.map(review => review.review_id)))
                        .map(id => data.reviews.find(review => review.review_id === id));
                    setReviews(uniqueReviews);
                    checkIfProductInCartAndReview(uniqueReviews);
                } else {
                    setAlert({ message: data.message || 'Erreur lors de la récupération du produit', type: 'error' });
                }
            } catch (error) {
                console.error("Erreur lors de la récupération du produit : ", error);
                setAlert({ message: 'Erreur interne du serveur', type: 'error' });
            }
        };

        fetchProduct();
    }, [id, refresh]);

    const checkIfProductInCartAndReview = async (productReviews = reviews) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) return;

        try {
            const response = await axios.get('http://localhost:8000/api/cart', { params: { userId: user.id } });
            const cartItems = response.data.items;
            const productInCart = cartItems.some(item => item.product_id === parseInt(id));
            const existingReview = productReviews.some(review => review.user_id === user.id);

            setCanPostReview(productInCart && !existingReview);
            setHasPostedReview(existingReview);
        } catch (error) {
            console.error("Erreur lors de la vérification du panier et des avis : ", error);
        }
    };

    // Assume handleAddToCart, handleAddReview, handleEditReview, handleUpdateReview, handleDeleteReview are defined

    return (
        <div className="p-6">
            <Alert message={alert.message} type={alert.type} />
            {product && (
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="space-y-4">
                        <ProductTitle name={product.name} category={product.category.name} />
                        <ProductImage images={product.models.find(model => model.color === selectedColor && model.size === selectedSize)?.images || []} />
                    </div>
                    <div className="space-y-4 mt-16 pt-12">
                        <ProductDescription
                            category={product.category.name}
                            description={product.description}
                            stock={product.models.find(model => model.color === selectedColor && model.size === selectedSize)?.stock}
                            color={product.models.find(model => model.color === selectedColor && model.size === selectedSize)?.color}
                            size={`${product.models.find(model => model.color === selectedColor && model.size === selectedSize)?.size || ''}`}
                            price={`${product.models.find(model => model.color === selectedColor && model.size === selectedSize)?.price || ''}`}
                            weight={`${product.weight || ''}`}
                            promotion={product.promotions.length > 0 ? product.promotions[0] : null}
                        />
                        <ProductColors
                            colors={Array.from(new Set(product.models.map(model => model.color)))}
                            selectedColor={selectedColor}
                            onColorSelect={(color) => setSelectedColor(color)}
                            aria-label={`Sélectionnez la couleur pour ${product.name}`}
                        />
                        <ProductSizes
                            sizes={Array.from(new Set(product.models.filter(model => model.color === selectedColor).map(model => model.size)))}
                            selectedSize={selectedSize}
                            onSizeSelect={(size) => setSelectedSize(size)}
                            aria-label={`Sélectionnez la taille pour ${product.name}`}
                        />
                        <div className="space-y-4">
                            <input
                                type="number"
                                id="quantity"
                                aria-label="Quantité"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                min="1"
                                max={product.models.find(model => model.color === selectedColor && model.size === selectedSize)?.stock || 1}
                                className="border border-gray-300 rounded-md p-2"
                            />
                            <button
                                onClick={handleAddToCart}
                                aria-label="Ajouter au panier"
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Ajouter au panier
                            </button>
                            {canPostReview && (
                                <div className="space-y-2">
                                    <textarea
                                        value={review}
                                        onChange={(e) => setReview(e.target.value)}
                                        placeholder="Écrire un avis"
                                        aria-label="Écrire un avis"
                                        className="border border-gray-300 rounded-md p-2 w-full"
                                    />
                                    <button
                                        onClick={handleAddReview}
                                        aria-label="Ajouter un avis"
                                        className="bg-green-500 text-white py-2 px-4 rounded"
                                    >
                                        Ajouter un avis
                                    </button>
                                </div>
                            )}
                        </div>
                        {hasPostedReview && reviews.map(review => (
                            <div key={review.review_id} className="border border-gray-300 rounded-md p-4 space-y-2" aria-label={`Avis de ${review.username}`}>
                                <p><strong>{review.username}</strong></p>
                                <p>{review.comment}</p>
                                {review.user_id === JSON.parse(localStorage.getItem('user'))?.id && (
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditReview(review)}
                                            aria-label={`Modifier l'avis de ${review.username}`}
                                            className="bg-yellow-500 text-white py-1 px-2 rounded"
                                        >
                                            <FontAwesomeIcon icon={faEdit} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteReview(review.review_id)}
                                            aria-label={`Supprimer l'avis de ${review.username}`}
                                            className="bg-red-500 text-white py-1 px-2 rounded"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                )}
                                {editingReview === review.review_id && (
                                    <div className="mt-2">
                                        <textarea
                                            value={editReviewContent}
                                            onChange={(e) => setEditReviewContent(e.target.value)}
                                            aria-label="Modifier votre avis"
                                            className="border border-gray-300 rounded-md p-2 w-full"
                                        />
                                        <button
                                            onClick={handleUpdateReview}
                                            aria-label="Mettre à jour l'avis"
                                            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
                                        >
                                            Mettre à jour l'avis
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage;
