'use client';

import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { FaGoogle, FaFacebookF, FaTwitter } from 'react-icons/fa';

export default function SignupForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRobot, setIsRobot] = useState(false); // CAPTCHA state
  const [isFormValid, setIsFormValid] = useState(false); // To track form validity

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
      
      // Show success message and redirect after a short delay
      setIsLoading(false);
      alert('Account created successfully! Please login to continue.');
      router.push('/login');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to signup');
      setIsLoading(false);
    }
  };

  // Handle input changes and validate the form
  const handleInputChange = () => {
    const isValid =
      !!name && !!email && !!password && !!confirmPassword && isRobot && password.length >= 8;
    setIsFormValid(isValid);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Form Fields */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-bold text-gray-700">
            Full Name: <span className="text-red-600 font-bold">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleInputChange(); 
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700">
            Email: <span className="text-red-600 font-bold">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              handleInputChange();
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700">
            Password: <span className="text-red-600 font-bold">*</span> (Min. 8 characters)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleInputChange();
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            placeholder="Enter your password"
            minLength={8}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-700">
            Confirm Password: <span className="text-red-600 font-bold">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              handleInputChange();
            }}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-black"
            placeholder="Confirm your password"
            minLength={8}
            required
          />
        </div>

        {/* CAPTCHA Section */}
        <div className="w-auto p-4 border-1 border-gray-400 rounded-lg shadow-lg bg-white bg-opacity-60 backdrop-blur-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isRobot}
              onChange={() => {
                setIsRobot(!isRobot);
                handleInputChange();
              }}
              className="w-4 h-4 text-blue-600"
              required
            />
            <span className="ml-2 text-sm text-gray-600">I am not a robot</span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || !isFormValid}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isLoading || !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      {/* SignIn Link */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <span>Already have an account? </span>
        <a href="/login" className="text-blue-600 hover:underline">Sign In</a>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        <span>Or sign up with</span>
      </div>

      {/* Social Login Options */}
      <div className="mt-4 flex justify-center space-x-4">
        <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex justify-center items-center text-gray-800 hover:bg-gray-100">
          <FaGoogle className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex justify-center items-center text-blue-600 hover:bg-blue-100">
          <FaFacebookF className="w-6 h-6" />
        </button>
        <button className="w-12 h-12 rounded-full border-2 border-gray-300 flex justify-center items-center text-blue-400 hover:bg-blue-100">
          <FaTwitter className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
