
import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {motion} from "framer-motion"

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>();

  const onSubmit = (data: LoginData) => {
    console.log(data);
   
  };

  return (
    <>
      <Header />

      <motion.section className="flex items-center justify-center min-h-screen"
      
      initial={{ opacity: 0, y: -80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
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

            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
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

            <button
              type="submit"
              className="w-full bg-green-300 text-white py-2 px-4 rounded-md  hover:bg-green-600 transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
       
      </motion.section>

      <Footer/>
    </>
  );
};

export default Login;
