import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Lock, LogOut, LayoutDashboard, Users, Settings, Activity, BookOpen } from 'lucide-react';
import { useRouter } from '../lib/router';

interface GoogleJwtPayload {
  email: string;
  name: string;
  picture: string;
  sub: string;
}

export default function AdminDashboardPage() {
  const { navigate } = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userProfile, setUserProfile] = useState<GoogleJwtPayload | null>({
    email: 'admin@digitalproductstudio.com',
    name: 'Admin User',
    picture: 'https://ui-avatars.com/api/?name=Admin+User&background=random',
    sub: '123'
  });

  const handleLoginSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded = jwtDecode<GoogleJwtPayload>(credentialResponse.credential);
      console.log('Decoded user info:', decoded);
      setUserProfile(decoded);
      setIsAuthenticated(true);
    }
  };

  const handleLoginError = () => {
    console.error('Google Login Failed');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserProfile(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 flex items-center justify-center relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-studio-accent/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
            <div className="bg-studio-bg/80 backdrop-blur-2xl rounded-2xl p-10 border border-white/5 shadow-2xl">
              <div className="flex flex-col items-center mb-10">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-studio-accent/20 to-transparent flex items-center justify-center border border-studio-accent/20 mb-6 shadow-inner">
                  <Lock className="w-8 h-8 text-studio-accent" />
                </div>
                <h1 className="text-3xl font-display font-medium text-white tracking-tight mb-2">
                  Admin Access
                </h1>
                <p className="text-studio-text-secondary text-center text-sm">
                  Authenticate with Google to access the central control panel.
                </p>
              </div>

              <div className="flex justify-center mt-8">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginError}
                  theme="filled_black"
                  shape="pill"
                  size="large"
                  text="continue_with"
                />
              </div>
              
              <div className="mt-10 text-center">
                <p className="text-xs text-studio-text-secondary/60">
                  Secure authentication provided by Google OAuth 2.0
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Dashboard View
  return (
    <div className="min-h-screen pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-12"
      >
        <div>
          <h1 className="text-4xl font-display font-medium text-white mb-2">
            Dashboard
          </h1>
          <p className="text-studio-text-secondary">
            Welcome back, {userProfile?.name}
          </p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <img 
              src={userProfile?.picture} 
              alt="Profile" 
              className="w-10 h-10 rounded-full border border-white/10"
              referrerPolicy="no-referrer"
            />
            <div className="hidden sm:block">
              <p className="text-sm text-white font-medium">{userProfile?.name}</p>
              <p className="text-xs text-studio-text-secondary">{userProfile?.email}</p>
            </div>
          </div>
          
          <button 
            onClick={() => navigate('/admin/blogs')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-studio-accent text-white hover:bg-studio-accent/90 transition-all text-sm font-medium"
            title="Manage Blogs"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Manage Blogs</span>
          </button>

          <button 
            onClick={handleLogout}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-studio-text-secondary hover:text-white transition-all group"
            title="Log Out"
          >
            <LogOut className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <DashboardCard 
          icon={<Users className="w-5 h-5 text-blue-400" />}
          title="Total Visitors"
          value="12,482"
          trend="+14%"
          trendUp={true}
        />
        <DashboardCard 
          icon={<Activity className="w-5 h-5 text-emerald-400" />}
          title="Active Sessions"
          value="48"
          trend="+5%"
          trendUp={true}
        />
        <DashboardCard 
          icon={<LayoutDashboard className="w-5 h-5 text-purple-400" />}
          title="Conversion Rate"
          value="3.2%"
          trend="-1.2%"
          trendUp={false}
        />
      </div>

      {/* Main Content Area Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="h-full min-h-[400px] rounded-2xl bg-white/[0.02] border border-white/5 p-6 flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <LayoutDashboard className="w-32 h-32" />
             </div>
             <h3 className="text-lg text-white font-medium mb-1">Recent Activity</h3>
             <p className="text-sm text-studio-text-secondary mb-6">Overview of latest interactions</p>
             
             <div className="flex-1 flex items-center justify-center text-studio-text-secondary/50 text-sm">
                Analytics graph placeholder
             </div>
          </div>
        </div>
        
        <div>
           <div className="h-full min-h-[400px] rounded-2xl bg-white/[0.02] border border-white/5 p-6 flex flex-col relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-10">
                <Settings className="w-32 h-32" />
             </div>
             <h3 className="text-lg text-white font-medium mb-1">System Status</h3>
             <p className="text-sm text-studio-text-secondary mb-6">Current operational metrics</p>
             
             <div className="flex-1 flex flex-col gap-4 mt-4">
                <StatusRow label="API Status" value="Online" status="good" />
                <StatusRow label="Database" value="98% Health" status="good" />
                <StatusRow label="Cache Hit Rate" value="84%" status="warning" />
                <StatusRow label="Error Rate" value="0.01%" status="good" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, value, trend, trendUp }: { icon: React.ReactNode, title: string, value: string, trend: string, trendUp: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="p-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent group"
    >
      <div className="bg-studio-bg/60 backdrop-blur-md rounded-2xl p-6 border border-white/5 h-full transition-colors group-hover:bg-white/[0.04]">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2 rounded-xl bg-white/5 border border-white/10">
            {icon}
          </div>
          <div className={`text-xs font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
            {trend}
          </div>
        </div>
        <p className="text-sm text-studio-text-secondary mb-1">{title}</p>
        <p className="text-2xl font-display text-white font-medium tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}

function StatusRow({ label, value, status }: { label: string, value: string, status: 'good' | 'warning' | 'error' }) {
  const statusColors = {
    good: 'bg-emerald-400',
    warning: 'bg-amber-400',
    error: 'bg-red-400'
  };

  return (
    <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
      <span className="text-sm text-studio-text-secondary">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-white font-medium">{value}</span>
        <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
      </div>
    </div>
  );
}
