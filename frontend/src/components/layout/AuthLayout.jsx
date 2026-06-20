import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-mesh p-4 md:p-8">
      {/* Container holding form and branding */}
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-3xl overflow-hidden glass-panel shadow-2xl border border-dark-border">
        
        {/* Left column - Content & Branding (visible on MD+) */}
        <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-primary-900/60 to-indigo-950/60 border-r border-dark-border relative overflow-hidden">
          {/* Animated decorative orb */}
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary-500/10 blur-3xl animate-pulse-glow"></div>
          
          <div className="z-10">
            <span className="text-sm font-semibold tracking-wider text-primary-400 uppercase">
              Skill Development Ecosystem
            </span>
            <h2 className="text-3xl font-extrabold mt-4 leading-tight bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Empowering Minds, Shaping Futures.
            </h2>
            <p className="text-gray-400 text-sm mt-4 font-light leading-relaxed">
              Unlock your potential with our advanced training systems. Learn, track certifications, join live batches, and earn verified credentials.
            </p>
          </div>

          <div className="z-10 text-xs text-gray-500 font-light">
            © {new Date().getFullYear()} SkillDev Ecosystem Management Platform. All rights reserved.
          </div>
        </div>

        {/* Right column - Main form container */}
        <div className="p-8 md:p-12 flex flex-col justify-center bg-black/45 backdrop-blur-md">
          <div className="w-full max-w-md mx-auto">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
