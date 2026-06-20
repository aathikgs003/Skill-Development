import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { User, Award, Shield, Save, RefreshCw } from 'lucide-react';
import { loadUser } from '../../store/slices/authSlice';
import api from '../../services/api';
import { toast } from 'react-toastify';

const Settings = () => {
  const { user, profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);

  // Form states
  const [educationLevel, setEducationLevel] = useState('');
  const [skills, setSkills] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianMobile, setGuardianMobile] = useState('');
  
  // Trainer form states
  const [experienceYears, setExperienceYears] = useState('');
  const [bio, setBio] = useState('');
  const [specializations, setSpecializations] = useState('');

  // Sync state with store profile
  useEffect(() => {
    if (user?.role === 'Student' && profile) {
      setEducationLevel(profile.educationLevel || 'Graduate');
      setSkills(profile.skills?.join(', ') || '');
      setGuardianName(profile.guardianName || '');
      setGuardianMobile(profile.guardianMobile || '');
    } else if (user?.role === 'Trainer' && profile) {
      setExperienceYears(profile.experienceYears || '0');
      setBio(profile.bio || '');
      setSpecializations(profile.specializations?.join(', ') || '');
    }
  }, [profile, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (user.role === 'Student') {
        const skillsArray = skills.split(',').map(s => s.trim()).filter(Boolean);
        await api.put(`/students/${profile._id}`, {
          educationLevel,
          skills: skillsArray,
          guardianName,
          guardianMobile
        });
        toast.success('Student profile updated successfully!');
      } else if (user.role === 'Trainer') {
        const specsArray = specializations.split(',').map(s => s.trim()).filter(Boolean);
        await api.put(`/trainers/${profile._id}`, {
          experienceYears: Number(experienceYears),
          bio,
          specializations: specsArray
        });
        toast.success('Trainer profile updated successfully!');
      }
      
      // Reload user store state to sync updated details
      dispatch(loadUser());
    } catch (error) {
      console.error('Failed to update settings', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white">Account Settings</h2>
        <p className="text-xs text-gray-400 font-light mt-1">
          Manage your email preferences, security configurations, and profile fields.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: General User Details (Read-only) */}
        <div className="rounded-2xl glass-panel p-6 border border-dark-border space-y-6 h-fit">
          <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-dark-border">
            <div className="h-16 w-16 rounded-full bg-primary-500/10 text-primary-400 flex items-center justify-center font-bold text-2xl border border-primary-500/20">
              {user?.firstName?.charAt(0)}
            </div>
            <div>
              <h4 className="text-md font-bold text-white">{user?.fullName}</h4>
              <p className="text-[10px] text-primary-400 font-semibold uppercase tracking-wider mt-1">{user?.role}</p>
            </div>
          </div>

          <div className="space-y-4 text-xs font-light">
            <div>
              <p className="text-gray-500 font-normal">Email Address</p>
              <p className="text-white mt-0.5 font-medium">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-500 font-normal">Mobile Number</p>
              <p className="text-white mt-0.5">{user?.mobile}</p>
            </div>
            <div>
              <p className="text-gray-500 font-normal">Gender</p>
              <p className="text-white mt-0.5">{user?.gender || 'N/A'}</p>
            </div>
            <div>
              <p className="text-gray-500 font-normal">Account Status</p>
              <span className="inline-block px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 rounded-full mt-1">
                {user?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Editable Profile Details */}
        <div className="md:col-span-2 rounded-2xl glass-panel p-6 border border-dark-border space-y-6">
          <h3 className="text-sm font-semibold text-gray-300 pb-3 border-b border-dark-border flex items-center gap-2">
            <User size={16} />
            <span>Edit Profile Details</span>
          </h3>

          {(user?.role === 'Student' || user?.role === 'Trainer') && profile ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {user.role === 'Student' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Education Level</label>
                    <select
                      value={educationLevel}
                      onChange={(e) => setEducationLevel(e.target.value)}
                      className="w-full bg-dark-bg border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all"
                    >
                      <option value="HighSchool">High School</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Graduate">Graduate</option>
                      <option value="PostGraduate">Post Graduate</option>
                      <option value="Doctorate">Doctorate</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Skills (comma-separated)</label>
                    <input
                      type="text"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      className="w-full bg-white/5 border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                      placeholder="e.g. React, Node.js, Python, CSS"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Guardian Name</label>
                      <input
                        type="text"
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        className="w-full bg-white/5 border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                        placeholder="Guardian Name"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-gray-300">Guardian Mobile</label>
                      <input
                        type="text"
                        value={guardianMobile}
                        onChange={(e) => setGuardianMobile(e.target.value)}
                        className="w-full bg-white/5 border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                        placeholder="Guardian Mobile"
                      />
                    </div>
                  </div>
                </>
              )}

              {user.role === 'Trainer' && (
                <>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Experience Years</label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(e.target.value)}
                      className="w-full bg-white/5 border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                      placeholder="Experience in years"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Bio</label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      className="w-full bg-white/5 border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all resize-none"
                      placeholder="Write a brief professional bio..."
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-300">Specializations (comma-separated)</label>
                    <input
                      type="text"
                      value={specializations}
                      onChange={(e) => setSpecializations(e.target.value)}
                      className="w-full bg-white/5 border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                      placeholder="e.g. AWS, Fullstack Development, Deep Learning"
                    />
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={saving}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 disabled:bg-primary-700 text-white font-medium text-xs transition-all duration-200"
              >
                {saving ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                <span>Save Profile Changes</span>
              </button>
            </form>
          ) : (
            <div className="py-6 text-center text-xs text-gray-500 font-light space-y-2">
              <Shield size={20} className="mx-auto text-gray-600" />
              <p>Your user profile does not require role-based specifications.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Settings;
