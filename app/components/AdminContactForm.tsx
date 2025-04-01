"use client";
import { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export default function AdminContactForm() {
  const { user, token } = useAuth();
  const [recipientEmail, setRecipientEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/admin/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          senderEmail: user?.email, // Admin's email
          recipientEmail,
          subject,
          message,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send message');

      setSuccess('Message sent successfully!');
      setRecipientEmail('');
      setSubject('');
      setMessage('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
        Admin Contact Form
      </h2>

      {success && (
        <div className="mb-4 p-3 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 rounded">
          {success}
        </div>
      )}
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="senderEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            From (Your Email)
          </label>
          <input
            id="senderEmail"
            type="email"
            value={user?.email || ''} // Pre-filled with admin's email
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-700"
            disabled
          />
        </div>

        <div>
          <label htmlFor="recipientEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            To (Recipient Email)
          </label>
          <input
            id="recipientEmail"
            type="email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
            placeholder="Enter recipient email"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
            placeholder="Enter subject"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-700"
            placeholder="Enter your message"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}