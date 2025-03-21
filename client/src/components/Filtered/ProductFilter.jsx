import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProductFilter = ({
    categories,
    brands,
    colors,
    sizes,
    maxPrice,
    maxWeight,
    onFiltersChange,
}) => {
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, maxPrice]);
    const [weightRange, setWeightRange] = useState([0, maxWeight]);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isBrandsOpen, setIsBrandsOpen] = useState(true);
    const [isColorsOpen, setIsColorsOpen] = useState(true);
    const [isSizesOpen, setIsSizesOpen] = useState(true);
    const [isPriceOpen, setIsPriceOpen] = useState(true);
    const [isWeightOpen, setIsWeightOpen] = useState(true);

    const { category } = useParams();

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(updatedCategories);
        onFiltersChange({ brands: selectedBrands, colors: selectedColors, sizes: selectedSizes, categories: updatedCategories, priceRange, weightRange });
    };

    return (
        <div>
            <h3 className="text-2xl font-semibold mb-2 text-gray-800 border bg-gray-100 shadow rounded-lg px-2 py-4">
                Filtrer les produits
            </h3>

            <fieldset className="mb-4 border bg-gray-100 shadow rounded-lg px-2 py-4">
                <legend className="text-lg font-medium text-gray-700 cursor-pointer flex justify-between items-center">
                    <button 
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                        aria-expanded={isCategoriesOpen}
                        aria-controls="categories-filter"
                    >
                        Catégories
                    </button>
                </legend>
                {isCategoriesOpen && (
                    <div id="categories-filter" className="grid grid-cols-2 gap-2 mt-2">
                        {categories.map((category, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="checkbox"
                                    id={`category-${index}`}
                                    value={category}
                                    onChange={() => handleCategoryChange(category)}
                                    className="mr-2 text-red-600 focus:ring-red-500"
                                />
                                <label htmlFor={`category-${index}`} className="text-gray-600">{category}</label>
                            </div>
                        ))}
                    </div>
                )}
            </fieldset>

            <fieldset className="mb-4 border bg-gray-100 shadow rounded-lg px-2 py-4">
                <legend className="text-lg font-medium text-gray-700 cursor-pointer flex justify-between items-center">
                    <button 
                        onClick={() => setIsPriceOpen(!isPriceOpen)}
                        aria-expanded={isPriceOpen}
                        aria-controls="price-filter"
                    >
                        Prix
                    </button>
                </legend>
                {isPriceOpen && (
                    <div id="price-filter" className="flex flex-col mt-2">
                        <label htmlFor="price-slider" className="text-sm text-gray-700">Sélectionnez une fourchette de prix :</label>
                        <input
                            type="range"
                            id="price-slider"
                            min="0"
                            max={maxPrice}
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([0, e.target.value])}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            aria-labelledby="price-slider"
                        />
                        <div className="flex justify-between text-gray-600">
                            <span>0 €</span>
                            <span>{priceRange[1]} €</span>
                        </div>
                    </div>
                )}
            </fieldset>

            <fieldset className="mb-4 border bg-gray-100 shadow rounded-lg px-2 py-4">
                <legend className="text-lg font-medium text-gray-700 cursor-pointer flex justify-between items-center">
                    <button 
                        onClick={() => setIsWeightOpen(!isWeightOpen)}
                        aria-expanded={isWeightOpen}
                        aria-controls="weight-filter"
                    >
                        Poids
                    </button>
                </legend>
                {isWeightOpen && (
                    <div id="weight-filter" className="flex flex-col mt-2">
                        <label htmlFor="weight-slider" className="text-sm text-gray-700">Sélectionnez une fourchette de poids :</label>
                        <input
                            type="range"
                            id="weight-slider"
                            min="0"
                            max={maxWeight}
                            value={weightRange[1]}
                            onChange={(e) => setWeightRange([0, e.target.value])}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            aria-labelledby="weight-slider"
                        />
                        <div className="flex justify-between text-gray-600">
                            <span>0 kg</span>
                            <span>{weightRange[1]} kg</span>
                        </div>
                    </div>
                )}
            </fieldset>
        </div>
    );
};

export default ProductFilter;
