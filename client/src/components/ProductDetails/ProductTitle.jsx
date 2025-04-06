import React from 'react';

const ProductTitle = ({ name, category, isDark }) => {

    const titleColor = isDark ? "text-slate-200" : "text-black";
    const categoryColor = isDark ? "text-slate-300" : "text-gray-600";

    return (
        <div>
            <h1 className={`text-4xl font-bold mb-2 ${titleColor}`}>{name}</h1>
            <h3 className={`text-sm ${categoryColor} mb-6`}>Catégorie : {category}</h3>
        </div>
    );
};

export default ProductTitle;