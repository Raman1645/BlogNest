import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/api";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, Mail, User, UserPlus } from "lucide-react";

const Register = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreedToTerms) {
      toast.error('Please agree to the Terms of Service and Privacy Policy');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (!formData.username || !formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("/auth/register", formData);
      login(res.data.token);
      toast.success('Account created successfully')
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
      toast.error('Registration failed');
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
      setFormData({ username: "", email: "", password: "" });
      setAgreedToTerms(false);
    }
  };

  const avatar = ''

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="card bg-base-100 backdrop-blur-lg border border-primary/25 shadow-2xl">
          <div className="card-body p-8">
            <div className="text-center mb-8">
              <div className="avatar placeholder mb-4">
                <div className="bg-primary/80 text-primary-content rounded-full w-16 h-16 flex items-center justify-center">
                  <UserPlus size={32} />
                </div>
              </div>
              <h1 className="text-3xl font-bold  mb-2">Create Account</h1>
              <p className="">Join us today and get started</p>
            </div>
            <div className="space-y-6">
              <div className="form-control w-1/2 mx-auto">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className='size-5 text-base-content/40' />
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="your full name"
                    className="input input-bordered w-full pl-10"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

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
                    placeholder="********"
                    name="password"
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
                <p className="text-xs opacity-70 mt-1">
                  Password must be at least 6 characters long
                </p>
              </div>
            </div>
            {/* Terms and Conditions */}
            <div className="form-control  mx-auto" >
                <label className="label cursor-pointer justify-start gap-2">
                  <input type="checkbox" className="checkbox checkbox-sm" required onChange={(e)=>{setAgreedToTerms(e.target.checked)}}/>
                  <span className="text-xs leading-tight">
                    I agree to the <span className="text-primary hover:underline">terms of service</span> and <span className="text-primary hover:underline">privacy policy</span>
                  </span>
                </label>
              </div>

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="btn btn-primary w-1/2 mx-auto btn-lg bg-gradient-to-r from-primary/80 to-secondary/80 border-none text-white font-semibold hover:scale-105 hover:shadow-lg transition-all duration-300 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Create Account
                </>
              )}
            </button>
            <div className="text-center mt-6">
              <p >
                Already have an account?{' '}
                <a href="/login" className="link link-primary font-semibold hover:link-secondary transition-colors">
                  Sign in here
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;


