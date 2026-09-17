'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiShield, 
  FiLock, 
  FiUser, 
  FiKey, 
  FiEye, 
  FiEyeOff, 
  FiCheck, 
  FiAlertTriangle, 
  FiArrowRight, 
  FiArrowLeft,
  FiTerminal,
  FiCpu,
  FiActivity
} from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function AdminLogin({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    securityKey: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [authStatus, setAuthStatus] = useState('idle'); // 'idle' | 'scanning' | 'success' | 'denied'
  const [sessionId, setSessionId] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Generate simulated dynamic cryptographic session hash
    const randomHex = Math.random().toString(16).substring(2, 10).toUpperCase();
    setSessionId(`ZPLUS-0X${randomHex}`);
  }, []);

  // Calculate password strength (0 to 4)
  const getPasswordStrength = (pass) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score++;
    return score;
  };

  const strength = getPasswordStrength(credentials.password);
  const strengthLabels = ['VULNERABLE', 'BASIC', 'MODERATE', 'STRONG', 'Z+ MILITARY GRADE'];
  const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-amber-400', 'bg-blue-400', 'bg-emerald-400'];

  // Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAuthStatus('scanning');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthStatus('success');
        localStorage.setItem('token', data.token);
        toast.success('Z+ Security Clearance Approved! Initializing Terminal...', {
          icon: '🛡️',
          style: {
            background: '#090d16',
            color: '#10b981',
            border: '1px solid #059669',
          },
        });
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1000);
      } else {
        setAuthStatus('denied');
        const errorMsg = data.error || data.message || 'Authentication Failed';
        toast.error(errorMsg, {
          icon: '⚠️',
          style: {
            background: '#090d16',
            color: '#ef4444',
            border: '1px solid #dc2626',
          },
        });
        setTimeout(() => setAuthStatus('idle'), 2500);
      }
    } catch (error) {
      setAuthStatus('denied');
      toast.error('Network security bridge error: ' + error.message);
      setTimeout(() => setAuthStatus('idle'), 2500);
    } finally {
      setLoading(false);
    }
  };

  // Handle Register Submission
  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (credentials.password !== credentials.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (credentials.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setAuthStatus('scanning');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: credentials.username,
          password: credentials.password,
          securityKey: credentials.securityKey,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAuthStatus('success');
        localStorage.setItem('token', data.token);
        toast.success('Admin Security Account Created! Access Granted.', {
          icon: '⚡',
          style: {
            background: '#090d16',
            color: '#10b981',
            border: '1px solid #059669',
          },
        });
        setTimeout(() => {
          router.push('/admin/dashboard');
        }, 1100);
      } else {
        setAuthStatus('denied');
        const errorMsg = data.error || data.message || 'Registration Failed';
        toast.error(errorMsg, {
          icon: '⚠️',
          style: {
            background: '#090d16',
            color: '#ef4444',
            border: '1px solid #dc2626',
          },
        });
        setTimeout(() => setAuthStatus('idle'), 2500);
      }
    } catch (error) {
      setAuthStatus('denied');
      toast.error('Registration link failure: ' + error.message);
      setTimeout(() => setAuthStatus('idle'), 2500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-6 bg-[#030712] text-slate-100 overflow-hidden select-none font-sans">
      {/* 1. Cyber Ambient Security Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Energy Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/20 to-purple-600/15 rounded-full blur-[120px] opacity-70" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
        
        {/* Matrix Coordinate Lines */}
        <div 
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.4) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Diagonal Scanning Light Beam */}
        <motion.div 
          animate={{
            y: ['-100%', '200%']
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="absolute inset-x-0 h-40 bg-gradient-to-b from-transparent via-cyan-500/[0.05] to-transparent pointer-events-none"
        />
      </div>

      {/* 2. Main Portal Container */}
      <div className="w-full max-w-lg relative z-10 my-8">
        {/* Top Security Status Header Bar */}
        <div className="flex items-center justify-between mb-4 px-2 text-[11px] font-mono tracking-wider text-slate-400">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-emerald-400 font-bold">Z+ SECURITY ACTIVE</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-slate-500">
            <FiCpu size={12} className="text-cyan-400" />
            <span>{sessionId}</span>
          </div>
        </div>

        {/* High-Security Enclave Card */}
        <motion.div
          animate={authStatus === 'denied' ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
          transition={{ duration: 0.5 }}
          className={`relative rounded-3xl bg-slate-900/80 backdrop-blur-2xl border transition-all duration-500 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.7)] ${
            authStatus === 'success' 
              ? 'border-emerald-500/80 shadow-[0_0_50px_rgba(16,185,129,0.3)]' 
              : authStatus === 'denied'
              ? 'border-red-500/80 shadow-[0_0_50px_rgba(239,68,68,0.3)]'
              : 'border-slate-800 hover:border-slate-700/80'
          }`}
        >
          {/* Animated Holographic Emblem */}
          <div className="flex flex-col items-center text-center mb-6">
            <div className="relative w-20 h-20 mb-4 flex items-center justify-center">
              {/* Outer Rotating Radar Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-cyan-500/40"
              />

              {/* Middle Pulsing Ring */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-1.5 rounded-full border border-cyan-400/30 bg-gradient-to-tr from-cyan-500/10 to-purple-600/10"
              />

              {/* Core Icon Box */}
              <div className={`relative w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${
                authStatus === 'success'
                  ? 'bg-emerald-500 text-white shadow-emerald-500/40'
                  : authStatus === 'denied'
                  ? 'bg-red-500 text-white shadow-red-500/40'
                  : 'bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-blue-500/30'
              }`}>
                {authStatus === 'success' ? (
                  <FiCheck size={28} className="animate-bounce" />
                ) : authStatus === 'denied' ? (
                  <FiAlertTriangle size={26} className="animate-pulse" />
                ) : mode === 'login' ? (
                  <FiLock size={26} />
                ) : (
                  <FiShield size={26} />
                )}
              </div>
            </div>

            {/* Portal Title */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>{mode === 'login' ? 'Admin Access Terminal' : 'Admin Enclave Registry'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
              {authStatus === 'scanning'
                ? 'AUTHENTICATING ZERO-TRUST CIPHER...'
                : authStatus === 'success'
                ? 'CLEARANCE VERIFIED // UNLOCKING VAULT...'
                : authStatus === 'denied'
                ? 'ACCESS REJECTED // CIPHER MISMATCH'
                : mode === 'login'
                ? 'Military-Grade TLS 1.3 Zero-Trust Security'
                : 'Register Protected Security Administrator'}
            </p>
          </div>

          {/* Dual Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800 mb-6 relative">
            <button
              type="button"
              onClick={() => { setMode('login'); setAuthStatus('idle'); }}
              className={`relative py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'login' 
                  ? 'text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode === 'login' && (
                <motion.div
                  layoutId="auth-tab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <FiLock size={13} />
                <span>Sign In</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => { setMode('register'); setAuthStatus('idle'); }}
              className={`relative py-2.5 px-3 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                mode === 'register' 
                  ? 'text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {mode === 'register' && (
                <motion.div
                  layoutId="auth-tab"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-purple-500/20"
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <FiShield size={13} />
                <span>Register Admin</span>
              </span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                Administrator ID / Username
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-500 pointer-events-none">
                  <FiUser size={17} />
                </div>
                <input
                  type="text"
                  required
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  placeholder="e.g. admin"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 text-sm font-medium outline-none transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Master Password
                </label>
                {mode === 'register' && credentials.password && (
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full text-white ${strengthColors[strength]}`}>
                    {strengthLabels[strength]}
                  </span>
                )}
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-slate-500 pointer-events-none">
                  <FiLock size={17} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter secure password"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 text-sm font-medium outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>

              {/* Password Strength Meter (In Register Mode) */}
              {mode === 'register' && (
                <div className="mt-2 space-y-1.5">
                  <div className="grid grid-cols-4 gap-1.5 h-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          strength >= level ? strengthColors[strength] : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                    Requirements: Min 6 characters, mixed case recommended
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password & Security Key (Only in Register Mode) */}
            {mode === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4 pt-1"
              >
                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5 font-mono">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-slate-500 pointer-events-none">
                      <FiLock size={17} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={credentials.confirmPassword}
                      onChange={(e) => setCredentials({ ...credentials, confirmPassword: e.target.value })}
                      placeholder="Repeat master password"
                      autoComplete="new-password"
                      className="w-full pl-10 pr-11 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 text-sm font-medium outline-none transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3.5 text-slate-400 hover:text-white transition-colors cursor-pointer p-1"
                      aria-label="Toggle confirm password"
                    >
                      {showConfirmPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                  {credentials.confirmPassword && (
                    <p className={`text-[11px] font-mono mt-1 flex items-center gap-1 ${
                      credentials.password === credentials.confirmPassword ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {credentials.password === credentials.confirmPassword ? '✓ Passwords Match' : '✕ Passwords Do Not Match'}
                    </p>
                  )}
                </div>

                {/* Z+ Security Passkey */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Master Authorization Passkey
                    </label>
                    <button
                      type="button"
                      onClick={() => setCredentials({ ...credentials, securityKey: 'ZPLUS-SECURE-2026' })}
                      className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono font-bold underline cursor-pointer"
                    >
                      Use Default Passkey
                    </button>
                  </div>
                  <div className="relative flex items-center">
                    <div className="absolute left-3.5 text-slate-500 pointer-events-none">
                      <FiKey size={17} />
                    </div>
                    <input
                      type="text"
                      value={credentials.securityKey}
                      onChange={(e) => setCredentials({ ...credentials, securityKey: e.target.value })}
                      placeholder="ZPLUS-SECURE-2026"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-950/70 border border-slate-700/80 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white placeholder-slate-500 text-sm font-mono outline-none transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2 text-white ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:shadow-blue-500/25'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:shadow-purple-500/25'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>AUTHENTICATING CIPHER...</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? 'INITIALIZE SECURE SESSION' : 'REGISTER & GRANT ACCESS'}</span>
                  <FiArrowRight size={16} />
                </>
              )}
            </motion.button>
          </form>

          {/* Security Compliance Footer Badges */}
          <div className="mt-8 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              AES-256 ENCRYPTED
            </span>
            <span>TLS 1.3 VERIFIED</span>
            <span>ZERO-TRUST ENCLAVE</span>
          </div>
        </motion.div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <FiArrowLeft size={14} />
            <span>Return to Portfolio Website</span>
          </button>
        </div>
      </div>
    </div>
  );
}
