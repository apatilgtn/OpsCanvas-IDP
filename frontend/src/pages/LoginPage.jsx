import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  EyeOff, 
  Cloud, 
  Code, 
  GitBranch,
  Shield,
  Database,
  BarChart
} from 'lucide-react';
import CloudEdgeLogo from '../components/CloudEdgeLogo';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  // Updated Platform features
  const features = [
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Multi-Cloud Management",
      description: "Unified control across AWS, Azure, and GCP environments",
      color: "text-blue-500"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Security & Compliance",
      description: "Enterprise-grade security with compliance monitoring",
      color: "text-green-500"
    },
    {
      icon: <Database className="h-6 w-6" />,
      title: "Resource Optimization",
      description: "Smart resource allocation and cost management",
      color: "text-purple-500"
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Real-time Analytics",
      description: "Advanced metrics and performance monitoring",
      color: "text-indigo-500"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (credentials.email === 'demo@cloudedge.dev' && credentials.password === 'demo123') {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard', { replace: true });
      } else {
        setError('Invalid credentials. Please check your email and password.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#f0f2f5]">
      {/* Left Panel - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="max-w-md w-full space-y-8">
          {/* Logo and Title */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <CloudEdgeLogo className="h-20 w-20" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">CloudEdgeOps</h1>
            <p className="mt-2 text-sm text-gray-600">Enterprise Cloud Operations Platform</p>
          </div>

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                           text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                           transition-colors duration-200"
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                             transition-colors duration-200"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <button
                type="button"
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md
                       shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>

            {/* Demo Credentials */}
            <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
              <p className="text-xs font-semibold text-blue-900 mb-2">Demo Credentials:</p>
              <div className="space-y-1">
                <p className="text-xs text-blue-800">Email: demo@cloudedge.dev</p>
                <p className="text-xs text-blue-800">Password: demo123</p>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Panel - Features */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 p-8">
        <div className="w-full max-w-lg mx-auto flex flex-col justify-center text-white">
          <h2 className="text-3xl font-bold mb-8">
            Transform Your Cloud Operations
          </h2>
          
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-2.5 bg-white/10 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-base">{feature.title}</h3>
                  <p className="text-sm text-white/80">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Platform Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12">
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold">99.9%</div>
              <div className="text-xs opacity-80">Uptime</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold">500+</div>
              <div className="text-xs opacity-80">Deployments</div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-xs opacity-80">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;