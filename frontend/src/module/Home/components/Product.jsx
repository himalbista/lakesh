import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiUrl } from '../../../constants'
import { CartContext } from '../../../context/cart/CartContext'
import { AuthContext } from '../../../context/auth/AuthContext'
import { ToastContext } from '../../../context/toast/ToastContext'

export default function Product({ product }) {
    const { addToCart } = useContext(CartContext)
    const { isAuthenticated } = useContext(AuthContext)
    const { showToast } = useContext(ToastContext)
    const navigate = useNavigate()

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            showToast({ show: true, title: 'Login Required', message: 'Please log in to add items to the cart.', type: 'error' })
            navigate('/login')
            return
        }
        addToCart(product)
    }

    return (
        <div className="rounded-md border" style={{ backgroundColor: '#fafafa' }}>
            <img
                src={product.image ? `${apiUrl}/api/${product.image}` : "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80"}
                alt="Shirt"
                className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
            />
            <div className="p-4">
                <h1 className="inline-flex items-center text-lg font-semibold">{product.title}</h1>
                <p className="mt-3 text-sm text-gray-600">
                    {product.description}
                </p>

                <div className="mt-5 flex items-center space-x-2">
                    <span className="block text-sm font-semibold">Price : </span>
                    <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium line-through">
                        {product.price}
                    </span>
                    <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                        {product.discounted_price}
                    </span>

                </div>
                {product.sizes.length > 0 && <div className="mt-5 flex items-center space-x-2">
                    <span className="block text-sm font-semibold">Size : </span>
                    {product.sizes.map((size, i) => <span key={i} className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
                        {size}
                    </span>
                    )}
                </div>}

                <button
                    onClick={handleAddToCart}
                    type="button"
                    className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    )
}













// import React, { useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiUrl } from '../../../constants';
// import { CartContext } from '../../../context/cart/CartContext';
// import { AuthContext } from '../../../context/auth/AuthContext'; // Import AuthContext

// export default function Product({ product }) {
//     const { addToCart } = useContext(CartContext);
//     const { isAuthenticated } = useContext(AuthContext); // Use AuthContext to get authentication status
//     const navigate = useNavigate(); // Hook for navigation

//     const handleAddToCart = () => {
//         if (isAuthenticated) {
//             addToCart(product); // Add to cart if authenticated
//         } else {
//             navigate('/login'); // Redirect to login page if not authenticated
//         }
//     };

//     return (
//         <div className="rounded-md border" style={{ backgroundColor: '#fafafa' }}>
//             <img
//                 src={product.image ? `${apiUrl}/api/${product.image}` : "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80"}
//                 alt="Product"
//                 className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
//             />
//             <div className="p-4">
//                 <h1 className="inline-flex items-center text-lg font-semibold">{product.title}</h1>
//                 <p className="mt-3 text-sm text-gray-600">
//                     {product.description}
//                 </p>

//                 <div className="mt-5 flex items-center space-x-2">
//                     <span className="block text-sm font-semibold">Price : </span>
//                     <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium line-through">
//                         {product.price}
//                     </span>
//                     <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
//                         {product.discounted_price}
//                     </span>
//                 </div>
                
//                 {product.sizes.length > 0 && (
//                     <div className="mt-5 flex items-center space-x-2">
//                         <span className="block text-sm font-semibold">Size : </span>
//                         {product.sizes.map((size, i) => (
//                             <span key={i} className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
//                                 {size}
//                             </span>
//                         ))}
//                     </div>
//                 )}

//                 <button
//                     onClick={handleAddToCart}
//                     type="button"
//                     className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                 >
//                     Add to Cart
//                 </button>
//             </div>
//         </div>
//     );
// }


// import React, { useContext } from 'react'
// import { apiUrl } from '../../../constants'
// import { CartContext } from '../../../context/cart/CartContext'

// export default function Product({ product }) {
//     const { addToCart } = useContext(CartContext)


//     return (
//         <div className="rounded-md border" style={{ backgroundColor: '#fafafa' }}>
//             <img
//                 src={product.image ? `${apiUrl}/api/${product.image}` : "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1372&q=80"}
//                 alt="Shirt"
//                 className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
//             />
//             <div className="p-4">
//                 <h1 className="inline-flex items-center text-lg font-semibold">{product.title}</h1>
//                 <p className="mt-3 text-sm text-gray-600">
//                     {product.description}
//                 </p>

//                 <div className="mt-5 flex items-center space-x-2">
//                     <span className="block text-sm font-semibold">Price : </span>
//                     <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium line-through">
//                         {product.price}
//                     </span>
//                     <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
//                         {product.discounted_price}
//                     </span>

//                 </div>
//                 {product.sizes.length > 0 && <div className="mt-5 flex items-center space-x-2">
//                     <span className="block text-sm font-semibold">Size : </span>
//                     {product.sizes.map((size, i) => <span className="block cursor-pointer rounded-md border border-gray-300 p-1 px-2 text-xs font-medium">
//                         {size}
//                     </span>
//                     )}
//                 </div>}

//                 <button
//                     onClick={() => addToCart(product)}
//                     type="button"
//                     className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                 >
//                     Add to Cart
//                 </button>
//             </div>
//         </div>
//     )
// }
