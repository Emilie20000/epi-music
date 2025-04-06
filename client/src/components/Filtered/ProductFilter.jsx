import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

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
    const [isPriceOpen, setIsPriceOpen] = useState(false);
    const [isEditingMin, setIsEditingMin] = useState(false);
    const [isEditingMax, setIsEditingMax] = useState(false);
    const [minPriceInput, setMinPriceInput] = useState(priceRange[0]);
    const [maxPriceInput, setMaxPriceInput] = useState(priceRange[1]);
    const [isBrandsOpen, setIsBrandsOpen] = useState(true);
    const [isColorsOpen, setIsColorsOpen] = useState(true);
    const [isSizesOpen, setIsSizesOpen] = useState(true);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
    const [isWeightOpen, setIsWeightOpen] = useState(true);

    const { category } = useParams();

    const { isDark } = useTheme();
    const BgColor = isDark ? "bg-slate-600" : "bg-gray-100";
    const textColor = isDark ? "text-slate-200" : "text-gray-700";
    const borderColor = isDark ?  "border-slate-600" : "border-gray-100";
    const subTextColor = isDark ?  "text-slate-300" : "text-gray-600";

    const handleCategoryChange = (category) => {
        const updatedCategories = selectedCategories.includes(category)
            ? selectedCategories.filter((c) => c !== category)
            : [...selectedCategories, category];

        setSelectedCategories(updatedCategories);
        onFiltersChange({
            brands: selectedBrands,
            colors: selectedColors,
            sizes: selectedSizes,
            categories: updatedCategories,
            priceRange,
            weightRange,
        });
    };

    const handleBrandChange = (brand) => {
        const updatedBrands = selectedBrands.includes(brand)
            ? selectedBrands.filter((b) => b !== brand)
            : [...selectedBrands, brand];

        setSelectedBrands(updatedBrands);
        onFiltersChange({
            brands: updatedBrands,
            colors: selectedColors,
            sizes: selectedSizes,
            categories: selectedCategories,
            priceRange,
            weightRange,
        });
    };

    const handleMinPriceChange = (e) => {
        const value = Math.max(0, Math.min(maxPrice, e.target.value));
        setMinPriceInput(value);
        handlePriceRangeChange([value, priceRange[1]]);
    };

    const handleMaxPriceChange = (e) => {
        const value = Math.max(minPriceInput, Math.min(maxPrice, e.target.value));
        setMaxPriceInput(value);
        handlePriceRangeChange([priceRange[0], value]);
    };

    const handleColorChange = (color) => {
        const updatedColors = selectedColors.includes(color)
            ? selectedColors.filter((c) => c !== color)
            : [...selectedColors, color];

        setSelectedColors(updatedColors);
        onFiltersChange({
            brands: selectedBrands,
            colors: updatedColors,
            sizes: selectedSizes,
            categories: selectedCategories,
            priceRange,
            weightRange,
        });
    };

    const handleSizeChange = (size) => {
        const updatedSizes = selectedSizes.includes(size)
            ? selectedSizes.filter((s) => s !== size)
            : [...selectedSizes, size];

        setSelectedSizes(updatedSizes);
        onFiltersChange({
            brands: selectedBrands,
            colors: selectedColors,
            sizes: updatedSizes,
            categories: selectedCategories,
            priceRange,
            weightRange,
        });
    };

    const handlePriceRangeChange = (range) => {
        setPriceRange(range);
        onFiltersChange({
            brands: selectedBrands,
            colors: selectedColors,
            sizes: selectedSizes,
            categories: selectedCategories,
            priceRange: range,
            weightRange,
        });
    };

    const handleWeightRangeChange = (range) => {
        setWeightRange(range);
        onFiltersChange({
            brands: selectedBrands,
            colors: selectedColors,
            sizes: selectedSizes,
            categories: selectedCategories,
            priceRange,
            weightRange: range,
        });
    };

    return (
        <div role="region" aria-label="Filtrer les produits">
            <h3 className={`text-2xl font-semibold mb-2 ${textColor} border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`}>
                Filtrer les produits
            </h3>

            {categories.length > 0 && category === undefined && (
                <div className={`mb-2 border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`}>
                    <h4
                        className={`text-lg font-medium ${textColor}  cursor-pointer flex justify-between items-center"`}
                        onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                        aria-label="Filtrer par catégories"
                    >
                        Catégories
                        <span aria-hidden="true">
                            {isCategoriesOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </span>
                    </h4>
                    {isCategoriesOpen && (
                        <div className="grid grid-cols-2 gap-2 mt-2" role="group" aria-label="Options de catégories">
                            {categories.map((category, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={category}
                                        onChange={() =>
                                            handleCategoryChange(category)
                                        }
                                        className="mr-2 text-red-600 focus:ring-red-500"
                                        aria-label={`Filtrer par catégorie ${category}`}
                                    />
                                    <p className={`${subTextColor}`}>{category}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {brands.length > 0 && (
                <div className={`mb-2 border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`}  role="region" aria-label="Filtrer par marques">
                    <h4
                        className={`text-lg font-medium ${textColor} cursor-pointer flex justify-between items-center`}
                        onClick={() => setIsBrandsOpen(!isBrandsOpen)}
                        aria-label="Filtrer par marques"
                    >
                        Marques
                        <span aria-hidden="true">
                            {isBrandsOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </span>
                    </h4>
                    {isBrandsOpen && (
                        <div className="grid grid-cols-2 gap-2 mt-2" role="group" aria-label="Options de marques">
                            {brands.map((brand, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={brand}
                                        onChange={() =>
                                            handleBrandChange(brand)
                                        }
                                        className="mr-2 text-red-600 focus:ring-red-500"
                                        aria-label={`Filtrer par marque ${brand}`}
                                    />
                                    <p className={`${subTextColor}`}>{brand}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {colors.length > 0 && (
                <div className={`mb-2 border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`}  role="region" aria-label="Filtrer par couleurs">
                    <h4
                        className={`text-lg font-medium ${textColor} cursor-pointer flex justify-between items-center`}
                        onClick={() => setIsColorsOpen(!isColorsOpen)}
                        aria-label="Filtrer par couleurs"
                    >
                        Couleurs
                        <span aria-hidden="true">
                {isColorsOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5"
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                )}
            </span>
                    </h4>
                    {isColorsOpen && (
                        <div className="grid grid-cols-2 gap-2 mt-2" role="group" aria-label="Options de couleurs">
                            {colors.map((color, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={color}
                                        onChange={() => handleColorChange(color)}
                                        className={`mr-2 text-red-600 focus:ring-red-500 border ${subTextColor}`}
                                        aria-label={`Filtrer par couleur ${color}`}
                                    />
                                    <p
                                        className={`${subTextColor}`}>{color}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {sizes.length > 0 && (
                <div className={`mb-2 border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`} role="region" aria-label="Filtrer par tailles">
                    <h4
                        className={`text - lg font-medium ${textColor} cursor-pointer flex justify-between items-center`}
                        onClick={() => setIsSizesOpen(!isSizesOpen)}
                        aria-label="Filtrer par tailles"
                    >
                        Tailles
                        <span aria-hidden="true">
                            {isSizesOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </span>
                    </h4>
                    {isSizesOpen && (
                        <div className="grid grid-cols-2 gap-2 mt-2" role="group" aria-label="Options de tailles">
                            {sizes.map((size, index) => (
                                <div key={index} className="flex items-center">
                                    <input
                                        type="checkbox"
                                        value={size}
                                        onChange={() => handleSizeChange(size)}
                                        className="mr-2 text-red-600 focus:ring-red-500"
                                        aria-label={`Filtrer par taille ${size}`}
                                    />
                                    <p className={`${subTextColor}`}>{size}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <div className={`mb-2 border ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`}  role="region" aria-label="Filtrer par prix">
                <h4
                    className={`text-lg font-medium ${textColor} cursor-pointer flex justify-between items-center`}
                    onClick={() => setIsPriceOpen(!isPriceOpen)}
                    aria-label="Afficher ou masquer le filtre de prix"
                >
                    Prix
                    <span  aria-hidden="true">
            {isPriceOpen ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </span>
                </h4>
                {isPriceOpen && (
                    <div className="flex flex-col mt-2" role="group" aria-label="Options de prix">
                        <div className="flex items-center mb-2">
                            <input
                                type="range"
                                min="0"
                                max={maxPrice}
                                value={priceRange[1]}
                                onChange={(e) =>
                                    handlePriceRangeChange([0, e.target.value])
                                }
                                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                aria-label="Sélectionnez le prix maximum"
                            />
                        </div>
                        <div className="flex items-center">
                            {isEditingMin ? (
                                <input
                                    type="number"
                                    value={minPriceInput}
                                    onChange={handleMinPriceChange}
                                    onBlur={() => {
                                        setIsEditingMin(false);
                                        handlePriceRangeChange([
                                            minPriceInput,
                                            priceRange[1],
                                        ]);
                                    }}
                                    className="w-20 text-gray-600 border border-gray-300 rounded px-2 py-1"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.target.blur();
                                        }
                                    }}
                                    aria-label="Prix minimum"
                                />
                            ) : (
                                <span
                                    className={`ml-4 ${subTextColor} cursor-pointer`}
                                    onClick={() => setIsEditingMin(true)}
                                    aria-label="Modifier le prix minimum"
                                >
                        {priceRange[0]} €
                    </span>
                            )}
                            <span className={`mx-2 ${subTextColor}`} aria-hidden="true">-</span>
                            {isEditingMax ? (
                                <input
                                    type="number"
                                    value={maxPriceInput}
                                    onChange={handleMaxPriceChange}
                                    onBlur={() => {
                                        setIsEditingMax(false);
                                        handlePriceRangeChange([
                                            priceRange[0],
                                            maxPriceInput,
                                        ]);
                                    }}
                                    className="w-20 text-gray-600 border border-gray-300 rounded px-2 py-1"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.target.blur();
                                        }
                                    }}
                                    aria-label="Prix maximum"
                                />
                            ) : (
                                <span
                                    className={`ml-4 ${subTextColor} cursor-pointer`}
                                    onClick={() => setIsEditingMax(true)}
                                    aria-label="Modifier le prix maximum"
                                >
                        {priceRange[1]} €
                    </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className={`mb - 2 border  ${borderColor} ${BgColor} shadow rounded-lg px-2 py-4`}  role="region" aria-label="Filtrer par poids">
                <h4
                    className={`text-lg font-medium ${subTextColor} cursor-pointer flex justify-between items-center`}
                    onClick={() => setIsWeightOpen(!isWeightOpen)}
                    aria-label="Afficher ou masquer le filtre de poids"
                >
                    Poids
                    <span aria-hidden="true">
            {isWeightOpen ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            )}
        </span>
                </h4>
                {isWeightOpen && (
                    <div className="flex items-center mt-2" role="group" aria-label="Options de tailles">
                        <input
                            type="range"
                            min="0"
                            max={maxWeight}
                            value={weightRange[1]}
                            onChange={(e) =>
                                handleWeightRangeChange([0, e.target.value])
                            }
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            aria-label={`Filtrer par taille ${size}`}
                        />
                        <span className={`ml-4 ${subTextColor}`}>
                {weightRange[0]} - {weightRange[1]} kg
            </span>
                    </div>
                )}
            </div>

        </div>
    );
};

export default ProductFilter;
