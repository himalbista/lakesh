import React, { useContext, useEffect } from 'react'
import { ArrowRight } from 'lucide-react'
import { object, string } from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { AuthContext } from '../../../context/auth/AuthContext';
import { ToastContext } from '../../../context/toast/ToastContext';
import { useNavigate, Link } from 'react-router-dom';
import Logo from "../../../assets/logobizz.png";


const apiUrl = import.meta.env.VITE_API_URL;

export default function Login() {
    const { login } = useContext(AuthContext)
    const { showToast } = useContext(ToastContext);

    const navigate = useNavigate();

    let userSchema = object({
        email: string().required().email(),
        password: string().required().min(6),
    });

    const formik = useFormik({
        validationSchema: userSchema,
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: (data) => {
            console.log(data);
            loginApiCall(data)
        }
    })

    const { errors, getFieldProps } = formik

    useEffect(() => {
        console.log(errors);
    }, [errors])

    const loginApiCall = (data) => {
        console.log(apiUrl);
        axios.post(`${apiUrl}/api/users/login`, data).then(res => {
            console.log(res.data);
            login(res.data)
            showToast({ show: true, title: 'Welcome Back', message: 'Login Success', type: 'success' })
            navigate('/')
        }).catch(err => {
            showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

            console.log(err);
        })
    }

    return (
        <section>
            <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                    <div className="mb-2 flex justify-center">
                        <span className="mb-2 flex justify-center items-center">
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
                            <span className="font-bold">Bite Buzz</span>
                        </span>
                    </div>
                    <h2 className="text-center text-2xl font-bold leading-tight text-black">
                        Log In To Your Account
                    </h2>

                    <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
                        <div className="space-y-5">

                            <div>
                                <label htmlFor="email" className="text-base font-medium text-gray-900">
                                    {' '}
                                    Email address{' '}
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="email"
                                        placeholder="Email"
                                        id="email"
                                        {...getFieldProps('email')}
                                    ></input>
                                </div>
                                {errors.email &&
                                    <label className="text-sm text-red-700 ">
                                        {errors.email}
                                    </label>
                                }
                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Password{' '}
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                        type="password"
                                        placeholder="Password"
                                        id="password"
                                        {...getFieldProps('password')}
                                    ></input>
                                </div>
                                {errors.password &&
                                    <label className="text-sm text-red-700 ">
                                        {errors.password}
                                    </label>
                                }
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                >
                                    Login <ArrowRight className="ml-2" size={16} />
                                </button>
                            </div>
                        </div>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-black font-semibold">
                                Sign up first
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}




// import React, { useContext, useEffect } from 'react'
// import { ArrowRight } from 'lucide-react'
// import { object, string, ref } from 'yup';
// import { useFormik } from 'formik';
// import axios from 'axios';
// import { AuthContext } from '../../../context/auth/AuthContext';
// import { ToastContext } from '../../../context/toast/ToastContext';
// import { useNavigate } from 'react-router-dom';

// const apiUrl = import.meta.env.VITE_API_URL;

// export default function Login() {
//     const { login } = useContext(AuthContext)
//     const { showToast } = useContext(ToastContext);

//     const navigate = useNavigate();

//     let userSchema = object({
//         email: string().required().email(),
//         password: string().required().min(6),
//     });

//     const formik = useFormik({
//         validationSchema: userSchema,
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         onSubmit: (data) => {
//             console.log(data);
//             loginApiCall(data)
//         }
//     })

//     const { errors, getFieldProps } = formik

//     useEffect(() => {
//         console.log(errors);
//     }, [errors])

//     const loginApiCall = (data) => {
//         console.log(apiUrl);
//         axios.post(`${apiUrl}/api/users/login`, data).then(res => {
//             console.log(res.data);
//             login(res.data)
//             showToast({ show: true, title: 'Welcome Back', message: 'Login Success', type: 'success' })
//             navigate('/')
//         }).catch(err => {
//             showToast({ show: true, title: 'Error', message: err.response?.data.error || 'Server Error', type: 'error' })

//             console.log(err);
//         })
//     }
//     return (
//         <section>
//             <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
//                 <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
//                     <div className="mb-2 flex justify-center">
//                     <span className="mb-2 flex justify-center items-center">
//               <svg
//                 width="40"
//                 height="40"
//                 fill="#000000"
//                 viewBox="0 0 56 56"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//                 <g
//                   id="SVGRepo_tracerCarrier"
//                   stroke-linecap="round"
//                   stroke-linejoin="round"
//                 ></g>
//                 <g id="SVGRepo_iconCarrier">
//                   <path d="M 6.6718 37.4336 C 5.0078 37.4336 4.5624 38.5820 5.4765 39.8711 L 10.7265 47.3242 C 11.5000 48.4258 12.6249 48.4023 13.3749 47.3242 L 18.6249 39.8477 C 19.5156 38.5820 19.0937 37.4336 17.4296 37.4336 L 14.1484 37.4336 L 14.1484 19.8086 C 14.1484 15.7539 16.6093 13.1992 19.9843 13.1992 C 23.3827 13.1992 25.9140 15.7070 25.9140 19.8086 L 25.9140 35.8633 C 25.9140 42.6601 30.1562 46.9726 36.0156 46.9726 C 41.8515 46.9726 46.0468 42.6601 46.0468 35.8633 L 46.0468 18.5664 L 49.3280 18.5664 C 50.9921 18.5664 51.4376 17.4180 50.5232 16.1289 L 45.2968 8.6523 C 44.5468 7.5977 43.4218 7.5742 42.6484 8.6523 L 37.3984 16.1055 C 36.4609 17.4180 36.9062 18.5664 38.5937 18.5664 L 41.8515 18.5664 L 41.8515 36.1914 C 41.8515 40.2226 39.4140 42.7773 36.0156 42.7773 C 32.6171 42.7773 30.0859 40.2695 30.0859 36.1914 L 30.0859 20.1367 C 30.0859 13.3398 25.8437 9.0273 19.9843 9.0273 C 14.1484 9.0273 9.9531 13.3398 9.9531 20.1367 L 9.9531 37.4336 Z"></path>
//                 </g>
//               </svg>
//               <span className="font-bold">Manly</span>
//             </span>
//                     </div>
//                     <h2 className="text-center text-2xl font-bold leading-tight text-black">
//                         Log In To Your Account
//                     </h2>

//                     <form noValidate onSubmit={formik.handleSubmit} className="mt-8">
//                         <div className="space-y-5">

//                             <div>
//                                 <label htmlFor="email" className="text-base font-medium text-gray-900">
//                                     {' '}
//                                     Email address{' '}
//                                 </label>
//                                 <div className="mt-2">
//                                     <input
//                                         className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                                         type="email"
//                                         placeholder="Email"
//                                         id="email"
//                                         {...getFieldProps('email')}
//                                     ></input>
//                                 </div>
//                                 {
//                                     errors.email &&
//                                     <label className="text-sm text-red-700 ">
//                                         {errors.email}
//                                     </label>
//                                 }
//                             </div>
//                             <div>
//                                 <div className="flex items-center justify-between">
//                                     <label htmlFor="password" className="text-base font-medium text-gray-900">
//                                         {' '}
//                                         Password{' '}
//                                     </label>
//                                 </div>
//                                 <div className="mt-2">
//                                     <input
//                                         className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
//                                         type="password"
//                                         placeholder="Password"
//                                         id="password"
//                                         {...getFieldProps('password')}
//                                     ></input>
//                                 </div>
//                                 {
//                                     errors.password &&
//                                     <label className="text-sm text-red-700 ">
//                                         {errors.password}
//                                     </label>
//                                 }
//                             </div>

//                             <div>
//                                 <button
//                                     type="submit"
//                                     className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
//                                 >
//                                     Login <ArrowRight className="ml-2" size={16} />
//                                 </button>
//                             </div>
//                         </div>
//                     </form>

//                 </div>
//             </div>
//         </section>
//     )
// }
