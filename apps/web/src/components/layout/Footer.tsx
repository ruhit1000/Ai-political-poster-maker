export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AI Political Poster Maker. All rights reserved.
        </p>
        <p className="text-sm text-gray-400 mt-2 sm:mt-0">
          Powered by Gemini AI
        </p>
      </div>
    </footer>
  );
}
