import { useForm } from "react-hook-form";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { UseUserSignup } from "../hooks/Usesignup";
import { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import SignupImage from "../assets/signup.avif";
import { motion } from "framer-motion";
import { Usecloudinaryimageupload } from "../hooks/Useuploadprofilecloudinary";
import { toast } from "react-hot-toast";

interface SignupData {
  name: string;
  email: string;
  password: string;
  affiliation: string;
  profile: string;
  profilePicture: FileList;
  researchField: string;
}

const Signup = () => {
  const mutation = UseUserSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>();

  const onSubmit = async (data: SignupData) => {
    try {
      let imageUrl = "";
      const profilePicture = data.profilePicture[0];
  
      if (profilePicture) {
        imageUrl = await Usecloudinaryimageupload(profilePicture);
      }
  
      const userdata = {
        ...data,
        profilePicture: imageUrl, // Ensure the correct key name for the profile picture URL
      };
  
      mutation.mutate(userdata);
  
     
    } catch{
      toast.error("Error uploading profile picture:");
    }
  };
  

  return (
    <>
      <Header />

      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
        <motion.h2
          className="text-2xl font-bold mb-4 text-center font-serif"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Sign Up
        </motion.h2>
        <motion.img
          src={SignupImage}
          alt="Signup form"
          className="w-full rounded-md shadow-md mb-4"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="affiliation" className="block mb-1">
              Affiliation
            </label>
            <input
              type="text"
              id="affiliation"
              {...register("affiliation", {
                required: "Affiliation is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.affiliation && (
              <p className="text-red-500">{errors.affiliation.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="profile" className="block mb-1">
              Choose Profile
            </label>
            <select
              id="profile"
              {...register("profile", {
                required: "Profile is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a profile</option>
              <option value="Researcher">Researcher</option>
              <option value="Student">Student</option>
              <option value="Professional">Professional</option>
            </select>
            {errors.profile && (
              <p className="text-red-500">{errors.profile.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="profilePicture" className="block mb-1">
              Upload Profile Picture (Optional)
            </label>
            <input
              type="file"
              id="profilePicture"
              {...register("profilePicture")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.profilePicture && (
              <p className="text-red-500">{errors.profilePicture.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="researchField" className="block mb-1">
              Field of Research
            </label>
            <select
              id="researchField"
              {...register("researchField", {
                required: "Field of Research is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a field</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Biology">Biology</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Engineering">Engineering</option>
            </select>
            {errors.researchField && (
              <p className="text-red-500">{errors.researchField.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-300 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          >
            {mutation.isPending ? (
              <CircularProgress size={20} color="success" />
            ) : (
              "Sign Up"
            )}
          </button>
        </motion.form>

        <Toaster position="top-center" />
      </div>

      <Footer />
    </>
  );
};

export default Signup;
