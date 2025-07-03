import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.post("/auth/login", formData);
      login(res.data.token);
      toast.success('Login successful');
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      toast.error('Login failed');
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
      setFormData({ email: "", password: "" }); // Reset form data
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="card bg-base-100 backdrop-blur-lg border border-primary/25 shadow-2xl">
          <div className="card-body p-8">
            <div className="text-center mb-8">
              <div className="avatar placeholder mb-4">
                <div className="bg-gradient-to-r from-primary to-secondary text-primary-content rounded-full w-16 h-16 flex items-center justify-center">
                  <LogIn size={32} className="" />
                </div>
              </div>
              <h1 className="text-3xl font-bold  mb-2">Welcome Back !!!</h1>
              <p className="">Get ready for writing Blogs...</p>
            </div>
            {/* form  */}
            <div className="space-y-6">
              
              <div className="form-control w-1/2 mx-auto">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className='size-5 text-base-content/40' />
                  </div>
                  <input
                    type="text"
                    name="email"
                    placeholder="your full email"
                    className="input input-bordered w-full pl-10"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div className="form-control w-1/2 mx-auto">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className='size-5 text-base-content/40' />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="********"
                    className="input input-bordered w-full pl-10 pr-10"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/40"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                  </button>
                </div>
              </div>
            </div>
            
            {/* submit */}
            <button
                onClick={handleSubmit}
                disabled={isLoading}
                className="btn mt-5 btn-primary w-1/2 mx-auto btn-lg border-none font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-70 bg-gradient-to-r from-primary to-secondary"
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5 mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </div>
            {/* Footer */}
            <div className="text-center my-6">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <a href="/register" className="link link-primary font-semibold hover:link-secondary transition-colors">
                  Create one here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Login;

