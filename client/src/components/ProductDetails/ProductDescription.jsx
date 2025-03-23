import React from 'react';

const ProductDescription = ({ category, description, stock, color, size, price, weight, promotion }) => {

    const getSizeLabel = () => {
        switch (category.toLowerCase()) {
            case 'instrument':
                return null;
            case 'vinyle':
                return 'Tours';
            case 'goodies':
                return 'Taille';
            default:
                return 'Taille';
        }
    }

    const sizeLabel = getSizeLabel();
    const shouldShowSize = sizeLabel && category.toLowerCase() !== 'instrument';

    return (
        <div className="p-6 bg-white rounded-lg shadow-md max-h-100 overflow-y-auto" aria-label="Détails du produit">
            <div className="text-lg font-semibold mb-2" role="heading" aria-level="2">
                Description
            </div>
            <p className="text-gray-700 mb-4" aria-label="Description du produit">
                {description}
            </p>
            <div className="flex items-center mb-2" aria-label={`Stock: ${stock > 0 ? stock : 'Bientôt disponible'}`}>
                <span className="font-semibold mr-2">Stock:</span>
                <span className={stock > 0 ? "text-green-600" : "text-red-600"}>
                    {stock > 0 ? `${stock}` : 'Bientôt disponible'}
                </span>
            </div>
            <div className="flex items-center mb-2" aria-label={`Couleur: ${color}`}>
                <span className="font-semibold mr-2">Couleur:</span>
                <span className="text-gray-700">{color}</span>
            </div>
            {shouldShowSize && (
                <div className="flex items-center mb-2" aria-label={`Taille: ${size}`}>
                    <span className="font-semibold mr-2">{sizeLabel}:</span>
                    <span className="text-gray-700">{size}</span>
                </div>
            )}
            {promotion ? (
                <div className="flex flex-col mb-2" aria-label="Détails de la promotion">
                    <span className="text-gray-500 line-through text-lg" aria-label={`Prix normal: ${price || 'Non disponible'}`}>
                        ${price || 'Non disponible'}
                    </span>
                    <span className="text-red-600 text-xl font-bold" aria-label={`Prix promotionnel: ${promotion.promo_price}`}>
                        ${promotion.promo_price}
                    </span>
                    <p className="text-sm text-red-600 font-bold" aria-label={`Promotion du ${promotion.start_date} au ${promotion.end_date}`}>
                        Promotion du {promotion.start_date} au {promotion.end_date}
                    </p>
                </div>
            ) : (
                <p className="text-lg font-semibold mb-2" aria-label={`Prix du produit: ${price || 'Non disponible'}`}>
                    Prix : ${price || 'Non disponible'}
                </p>
            )}
            <div className="flex items-center mb-2" aria-label={`Poids: ${weight} kg`}>
                 <span className="font-semibold mr-2">Poids:</span>
                <span className="text-gray-700">{weight} kg</span>
            </div>
        </div>
    );
};

export default ProductDescription;
