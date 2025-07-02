import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    // Function to handle custom translations
    const handleCustomTranslation = () => {
      const elements = document.querySelectorAll(
        "[data-google-translate-custom]"
      );
      elements.forEach((element) => {
        const customTranslation = element.getAttribute(
          "data-google-translate-custom"
        );
        if (document.documentElement.lang === "kn" && customTranslation) {
          // Store original text if not already stored
          if (!element.hasAttribute("data-original-text")) {
            element.setAttribute("data-original-text", element.textContent);
          }
          element.textContent = customTranslation;
        } else {
          // Restore original text if available
          const originalText = element.getAttribute("data-original-text");
          if (originalText) {
            element.textContent = originalText;
          }
        }
      });
    };

    // Initial check
    handleCustomTranslation();

    // Create an observer to watch for language changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "lang") {
          handleCustomTranslation();
        }
      });
    });

    // Start observing the document with the configured parameters
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilterProducts(productsCopy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-8 text-xl text-black flex items-center cursor-pointer gap-2"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium text-black">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3 text-black"
                type="checkbox"
                value={"Kisankraft"}
                onChange={toggleCategory}
              />
              Kisankraft
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 text-black"
                type="checkbox"
                value={"Really"}
                onChange={toggleCategory}
              />
              <span class="notranslate" data-google-translate-custom="ರಿಯಲಿ">
                Really
              </span>
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 text-black"
                type="checkbox"
                value={"Mitsuyama"}
                onChange={toggleCategory}
              />
              Mitsuyama
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 text-black"
                type="checkbox"
                value={"Others"}
                onChange={toggleCategory}
              />
              Others
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium text-black">SUB CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3 text-black"
                type="checkbox"
                value={"Machine"}
                onChange={toggleSubCategory}
              />
              Machine
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 text-black"
                type="checkbox"
                value={"Parts"}
                onChange={toggleSubCategory}
              />
              Parts
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 text-black"
                type="checkbox"
                value={"Others"}
                onChange={toggleSubCategory}
              />
              Others
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-8 py-8">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
        </div>

        {/* Map Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 gap-y-6 p-20">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
