import React, { useEffect, useCallback } from "react";
import { useForm } from 'react-hook-form';

import { GoogleButton } from 'react-google-button'
import { UserAuth } from '../context/AuthContext'
import '../static/css/Login.css'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function LoginPage() {
    document.title = "Login";
    // scroll to top 
    window.scrollTo(0, 0);
    const MySwal = withReactContent(Swal)

    const { googleSignIn, signIn, forgotPassword } = UserAuth();
    const handleGoogleSignIn = async () => {
        try {
            const gSignin = await googleSignIn();
            if (gSignin) {
                MySwal.fire({
                    title: 'Signed In!',
                    text: 'You have successfully signed in',
                    icon: 'success',
                    confirmButtonColor: '#36528b', // primary-color

                    confirmButtonText: 'Ok'
                }).then(() => {
                    handleAccount();
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    const { register, handleSubmit, setFocus, setError, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const handleSignup = useCallback(() => { navigate('/signup') }, [navigate]);
    const handleAccount = useCallback(() => { navigate('/account') }, [navigate]);
    const onSubmit = async (data) => {
        const email = data['username'];
        const password = data['password'];
        const signin = await signIn(email, password);
        if (signin !== "signed_in" && signin !== "verify_email") {
            const errorMessage = 'Invalid username or password';
            setError("password", { message: errorMessage });
        } else if (signin === "verify_email") {
            MySwal.fire({
                title: 'Email not verified!',
                confirmButtonColor: '#36528b', // primary-color

                text: 'Please check your email for the confirmation link',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        } else {
            handleAccount();
        }
    };

    const forgetPassword = async () => {
        const email = document.getElementById('emailbox').value;
        if (email === '') {
            setError("username", { message: 'Please enter your email' });
        } else {
            const sendlink = await forgotPassword(email).then(
                MySwal.fire({
                    title: 'Email Sent!',
                    text: 'Please check your email for the reset link',
                    icon: 'success',
                    confirmButtonColor: '#36528b', // primary-color

                    confirmButtonText: 'Ok'
                })
            )
        }
    }
    useEffect(() => {
        setFocus("username");
    }, [setFocus]);
    return (
        <div className='scrollbar-hide'>
            <form id='formName' onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap justify-center items-center absolute w-full h-screen z-10">
                <div className='flex flex-col rounded-lg p-4 w-96 md:w-96 bg-white mx-auto my-auto  gap-4'>
                    <div className='flex flex-col items-center pt-10 md:pt-20'>
                        <h1 className='font-semibold text-3xl md:text-4xl '>Login</h1>
                        <h1 className='font-semibold text-base mt-2 text-center text-slate-400'>Hey, Enter your details to sign in to your account</h1>
                    </div>
                    < input
                        id='emailbox'
                        className='p-2 mt-3 flex flex-col items-start rounded-md bg-slate-200'
                        type="text"
                        placeholder="Enter Email"
                        {...register("username",
                            {
                                required: 'required',
                                minLength:
                                {
                                    value: 5,
                                    message: 'must be 5 charcters'
                                },
                                validate: {
                                    validEmail: (value) => {
                                        const emailRegex = /\S+@\S+\.\S+/;
                                        if (emailRegex.test(value)) {
                                            return true;
                                        } else {
                                            return "Invalid email";
                                        }
                                    }
                                }
                            })} />
                    {errors.username && (
                        <span className="text-red-500">{errors.username.message}</span>
                    )}
                    < input
                        className='p-2 flex flex-col items-start rounded-md bg-slate-200'
                        type="password"
                        placeholder="Password"
                        {...register("password",
                            {
                                required: 'required',
                                minLength: {
                                    value: 8,
                                    message: 'must be 8 charcters'
                                }
                            })} />
                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                    <div className='cursor-pointer flex flex-row items-end' onClick={forgetPassword}>
                        <h1 className="text-sm font-semibold text-grey-600">
                            Forgot Password?
                        </h1>
                    </div>
                    < button className='p-2 flex flex-col items-center rounded-md bg-primary-color text-white font-semibold' type="submit" form="formName">
                        Sign in
                    </button>
                    <div className="
                    text-center 
                    text-gray-500
                    w-full relative 
                    after:absolute after:border-t-[2px] after:border-white-dark after:w-[150px] after:bottom-[50%] after:right-0 before:contents-[''] before:absolute before:border-t-[2px] before:border-white-dark before:w-[150px] before:bottom-[50%] before:left-0">
                        OR
                    </div>
                    <div className='p-2 flex flex-col items-center mb-4' >
                        <GoogleButton type="light" className="rounded-full" onClick={handleGoogleSignIn} />
                        <h1 className=" mt-5 text-gray-600"><span>Don't have an account? </span><span onClick={handleSignup} className="font-bold cursor-pointer">Sign up now</span> </h1>
                        <h1 className=" mt-5 text-gray-600"><span>Join our </span><span
                            onClick={() => window.open(' https://chat.whatsapp.com/Je7C9q0yAOXGp74Vq3tskJ', '_blank')}
                            className="font-bold cursor-pointer"> WhatsApp Community!</span> </h1>
                    </div>
                    <div className='flex flex-col items-start'>

                    </div>


                </div>
            </form>
            <div className="area" >
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div >
        </div>
    )
}

export default LoginPage;