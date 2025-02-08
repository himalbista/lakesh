import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails() {
  const { productId } = useParams(); // Get the productId from the URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Fetch the product details using the productId
    axios.get(`/api/product/${productId}`)
      .then(response => {
        setProduct(response.data); // Set the product data
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-16">
      <div className="pt-8">
        <div className="flex items-center">
          <ol className="flex w-full items-center overflow-hidden">
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a href="/">Home</a>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a className="capitalize" href="/products">Products</a>
            </li>
            <li className="text-body mt-0.5 text-base">/</li>
            <li className="text-body hover:text-heading px-2.5 text-sm transition duration-200 ease-in first:pl-0 last:pr-0">
              <a className="capitalize" href="#">{product.title}</a>
            </li>
          </ol>
        </div>
      </div>

      <div className="block grid-cols-9 items-start gap-x-10 pb-10 pt-7 lg:grid lg:pb-14 xl:gap-x-14 2xl:pb-20">
        {/* Product Images */}
        <div className="col-span-5 grid grid-cols-2 gap-2.5">
          {product.images?.map((image, index) => (
            <div key={index} className="col-span-1 transition duration-150 ease-in hover:opacity-90">
              <img
                src={image}
                alt={product.title}
                className="w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Product Information */}
        <div className="col-span-4 pt-8 lg:pt-0">
          <div className="mb-7 border-b border-gray-300 pb-7">
            <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">
              {product.title}
            </h2>
            <p className="text-body text-sm leading-6  lg:text-base lg:leading-8">
              {product.description}
            </p>
            <div className="mt-5 flex items-center">
              <div className="text-heading pr-2 text-base font-bold md:pr-0 md:text-xl lg:pr-2 lg:text-2xl 2xl:pr-0 2xl:text-4xl">
                ${product.price}
              </div>
              {product.discounted_price && (
                <span className="font-segoe pl-2 text-sm text-gray-400 line-through md:text-base lg:text-lg xl:text-xl">
                  ${product.discounted_price}
                </span>
              )}
            </div>
          </div>

          {/* Size Selector */}
          <div className="border-b border-gray-300 pb-3">
            <div className="mb-4">
              <h3 className="text-heading mb-2.5 text-base font-semibold capitalize md:text-lg">
                Size
              </h3>
              <ul className="colors -mr-3 flex flex-wrap">
                {product.sizes?.map(size => (
                  <li
                    key={size}
                    className="text-heading mb-2 mr-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded border border-gray-100 p-1 text-xs font-semibold uppercase transition duration-200 ease-in-out hover:border-black md:mb-3 md:mr-3 md:h-11 md:w-11 md:text-sm"
                  >
                    {size}
                  </li>
                ))}
              </ul>
            </div>

            {/* Add to Cart Button */}
            <div className="space-s-4 3xl:pr-48 flex items-center gap-2 border-b border-gray-300 py-8  md:pr-32 lg:pr-12 2xl:pr-32">
              <button
                type="button"
                className="h-11 w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
