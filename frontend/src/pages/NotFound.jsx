import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark-bg p-6">
      <div className="max-w-md w-full text-center space-y-6 glass-panel p-10 rounded-3xl border border-dark-border shadow-2xl">
        <h1 className="text-8xl font-black text-primary-500 tracking-tight animate-bounce">
          404
        </h1>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white">Page Not Found</h2>
          <p className="text-xs text-gray-400 font-light leading-relaxed">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>
        <Link 
          to="/dashboard" 
          className="inline-block px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium text-xs transition-all duration-200 shadow-lg shadow-primary-600/20"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
