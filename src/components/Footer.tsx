

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 ">
      <div className="container mx-auto flex flex-wrap justify-evenly items-center">
        <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
          <h2 className="text-lg font-bold mb-2">ResearchLink</h2>
          <p className="text-sm">Your source for research and knowledge.</p>
          <p className="text-sm mt-4">123 Research Street, Kathmandu, Nepal</p>
          <p className="text-sm">Phone: +977 123 456 789</p>
          <p className="text-sm">Email: info@researchlink.com</p>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
          <h2 className="text-lg font-bold mb-2">Quick Links</h2>
          <ul className="text-sm">
            <li className="mb-2"><a href="#">Home</a></li>
            <li className="mb-2"><a href="#">About Us</a></li>
            <li className="mb-2"><a href="#">Research Articles</a></li>
            <li className="mb-2"><a href="#">Contact Us</a></li>
          </ul>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 px-4 mb-6">
          <h2 className="text-lg font-bold mb-2">Follow Us</h2>
          <ul className="text-sm">
            <li className="mb-2"><a href="#">Facebook</a></li>
            <li className="mb-2"><a href="#">Twitter</a></li>
            <li className="mb-2"><a href="#">LinkedIn</a></li>
            <li className="mb-2"><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center py-4 mt-4 border-t border-gray-600">
        <p className="text-sm">&copy; 2024 ResearchLink. All rights reserved.</p>
        <p className="text-sm">Designed and developed with ❤️ by CodeStream Technologies</p>
      </div>
    </footer>
  );
};

export default Footer;
