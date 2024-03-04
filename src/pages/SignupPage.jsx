import React, { useEffect, useCallback } from "react";
import { useForm } from 'react-hook-form';

import { UserAuth } from '../context/AuthContext'
import '../static/css/Login.css'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
function SignupPage() {
    // scroll to top 
    window.scrollTo(0, 0);
    document.title = "Sign Up";
    const MySwal = withReactContent(Swal)
    const { register, handleSubmit, setFocus, setError, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const handlelogin = useCallback(() => { navigate('/login') }, [navigate]);
    const { signUp } = UserAuth();
    const onSubmit = async (data) => {
        const email = data['username'];
        const confirmpassword = data['confirmpassword'];
        const name = data['name'];
        const signedup = await signUp(email, confirmpassword, name);
        if (signedup !== "signed up") {
            const errorMessage = 'Email already exists';
            setError("confirmpassword", { message: errorMessage });
            // clear text box
            document.getElementById('confirmpassword').value = '';
            document.getElementById('password').value = '';
            document.getElementById('username').value = '';
        } else {
            MySwal.fire({
                title: 'Account made!',
                text: 'Please check your email for the confirmation link',
                icon: 'success',
                confirmButtonColor: '#36528b', // primary-color

                confirmButtonText: 'Ok'
            })
        }

    };
    useEffect(() => {
        setFocus("username");
    }, [setFocus]);
    return (
        <div className='scrollbar-hide'>
            <form id='formSignup' onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap justify-center items-center absolute w-full h-screen z-10">
                <div className='flex flex-col rounded-lg p-4 w-96 md:w-96 bg-white mx-auto my-auto  gap-4'>
                    <div className='flex flex-col items-center pt-10 md:pt-20'>
                        <h1 className='font-semibold text-3xl md:text-4xl '>Sign up</h1>
                        <h1 className='font-semibold text-base mt-2 text-center text-slate-400'>Hey, Please enter the relevant details to create your account!</h1>
                    </div>
                    < input
                        className='p-2 mt-3 flex flex-col items-start rounded-md bg-slate-200'
                        type="text"
                        placeholder="Enter Name"
                        {...register("name",
                            {
                                required: 'required',
                                minLength:
                                {
                                    value: 5,
                                    message: 'must be 5 charcters'
                                },
                            })} />
                    {errors.name && (
                        <span className="text-red-500">{errors.name.message}</span>
                    )}
                    < input
                        id='signupEmail'
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
                        id='signupPassword'
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

                    < input
                        id='signupConfirmPassword'
                        className='p-2 flex flex-col items-start rounded-md bg-slate-200'
                        type="password"
                        placeholder="Confirm Password"
                        {...register("confirmpassword",
                            {
                                required: 'required',
                                minLength: {
                                    value: 8,
                                    message: 'must be 8 charcters'
                                },
                                validate: {
                                    validPassword: (value) => {
                                        const password = document.getElementById('signupPassword').value;
                                        return password === value || 'Password does not match';
                                    },
                                }
                            })} />
                    {errors.confirmpassword && (
                        <span className="text-red-500">{errors.confirmpassword.message}</span>
                    )}

                    < button className='p-2 flex flex-col items-center rounded-md bg-primary-color text-white font-semibold' type="submit" form="formSignup">
                        Sign up
                    </button>
                    <div className='p-2 flex flex-col items-center mb-4' >
                        <h1 className=" mt-5 text-gray-600"><span>Have an account? </span><span onClick={handlelogin} className="font-bold cursor-pointer">Login in now</span> </h1>
                        <h1 className=" mt-5 text-gray-600"><span>Join our </span><span
                            onClick={() => window.open(' https://chat.whatsapp.com/Je7C9q0yAOXGp74Vq3tskJ', '_blank')}
                            className="font-bold cursor-pointer"> WhatsApp Community!</span> </h1>
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

export default SignupPage;