import { FaStar } from 'react-icons/fa';

const HomePage = () => {
  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      {/* Testimonials Section */}
      <section className="bg-blue-100 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-8">What Our Customers Say</h2>
        <div className="mt-6 flex overflow-x-auto space-x-6 pb-6 scroll-smooth">
          {/* Testimonial 1 */}
          <blockquote className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto transform hover:scale-105 transition-all duration-500 ease-in-out hover:shadow-2xl flex-shrink-0">
            <div className="flex justify-center mb-4">
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-gray-300" />
            </div>
            <p className="text-gray-700 italic mb-4">
              “GadgetRent made it super easy to rent a high-end camera for my trip!”
            </p>
            <span className="block font-bold text-blue-600">- Aayush G.</span>
          </blockquote>
          
          {/* Testimonial 2 */}
          <blockquote className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto transform hover:scale-105 transition-all duration-500 ease-in-out hover:shadow-2xl flex-shrink-0">
            <div className="flex justify-center mb-4">
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-gray-300" />
              <FaStar size={20} className="text-gray-300" />
            </div>
            <p className="text-gray-700 italic mb-4">
              “The process was smooth, and the gadget was in perfect condition.”
            </p>
            <span className="block font-bold text-blue-600">- Ronil</span>
          </blockquote>
          
          {/* Testimonial 3 */}
          <blockquote className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto transform hover:scale-105 transition-all duration-500 ease-in-out hover:shadow-2xl flex-shrink-0">
            <div className="flex justify-center mb-4">
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
            </div>
            <p className="text-gray-700 italic mb-4">
              “GadgetRent exceeded my expectations! Great service and products.”
            </p>
            <span className="block font-bold text-blue-600">- Oms</span>
          </blockquote>

           {/* Testimonial 4 */}
          <blockquote className="bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto transform hover:scale-105 transition-all duration-500 ease-in-out hover:shadow-2xl flex-shrink-0">
            <div className="flex justify-center mb-4">
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
              <FaStar size={20} className="text-yellow-400" />
            </div>
            <p className="text-gray-700 italic mb-4">
              “GadgetRent made it super easy to rent a high-end camera for my trip!”
            </p>
            <span className="block font-bold text-blue-600">- Glen</span>
          </blockquote>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
