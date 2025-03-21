import React from 'react';

const ProductTitle = ({ name, category }) => {
    return (
        <div aria-label={`Titre du produit: ${name}, catégorie: ${category}`}>
            <h1 className="text-4xl font-bold mb-2" aria-label={`Nom du produit: ${name}`}>
                {name}
            </h1>
            <h3 className="text-sm text-gray-600 mb-6" aria-label={`Catégorie: ${category}`}>
                Catégorie : {category}
            </h3>
        </div>
    );
};

export default ProductTitle;
