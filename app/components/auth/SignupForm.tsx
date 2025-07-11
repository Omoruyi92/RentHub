'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRobot, setIsRobot] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (!isRobot) {
      setError('Please verify that you are not a robot.');
      setIsLoading(false);
      return;
    }

    try {
      await signup(email, password, name);
      setIsLoading(false);
      alert('Account created successfully! Please login to continue.');
      router.push('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to signup');
      setIsLoading(false);
    }
  };

  const handleInputChange = () => {
    setIsFormValid(
      !!name &&
      !!email &&
      !!password &&
      !!confirmPassword &&
      isRobot &&
      password.length >= 8
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1413708617479-50918bc877eb?q=80&w=3546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          fill
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
      </div>

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md mx-4 mt-10">
        <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden">
          {/* Card Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center">
            <h2 className="text-2xl font-bold text-white">Create Your Account</h2>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8">
            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    handleInputChange();
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    handleInputChange();
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span> (min 8 characters)
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    handleInputChange();
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
                  placeholder="••••••••"
                  minLength={8}
                  required
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    handleInputChange();
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-black"
                  placeholder="••••••••"
                  minLength={8}
                  required
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isRobot}
                  onChange={() => {
                    setIsRobot(!isRobot);
                    handleInputChange();
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="robot-check" className="ml-2 block text-sm text-gray-700">
                  I&apos;m not a robot
                </label>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow-md transition-all ${isFormValid
                    ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                    : 'bg-blue-400 cursor-not-allowed'
                  } ${isLoading ? 'opacity-80' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </span>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or sign up with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-4 gap-3">
                <a
                  href="https://accounts.google.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <FaGoogle className="h-5 w-5 text-red-500" />
                </a>
                <a
                  href="https://www.facebook.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <FaFacebookF className="h-5 w-5 text-blue-600" />
                </a>
                <a
                  href="https://twitter.com/i/flow/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <FaTwitter className="h-5 w-5 text-sky-400" />
                </a>
                <a
                  href="https://www.linkedin.com/signup"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
                >
                  <FaLinkedinIn className="h-5 w-5 text-blue-500" />
                </a>
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="bg-gray-50 px-6 py-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}