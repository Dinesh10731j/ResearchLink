

import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import LoginImage from '../assets/login.jpg'; 
import { Link } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { UseUserLogin } from '../hooks/Uselogin';
import { CircularProgress } from '@mui/material';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();
  const mutation = UseUserLogin();

  const onSubmit = (data: LoginData) => {
   mutation.mutate(data);
 
  };

  return (
    <>
      <Header />

      <motion.section
        className="flex flex-col items-center justify-center min-h-screen"
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md flex flex-col items-center">
          {/* Image Section */}
          <section className="mb-4">
            <img src={LoginImage} alt="Login" className="w-full rounded-md shadow-md" />
          </section>

          {/* Form Section */}
          <section className="w-full">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must have at least 6 characters',
                    },
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                {errors.password && <p className="text-red-500">{errors.password.message}</p>}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full bg-green-300 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
              >
            {mutation.isPending?(<CircularProgress size={20}/>):(
              'Login'
            )}
              </button>

              {/* Signup Button */}
          <Link to="/auth/signup">
          <button
                type="button"
                className="w-full bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-900 transition duration-200 mt-6"
              >
                Signup
              </button>
          </Link>  
            </form>

            <Toaster position='top-center'/>
          </section>
        </div>
      </motion.section>

      <Footer />
    </>
  );
};

export default Login;

