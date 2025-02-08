import React, { useContext, useEffect, useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/auth/AuthContext';
import { CartContext } from '../../../context/cart/CartContext';
import { ToastContext } from "../../../context/toast/ToastContext";
import Logo from "../../../assets/logobizz.png";


const menuItems = [
    {
        name: 'Dashboard',
        href: '/',
        role: [0, 1]
    },
    {
        name: 'Admin Panel',
        href: '/admin',
        role: [1]
    },
];

const Navbar = () => {
    const { isAuthenticated, user, logout } = useContext(AuthContext);
    const { cart, getCarts } = useContext(CartContext);
    const { showToast } = useContext(ToastContext);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userMenuItems, setUserMenuItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State for search input

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const goToPath = (path) => {
        navigate(path);
    };

    useEffect(() => {
        if (user && user._id) {
            const filteredMenu = menuItems.filter(menu => menu.role.includes(user.role));
            setUserMenuItems(filteredMenu);
            getCarts();
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        showToast({ show: true, title: 'Success', message: 'Logged out successfully.', type: 'success' });
        navigate('/');
    };

    const handleSearch = (event) => {
        event.preventDefault();
        // Perform search action here
        console.log('Search query:', searchQuery);
    };

    return (
   <div className="relative w-full" style={{ backgroundColor: '#fafafa' }}>
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-5 pb-5 sm:px-6 lg:px-8">
                <div className="inline-flex items-center space-x-2">
                <Link to="/" className="inline-flex items-center space-x-2">
                    <span>
                        {/* <svg
                            width="40"
                            height="40"
                            fill="#000000"
                            viewBox="0 0 56 56"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                                id="SVGRepo_tracerCarrier"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                                <path d="M 6.6718 37.4336 C 5.0078 37.4336 4.5624 38.5820 5.4765 39.8711 L 10.7265 47.3242 C 11.5000 48.4258 12.6249 48.4023 13.3749 47.3242 L 18.6249 39.8477 C 19.5156 38.5820 19.0937 37.4336 17.4296 37.4336 L 14.1484 37.4336 L 14.1484 19.8086 C 14.1484 15.7539 16.6093 13.1992 19.9843 13.1992 C 23.3827 13.1992 25.9140 15.7070 25.9140 19.8086 L 25.9140 35.8633 C 25.9140 42.6601 30.1562 46.9726 36.0156 46.9726 C 41.8515 46.9726 46.0468 42.6601 46.0468 35.8633 L 46.0468 18.5664 L 49.3280 18.5664 C 50.9921 18.5664 51.4376 17.4180 50.5232 16.1289 L 45.2968 8.6523 C 44.5468 7.5977 43.4218 7.5742 42.6484 8.6523 L 37.3984 16.1055 C 36.4609 17.4180 36.9062 18.5664 38.5937 18.5664 L 41.8515 18.5664 L 41.8515 36.1914 C 41.8515 40.2226 39.4140 42.7773 36.0156 42.7773 C 32.6171 42.7773 30.0859 40.2695 30.0859 36.1914 L 30.0859 20.1367 C 30.0859 13.3398 25.8437 9.0273 19.9843 9.0273 C 14.1484 9.0273 9.9531 13.3398 9.9531 20.1367 L 9.9531 37.4336 Z"></path>
                            </g>
                        </svg> */}
                                  <img 
  src={Logo} 
  alt="Image description" 
  width="150" 
  height="150" 
/> 
                    </span>
                    <span className="font-bold">Bite Buzz</span>
                    </Link>
                </div>
                <div className="hidden grow items-start lg:flex">
                    <ul className="ml-12 mt-1 mb-1 inline-flex space-x-12">
                        {userMenuItems.map((item) => (
                            <li key={item.name}>
                                <Link
                                    to={item.href}
                                    className="inline-flex items-center text-base font-semibold text-gray-800 hover:text-gray-600"
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    {/* Search bar */}
                    <form onSubmit={handleSearch} className="ml-12 flex items-center justify-center">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="px-3 py-1 border rounded-md text-gray-800 "
                        />
                    </form>
                </div>
                {isAuthenticated ? (
                    <div className="hidden space-x-2 lg:flex items-center">
                        <span>{user.name}</span>
                        {user.role === 0 && (
                            <span className='cursor-pointer' onClick={() => navigate('/users/cart')}>
                                <span className="text-xs px-3 bg-red-200 text-red-800 rounded-full">{cart?.products?.length || 0}</span>
                                <ShoppingCart />
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            type="button"
                            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <div className="hidden space-x-2 lg:block">
                        <button
                            onClick={() => goToPath('/signup')}
                            type="button"
                            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Sign Up
                        </button>
                        <button
                            onClick={() => goToPath('/login')}
                            type="button"
                            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Log In
                        </button>
                    </div>
                )}

                <div className="lg:hidden">
                    <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
                </div>
                {isMenuOpen && (
                    <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
                        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-5 pb-6 pt-5">
                                <div className="flex items-center justify-between">
                                    <div className="inline-flex items-center space-x-2">
                                        <span>
                                            <svg
                                                width="30"
                                                height="30"
                                                viewBox="0 0 50 56"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                                                    fill="black"
                                                />
                                            </svg>
                                        </span>
                                        <span className="font-bold">DevUI</span>
                                    </div>
                                    <div className="-mr-2">
                                        <button
                                            type="button"
                                            onClick={toggleMenu}
                                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                        >
                                            <span className="sr-only">Close menu</span>
                                            <X className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <nav className="grid gap-y-4">
                                        {menuItems.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                                            >
                                                <span className="ml-3 text-base font-medium text-gray-900">
                                                    {item.name}
                                                </span>
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                                <div className="mt-2 space-y-2">
                                    <button
                                        onClick={() => goToPath('/signup')}
                                        type="button"
                                        className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Sign up
                                    </button>
                                    <button
                                        onClick={() => goToPath('/login')}
                                        type="button"
                                        className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                                    >
                                        Log In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;



// import React, { useContext, useEffect } from 'react'
// import { Menu, X, ShoppingCart } from 'lucide-react'
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../../context/auth/AuthContext';
// import { CartContext } from '../../../context/cart/CartContext';
// import { ToastContext } from "../../../context/toast/ToastContext"; // Import ToastContext

// const menuItems = [
//     {
//         name: 'Home',
//         href: '/',
//         role: [0, 1]
//     },
//     {
//         name: 'About',
//         href: '/',
//         role: [0, 1]
//     },
//     {
//         name: 'Contact',
//         href: '/',
//         role: [0, 1]
//     },
//     {
//         name: 'Dashboard',
//         href: '/admin',
//         role: [1]
//     },
// ]

// const Navbar = () => {

//     const { isAuthenticated, user, logout } = useContext(AuthContext)
//     const { cart, getCarts } = useContext(CartContext)
//     const { showToast } = useContext(ToastContext); // Use ToastContext

//     const [isMenuOpen, setIsMenuOpen] = React.useState(false)
//     const [userMenuItems, setUserMenuItems] = React.useState([])

//     const navigate = useNavigate();
//     const toggleMenu = () => {
//         setIsMenuOpen(!isMenuOpen)
//     }

//     const goToPath = (path) => {
//         navigate(path);
//     };

//     useEffect(() => {
//         if (user && user._id) {
//             const filteredMenu = menuItems.filter(menu => menu.role.includes(user.role))
//             setUserMenuItems(filteredMenu)
//             getCarts()
//         }
//     }, [user])

//     const handleLogout = () => {
//         logout();
//         showToast({ show: true, title: 'Success', message: 'Logged out successfully.', type: 'success' }); // Trigger toast
//         navigate('/'); // Redirect to home page after logout
//     };

//     return (
//         <div className="relative w-full bg-white">
//             <div className="mx-auto flex max-w-7xl items-center justify-between px-4 pt-6 pb-1 sm:px-6 lg:px-8">
//                 <div className="inline-flex items-center space-x-2">
//                     <span>
//                         <svg
//                             width="40"
//                             height="40"
//                             fill="#000000"
//                             viewBox="0 0 56 56"
//                             xmlns="http://www.w3.org/2000/svg"
//                         >
//                             <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//                             <g
//                                 id="SVGRepo_tracerCarrier"
//                                 stroke-linecap="round"
//                                 stroke-linejoin="round"
//                             ></g>
//                             <g id="SVGRepo_iconCarrier">
//                                 <path d="M 6.6718 37.4336 C 5.0078 37.4336 4.5624 38.5820 5.4765 39.8711 L 10.7265 47.3242 C 11.5000 48.4258 12.6249 48.4023 13.3749 47.3242 L 18.6249 39.8477 C 19.5156 38.5820 19.0937 37.4336 17.4296 37.4336 L 14.1484 37.4336 L 14.1484 19.8086 C 14.1484 15.7539 16.6093 13.1992 19.9843 13.1992 C 23.3827 13.1992 25.9140 15.7070 25.9140 19.8086 L 25.9140 35.8633 C 25.9140 42.6601 30.1562 46.9726 36.0156 46.9726 C 41.8515 46.9726 46.0468 42.6601 46.0468 35.8633 L 46.0468 18.5664 L 49.3280 18.5664 C 50.9921 18.5664 51.4376 17.4180 50.5232 16.1289 L 45.2968 8.6523 C 44.5468 7.5977 43.4218 7.5742 42.6484 8.6523 L 37.3984 16.1055 C 36.4609 17.4180 36.9062 18.5664 38.5937 18.5664 L 41.8515 18.5664 L 41.8515 36.1914 C 41.8515 40.2226 39.4140 42.7773 36.0156 42.7773 C 32.6171 42.7773 30.0859 40.2695 30.0859 36.1914 L 30.0859 20.1367 C 30.0859 13.3398 25.8437 9.0273 19.9843 9.0273 C 14.1484 9.0273 9.9531 13.3398 9.9531 20.1367 L 9.9531 37.4336 Z"></path>
//                             </g>
//                         </svg>
//                     </span>
//                     <span className="font-bold">Manly</span>
//                 </div>
//                 <div className="hidden grow items-start lg:flex">
//                     <ul className="ml-12 inline-flex space-x-12">
//                         {userMenuItems.map((item) => (
//                             <li key={item.name}>
//                                 <Link
//                                     to={item.href}
//                                     className="inline-flex items-center text-base font-semibold text-gray-800 hover:text-gray-600"
//                                 >
//                                     {item.name}
//                                 </Link>
//                             </li>
//                         ))}
//                     </ul>
//                 </div>
//                 {isAuthenticated ? (
//                     <div className="hidden space-x-2 lg:flex items-center">
//                         <span>{user.name}</span>
//                         {user.role === 0 && (
//                             <span className='cursor-pointer' onClick={() => navigate('/users/cart')}>
//                                 <span className="text-xs px-3 bg-red-200 text-red-800 rounded-full">{cart?.products?.length || 0}</span>
//                                 <ShoppingCart />
//                             </span>
//                         )}
//                         <button
//                             onClick={handleLogout}
//                             type="button"
//                             className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="hidden space-x-2 lg:block">
//                         <button
//                             onClick={() => goToPath('/signup')}
//                             type="button"
//                             className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                         >
//                             Sign Up
//                         </button>
//                         <button
//                             onClick={() => goToPath('/login')}
//                             type="button"
//                             className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                         >
//                             Log In
//                         </button>
//                     </div>
//                 )}

//                 <div className="lg:hidden">
//                     <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
//                 </div>
//                 {isMenuOpen && (
//                     <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
//                         <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
//                             <div className="px-5 pb-6 pt-5">
//                                 <div className="flex items-center justify-between">
//                                     <div className="inline-flex items-center space-x-2">
//                                         <span>
//                                             <svg
//                                                 width="30"
//                                                 height="30"
//                                                 viewBox="0 0 50 56"
//                                                 fill="none"
//                                                 xmlns="http://www.w3.org/2000/svg"
//                                             >
//                                                 <path
//                                                     d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
//                                                     fill="black"
//                                                 />
//                                             </svg>
//                                         </span>
//                                         <span className="font-bold">DevUI</span>
//                                     </div>
//                                     <div className="-mr-2">
//                                         <button
//                                             type="button"
//                                             onClick={toggleMenu}
//                                             className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                                         >
//                                             <span className="sr-only">Close menu</span>
//                                             <X className="h-6 w-6" aria-hidden="true" />
//                                         </button>
//                                     </div>
//                                 </div>
//                                 <div className="mt-6">
//                                     <nav className="grid gap-y-4">
//                                         {menuItems.map((item) => (
//                                             <Link
//                                                 key={item.name}
//                                                 to={item.href}
//                                                 className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
//                                             >
//                                                 <span className="ml-3 text-base font-medium text-gray-900">
//                                                     {item.name}
//                                                 </span>
//                                             </Link>
//                                         ))}
//                                     </nav>
//                                 </div>
//                                 <div className="mt-2 space-y-2">
//                                     <button
//                                         onClick={() => goToPath('/signup')}
//                                         type="button"
//                                         className="w-full rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                                     >
//                                         Sign up
//                                     </button>
//                                     <button
//                                         onClick={() => goToPath('/login')}
//                                         type="button"
//                                         className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                                     >
//                                         Log In
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     )
// }

// export default Navbar
