import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import api from '../../services/api';
import {
  Calendar,
  Clock,
  User,
  Plus,
  Check,
  AlertTriangle,
  Sliders,
  Settings,
  ShieldAlert,
  List,
  Sparkles,
  RefreshCw,
  X,
  Filter,
  DollarSign,
  Award,
  BookOpen,
  ChevronRight,
  TrendingUp,
  MapPin,
  CalendarDays
} from 'lucide-react';

const SchedulingDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('');
  
  // Data States
  const [openWindows, setOpenWindows] = useState([]);
  const [allWindows, setAllWindows] = useState([]);
  const [trainerSlots, setTrainerSlots] = useState([]);
  const [moduleSchedules, setModuleSchedules] = useState([]);
  const [conflicts, setConflicts] = useState([]);
  const [allocationRules, setAllocationRules] = useState([]);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [trainers, setTrainers] = useState([]);

  // Form States
  const [windowForm, setWindowForm] = useState({
    courseId: '',
    batchId: '',
    windowName: '',
    windowType: 'Course Registration',
    registrationStartAt: '',
    registrationEndAt: '',
    maxApplicants: 30,
    waitlistEnabled: true,
    waitlistCapacity: 10,
    eligibilityCheckRequired: true,
    autoApproval: false,
    notificationEnabled: true
  });

  const [slotForm, setSlotForm] = useState({
    slotDate: '',
    dayOfWeek: 'Monday',
    startTime: '09:00',
    endTime: '11:00',
    slotType: 'One-Time',
    mode: 'Online',
    maxStudents: 30,
    recurrencePattern: {
      frequency: 'Weekly',
      interval: 1,
      endDate: ''
    }
  });

  const [ruleForm, setRuleForm] = useState({
    ruleName: '',
    entityType: 'Trainer',
    priority: 3,
    weightConfig: {
      skillMatch: 40,
      availability: 30,
      rating: 20,
      cost: 10
    },
    minSkillMatchPct: 50,
    minRating: 3.5,
    autoAssign: false,
    isActive: true
  });

  // Modal / Drawer States
  const [showRecModal, setShowRecModal] = useState(false);
  const [selectedModuleSchedule, setSelectedModuleSchedule] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const [loading, setLoading] = useState(false);

  // Set default tab based on user role
  useEffect(() => {
    if (user) {
      if (user.role === 'Student') {
        setActiveTab('registrations');
      } else if (user.role === 'Trainer') {
        setActiveTab('availability');
      } else {
        setActiveTab('windows');
      }
    }
  }, [user]);

  // Load baseline metadata
  useEffect(() => {
    if (user && user.role !== 'Student' && user.role !== 'Trainer') {
      fetchCoursesAndBatches();
      fetchTrainers();
    }
  }, [user]);

  // Load tab-specific data
  useEffect(() => {
    if (!activeTab) return;
    if (activeTab === 'registrations') {
      fetchOpenWindows();
    } else if (activeTab === 'availability') {
      fetchTrainerSlots();
    } else if (activeTab === 'windows') {
      fetchAllWindows();
    } else if (activeTab === 'modules') {
      fetchModuleSchedules();
    } else if (activeTab === 'conflicts') {
      fetchConflicts();
    } else if (activeTab === 'rules') {
      fetchRules();
    }
  }, [activeTab]);

  const fetchCoursesAndBatches = async () => {
    try {
      const courseRes = await api.get('/courses');
      setCourses(courseRes.data || []);
      const batchRes = await api.get('/batch');
      setBatches(batchRes.data || []);
    } catch (err) {
      console.error('Error fetching courses/batches', err);
    }
  };

  const fetchTrainers = async () => {
    try {
      const res = await api.get('/trainer');
      setTrainers(res.data || []);
    } catch (err) {
      console.error('Error fetching trainers', err);
    }
  };

  const fetchOpenWindows = async () => {
    setLoading(true);
    try {
      const res = await api.get('/scheduling/registrationWindows/open');
      setOpenWindows(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAllWindows = async () => {
    setLoading(true);
    try {
      const res = await api.get('/scheduling/registrationWindows');
      setAllWindows(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTrainerSlots = async () => {
    setLoading(true);
    try {
      // If user is trainer, pass their trainer profile ID
      // If we don't have trainer ID in state, look it up in backend
      const res = await api.get(`/scheduling/trainerTimeSlots/trainer/my-slots`);
      setTrainerSlots(res.data || []);
    } catch (err) {
      // In case fallback profile is needed, let's fetch by user's trainer profile
      try {
        const trainerProfile = await api.get('/trainer/profile');
        if (trainerProfile?.data?._id) {
          const res = await api.get(`/scheduling/trainerTimeSlots/trainer/${trainerProfile.data._id}/available`);
          setTrainerSlots(res.data || []);
        }
      } catch (innerErr) {
        console.error(innerErr);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchModuleSchedules = async () => {
    setLoading(true);
    try {
      const res = await api.get('/scheduling/moduleSchedules');
      setModuleSchedules(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchConflicts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/scheduling/scheduleConflicts');
      setConflicts(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRules = async () => {
    setLoading(true);
    try {
      const res = await api.get('/scheduling/allocationRules');
      setAllocationRules(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Actions
  const handleRegister = async (windowId) => {
    try {
      const res = await api.post(`/scheduling/registrationWindows/${windowId}/register`);
      toast.success(`Successfully registered! Status: ${res.data.status}`);
      fetchOpenWindows();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseWindow = async (windowId) => {
    try {
      await api.patch(`/scheduling/registrationWindows/${windowId}/close`);
      toast.success('Registration window closed successfully');
      fetchAllWindows();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateWindow = async (e) => {
    e.preventDefault();
    try {
      await api.post('/scheduling/registrationWindows', windowForm);
      toast.success('Registration window created successfully');
      fetchAllWindows();
      // Reset form
      setWindowForm({
        courseId: '',
        batchId: '',
        windowName: '',
        windowType: 'Course Registration',
        registrationStartAt: '',
        registrationEndAt: '',
        maxApplicants: 30,
        waitlistEnabled: true,
        waitlistCapacity: 10,
        eligibilityCheckRequired: true,
        autoApproval: false,
        notificationEnabled: true
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSlot = async (e) => {
    e.preventDefault();
    try {
      // Find trainer ID
      let trainerId = '';
      const trainerProfile = await api.get('/trainer/profile');
      trainerId = trainerProfile.data._id;

      if (!trainerId) {
        toast.error('Could not resolve Trainer Profile');
        return;
      }

      await api.post('/scheduling/trainerTimeSlots', { trainerId, ...slotForm });
      toast.success('Availability slot added successfully');
      fetchTrainerSlots();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelSlot = async (slotId) => {
    try {
      await api.patch(`/scheduling/trainerTimeSlots/${slotId}/cancel`, { reason: 'Trainer requested cancellation' });
      toast.success('Slot availability blocked/cancelled');
      fetchTrainerSlots();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAutoAllocate = async (scheduleId) => {
    try {
      toast.info('Running auto-allocation rules...');
      const res = await api.post(`/scheduling/moduleSchedules/allocate/trainer/${scheduleId}`);
      toast.success(`Trainer Allocated: ${res.data.assignedTrainer.trainerName} (Score: ${res.data.assignedTrainer.overallScore})`);
      fetchModuleSchedules();
    } catch (err) {
      console.error(err);
    }
  };

  const handleGetRecommendations = async (schedule) => {
    setSelectedModuleSchedule(schedule);
    setShowRecModal(true);
    setLoadingRecs(true);
    try {
      const res = await api.get(`/scheduling/moduleSchedules/recommend/trainer/${schedule._id}`);
      setRecommendations(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingRecs(false);
    }
  };

  const handleAssignTrainer = async (trainerId) => {
    try {
      await api.put(`/scheduling/moduleSchedules/${selectedModuleSchedule._id}`, {
        assignedTrainerId: trainerId,
        scheduleStatus: 'Scheduled'
      });
      toast.success('Trainer manually assigned successfully');
      setShowRecModal(false);
      fetchModuleSchedules();
    } catch (err) {
      console.error(err);
    }
  };

  const handleResolveConflict = async (conflictId, status) => {
    const action = prompt('Enter resolution comments:');
    if (action === null) return;
    try {
      await api.patch(`/scheduling/scheduleConflicts/${conflictId}/resolve`, {
        resolutionStatus: status,
        resolutionAction: action
      });
      toast.success(`Conflict marked as ${status}`);
      fetchConflicts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateRule = async (e) => {
    e.preventDefault();
    try {
      await api.post('/scheduling/allocationRules', ruleForm);
      toast.success('Allocation rule created successfully');
      fetchRules();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleRule = async (rule) => {
    try {
      await api.put(`/scheduling/allocationRules/${rule._id}`, {
        isActive: !rule.isActive
      });
      toast.success('Rule toggled successfully');
      fetchRules();
    } catch (err) {
      console.error(err);
    }
  };

  // UI Tabs Config
  const tabs = [
    { id: 'registrations', name: 'Open Registrations', role: ['Student'] },
    { id: 'availability', name: 'My Availability', role: ['Trainer'] },
    { id: 'windows', name: 'Registration Windows', role: ['SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'] },
    { id: 'modules', name: 'Module Schedules', role: ['SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'] },
    { id: 'conflicts', name: 'Conflict logs', role: ['SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'] },
    { id: 'rules', name: 'Allocation Rules', role: ['SuperAdmin', 'Admin', 'Partner', 'Organization', 'Coordinator'] },
  ].filter(tab => tab.role.includes(user?.role));

  return (
    <div className="space-y-6">
      {/* Premium Header Card */}
      <div className="relative overflow-hidden rounded-2xl glass-panel p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-mesh">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary-500/20 text-primary-400 border border-primary-500/30">
              SaaS Engine v2.0
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Scheduling & Auto-Allocation Center</h2>
          <p className="text-gray-400 max-w-xl text-sm leading-relaxed">
            Manage course enrollment schedules, optimize trainer allocation utilizing rule-based scoring engines, and resolve scheduling overlaps in real-time.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              if (activeTab === 'registrations') fetchOpenWindows();
              if (activeTab === 'windows') fetchAllWindows();
              if (activeTab === 'availability') fetchTrainerSlots();
              if (activeTab === 'modules') fetchModuleSchedules();
              if (activeTab === 'conflicts') fetchConflicts();
              if (activeTab === 'rules') fetchRules();
            }}
            className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <RefreshCw size={16} />
            <span>Sync Engine</span>
          </button>
        </div>
      </div>

      {/* Tabs Panel */}
      <div className="flex gap-2 border-b border-dark-border overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 rounded-t-xl text-sm font-medium transition-all whitespace-nowrap border-b-2 ${
              activeTab === tab.id
                ? 'border-primary-500 text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white hover:bg-white/2'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Contents */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="animate-spin text-primary-400" size={32} />
        </div>
      ) : (
        <div className="space-y-6">
          {/* TAB: Student Open Registrations */}
          {activeTab === 'registrations' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {openWindows.length === 0 ? (
                <div className="col-span-full text-center py-12 glass-panel rounded-xl text-gray-400">
                  <BookOpen className="mx-auto mb-3" size={36} />
                  <p>No registration windows are open right now.</p>
                </div>
              ) : (
                openWindows.map((win) => (
                  <div key={win._id} className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-2">
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {win.windowType}
                        </span>
                        <div className="flex items-center text-xs text-gray-400 gap-1">
                          <Clock size={12} />
                          <span>Closes soon</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold text-lg text-white">{win.windowName}</h3>
                        <p className="text-sm text-primary-400">{win.courseId?.title}</p>
                      </div>
                      <div className="space-y-2 border-t border-white/5 pt-4 text-sm text-gray-300">
                        <div className="flex justify-between">
                          <span>Batch Reference:</span>
                          <span className="text-white font-medium">{win.batchId?.name || 'Open Enrollment'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Seats Left:</span>
                          <span className="text-white font-medium">
                            {win.maxApplicants - win.currentApplicants} / {win.maxApplicants}
                          </span>
                        </div>
                        {win.waitlistEnabled && (
                          <div className="flex justify-between text-xs text-gray-400">
                            <span>Waitlist:</span>
                            <span>{win.currentWaitlist} / {win.waitlistCapacity}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRegister(win._id)}
                      className="mt-6 w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <Check size={16} />
                      <span>Register Now</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB: Trainer Availability */}
          {activeTab === 'availability' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Add Availability Slot Form */}
              <div className="glass-panel rounded-2xl p-6 h-fit space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Declare Availability</h3>
                  <p className="text-xs text-gray-400">Add free time slots where you are free to teach.</p>
                </div>
                <form onSubmit={handleAddSlot} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Date</label>
                    <input
                      type="date"
                      value={slotForm.slotDate}
                      onChange={(e) => setSlotForm({ ...slotForm, slotDate: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Start Time</label>
                      <input
                        type="time"
                        value={slotForm.startTime}
                        onChange={(e) => setSlotForm({ ...slotForm, startTime: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">End Time</label>
                      <input
                        type="time"
                        value={slotForm.endTime}
                        onChange={(e) => setSlotForm({ ...slotForm, endTime: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Slot Type</label>
                      <select
                        value={slotForm.slotType}
                        onChange={(e) => setSlotForm({ ...slotForm, slotType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      >
                        <option value="One-Time">One-Time</option>
                        <option value="Recurring">Recurring</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Mode</label>
                      <select
                        value={slotForm.mode}
                        onChange={(e) => setSlotForm({ ...slotForm, mode: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      >
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                        <option value="Hybrid">Hybrid</option>
                      </select>
                    </div>
                  </div>

                  {slotForm.slotType === 'Recurring' && (
                    <div className="border-t border-white/5 pt-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400">Day of Week</label>
                          <select
                            value={slotForm.dayOfWeek}
                            onChange={(e) => setSlotForm({ ...slotForm, dayOfWeek: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                          >
                            {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((d) => (
                              <option key={d} value={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs text-gray-400">End Date</label>
                          <input
                            type="date"
                            value={slotForm.recurrencePattern.endDate}
                            onChange={(e) => setSlotForm({
                              ...slotForm,
                              recurrencePattern: { ...slotForm.recurrencePattern, endDate: e.target.value }
                            })}
                            required
                            className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3 mt-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <Plus size={16} />
                    <span>Create Slot(s)</span>
                  </button>
                </form>
              </div>

              {/* Slots List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Declared Slots</h3>
                  <span className="text-xs text-gray-400">{trainerSlots.length} Slots Total</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trainerSlots.length === 0 ? (
                    <div className="col-span-full py-16 text-center glass-panel rounded-xl text-gray-400">
                      <CalendarDays className="mx-auto mb-3" size={32} />
                      <p>You haven't declared any availability slots yet.</p>
                    </div>
                  ) : (
                    trainerSlots.map((slot) => (
                      <div key={slot._id} className="glass-panel p-5 rounded-2xl flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className={`px-2.5 py-0.5 text-2xs font-semibold rounded-full ${
                              slot.availabilityStatus === 'Available' ? 'bg-emerald-500/20 text-emerald-400' :
                              slot.availabilityStatus === 'Booked' ? 'bg-indigo-500/20 text-indigo-400' : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {slot.availabilityStatus}
                            </span>
                            <span className="text-xs text-gray-400 font-medium">{slot.slotType}</span>
                          </div>
                          <h4 className="font-semibold text-white">
                            {new Date(slot.slotDate).toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
                          </h4>
                          <div className="flex items-center text-xs text-gray-300 gap-1.5">
                            <Clock size={13} />
                            <span>{slot.startTime} - {slot.endTime} ({slot.durationMinutes} mins)</span>
                          </div>
                        </div>
                        {slot.availabilityStatus === 'Available' && (
                          <button
                            onClick={() => handleCancelSlot(slot._id)}
                            className="w-full py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold transition-all border border-rose-500/20"
                          >
                            Block / Cancel Slot
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: Registration Windows Management */}
          {activeTab === 'windows' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Window Form */}
              <div className="glass-panel rounded-2xl p-6 h-fit space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">New Registration Window</h3>
                  <p className="text-xs text-gray-400">Launch a new course enrollment portal for students.</p>
                </div>
                <form onSubmit={handleCreateWindow} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Window Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Java Basics Winter 2026"
                      value={windowForm.windowName}
                      onChange={(e) => setWindowForm({ ...windowForm, windowName: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Course</label>
                    <select
                      value={windowForm.courseId}
                      onChange={(e) => setWindowForm({ ...windowForm, courseId: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    >
                      <option value="">Select Course</option>
                      {courses.map((c) => (
                        <option key={c._id} value={c._id}>{c.title}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Batch (Optional)</label>
                    <select
                      value={windowForm.batchId}
                      onChange={(e) => setWindowForm({ ...windowForm, batchId: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    >
                      <option value="">None (Open course level)</option>
                      {batches.map((b) => (
                        <option key={b._id} value={b._id}>{b.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Opens At</label>
                      <input
                        type="datetime-local"
                        value={windowForm.registrationStartAt}
                        onChange={(e) => setWindowForm({ ...windowForm, registrationStartAt: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Closes At</label>
                      <input
                        type="datetime-local"
                        value={windowForm.registrationEndAt}
                        onChange={(e) => setWindowForm({ ...windowForm, registrationEndAt: e.target.value })}
                        required
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Max Capacity</label>
                      <input
                        type="number"
                        value={windowForm.maxApplicants}
                        onChange={(e) => setWindowForm({ ...windowForm, maxApplicants: parseInt(e.target.value) })}
                        required
                        min="1"
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Window Type</label>
                      <select
                        value={windowForm.windowType}
                        onChange={(e) => setWindowForm({ ...windowForm, windowType: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      >
                        <option value="Course Registration">Course Registration</option>
                        <option value="Batch Enrollment">Batch Enrollment</option>
                        <option value="Module Registration">Module Registration</option>
                        <option value="Assessment">Assessment</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex gap-6 py-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                      <input
                        type="checkbox"
                        checked={windowForm.autoApproval}
                        onChange={(e) => setWindowForm({ ...windowForm, autoApproval: e.target.checked })}
                        className="rounded accent-primary-500"
                      />
                      <span>Auto Approve</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                      <input
                        type="checkbox"
                        checked={windowForm.waitlistEnabled}
                        onChange={(e) => setWindowForm({ ...windowForm, waitlistEnabled: e.target.checked })}
                        className="rounded accent-primary-500"
                      />
                      <span>Enable Waitlist</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    <span>Launch Window</span>
                  </button>
                </form>
              </div>

              {/* Windows List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold font-sans">Active Windows</h3>
                  <span className="text-xs text-gray-400">{allWindows.length} Total</span>
                </div>
                <div className="space-y-4">
                  {allWindows.length === 0 ? (
                    <div className="py-16 text-center glass-panel rounded-xl text-gray-400">
                      <BookOpen className="mx-auto mb-3" size={32} />
                      <p>No registration windows found.</p>
                    </div>
                  ) : (
                    allWindows.map((win) => (
                      <div key={win._id} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className={`px-2.5 py-0.5 text-2xs font-semibold rounded-full ${
                              win.status === 'Open' ? 'bg-emerald-500/20 text-emerald-400' :
                              win.status === 'Upcoming' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {win.status}
                            </span>
                            <span className="text-2xs text-gray-400 font-medium">{win.windowType}</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-lg">{win.windowName}</h4>
                            <p className="text-sm text-primary-400">{win.courseId?.title}</p>
                          </div>
                          <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                            <div className="flex items-center gap-1">
                              <Calendar size={13} />
                              <span>Ends: {new Date(win.registrationEndAt).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User size={13} />
                              <span>Enrolled: {win.currentApplicants} / {win.maxApplicants}</span>
                            </div>
                          </div>
                        </div>
                        {win.status === 'Open' && (
                          <button
                            onClick={() => handleCloseWindow(win._id)}
                            className="px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/25 rounded-xl text-sm font-medium transition-all"
                          >
                            Close Manually
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: Module Schedules */}
          {activeTab === 'modules' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Course Module Timelines</h3>
                  <p className="text-xs text-gray-400">Manage individual course modules, planning start/end dates, and trainer allocations.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {moduleSchedules.length === 0 ? (
                  <div className="py-16 text-center glass-panel rounded-xl text-gray-400">
                    <List className="mx-auto mb-3" size={32} />
                    <p>No module schedules have been defined yet.</p>
                  </div>
                ) : (
                  moduleSchedules.map((sched) => (
                    <div key={sched._id} className="glass-panel p-6 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-full bg-primary-500/20 text-primary-400 text-2xs font-semibold">
                            Module {sched.moduleOrder}
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-full text-2xs font-semibold ${
                            sched.scheduleStatus === 'Scheduled' ? 'bg-emerald-500/20 text-emerald-400' :
                            sched.scheduleStatus === 'In Progress' ? 'bg-sky-500/20 text-sky-400' :
                            sched.scheduleStatus === 'Planned' ? 'bg-amber-500/20 text-amber-400' : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {sched.scheduleStatus}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white">{sched.moduleName}</h4>
                          <p className="text-sm text-gray-400">{sched.courseId?.title} (Batch: {sched.batchId?.name})</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-300">
                          <div>
                            <span className="text-gray-400 block text-3xs uppercase tracking-wider">Start / End</span>
                            <span>{new Date(sched.plannedStartDate).toLocaleDateString()} - {new Date(sched.plannedEndDate).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-3xs uppercase tracking-wider">Frequency</span>
                            <span>{sched.sessionsPerWeek} sessions/wk ({sched.sessionDurationMinutes} mins)</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-3xs uppercase tracking-wider">Assigned Trainer</span>
                            <span className="text-white font-medium flex items-center gap-1">
                              <User size={12} />
                              {sched.assignedTrainerId ? 
                                `${sched.assignedTrainerId.user?.firstName || ''} ${sched.assignedTrainerId.user?.lastName || ''}`.trim() :
                                'Unassigned'
                              }
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-3xs uppercase tracking-wider">Progress</span>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="w-16 bg-white/10 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-primary-500 h-full" style={{ width: `${sched.progressPct || 0}%` }} />
                              </div>
                              <span>{sched.progressPct || 0}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-center gap-2.5">
                        <button
                          onClick={() => handleGetRecommendations(sched)}
                          className="w-full sm:w-auto px-4 py-2.5 bg-white/5 hover:bg-white/10 text-gray-200 border border-white/10 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                        >
                          <Sliders size={13} />
                          <span>Recommendations</span>
                        </button>
                        <button
                          onClick={() => handleAutoAllocate(sched._id)}
                          className="w-full sm:w-auto px-4 py-2.5 bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 text-white rounded-xl text-xs font-semibold transition-all shadow-md shadow-primary-600/20 flex items-center justify-center gap-1.5"
                        >
                          <Sparkles size={13} />
                          <span>Auto Allocate</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: Conflict Logs */}
          {activeTab === 'conflicts' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">Schedule Overlap Conflict Logs</h3>
                  <p className="text-xs text-gray-400 font-sans">The conflict resolution center flags trainers scheduled for multiple sessions at the same time.</p>
                </div>
              </div>
              <div className="space-y-4">
                {conflicts.length === 0 ? (
                  <div className="py-16 text-center glass-panel rounded-xl text-gray-400">
                    <ShieldAlert className="mx-auto mb-3" size={32} />
                    <p>Hooray! No scheduling conflicts detected.</p>
                  </div>
                ) : (
                  conflicts.map((conf) => (
                    <div key={conf._id} className="glass-panel p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-l-rose-500">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-2xs font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30`}>
                            {conf.severity} Severity
                          </span>
                          <span className="text-2xs text-gray-400 font-medium">{conf.conflictType}</span>
                        </div>
                        <div>
                          <h4 className="text-base font-semibold text-white flex items-center gap-1.5">
                            <AlertTriangle size={15} className="text-rose-400" />
                            <span>Trainer Collision Detected</span>
                          </h4>
                          <p className="text-xs text-gray-400 mt-0.5">Date: {new Date(conf.conflictDate).toLocaleDateString()} | Time: {conf.startTime} - {conf.endTime}</p>
                        </div>
                        <div className="text-xs text-gray-300">
                          <span className="text-gray-400">Status: </span>
                          <span className={`font-semibold ${
                            conf.resolutionStatus === 'Pending' ? 'text-amber-400' :
                            conf.resolutionStatus === 'Resolved' ? 'text-emerald-400' : 'text-gray-400'
                          }`}>{conf.resolutionStatus}</span>
                          {conf.resolutionAction && (
                            <p className="mt-1 text-gray-400 italic">" {conf.resolutionAction} "</p>
                          )}
                        </div>
                      </div>
                      {conf.resolutionStatus === 'Pending' && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleResolveConflict(conf._id, 'Resolved')}
                            className="px-3.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl text-xs font-semibold transition-all"
                          >
                            Resolve Overlap
                          </button>
                          <button
                            onClick={() => handleResolveConflict(conf._id, 'Ignored')}
                            className="px-3.5 py-2 bg-white/5 hover:bg-white/10 text-gray-400 border border-white/10 rounded-xl text-xs font-semibold transition-all"
                          >
                            Ignore
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB: Allocation Rules */}
          {activeTab === 'rules' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Create Rule Form */}
              <div className="glass-panel rounded-2xl p-6 h-fit space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Add Custom Rule</h3>
                  <p className="text-xs text-gray-400">Set matching weight metrics for trainers.</p>
                </div>
                <form onSubmit={handleCreateRule} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs text-gray-400">Rule Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Core Programming Course Allocation"
                      value={ruleForm.ruleName}
                      onChange={(e) => setRuleForm({ ...ruleForm, ruleName: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                    />
                  </div>
                  
                  {/* Weights range config */}
                  <div className="space-y-3">
                    <h5 className="text-xs font-semibold text-white">Config Scoring Weights (Total 100%)</h5>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-2xs text-gray-400">
                        <span>Skill Match Weight</span>
                        <span>{ruleForm.weightConfig.skillMatch}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={ruleForm.weightConfig.skillMatch}
                        onChange={(e) => setRuleForm({
                          ...ruleForm,
                          weightConfig: { ...ruleForm.weightConfig, skillMatch: parseInt(e.target.value) }
                        })}
                        className="w-full accent-primary-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-2xs text-gray-400">
                        <span>Availability Weight</span>
                        <span>{ruleForm.weightConfig.availability}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={ruleForm.weightConfig.availability}
                        onChange={(e) => setRuleForm({
                          ...ruleForm,
                          weightConfig: { ...ruleForm.weightConfig, availability: parseInt(e.target.value) }
                        })}
                        className="w-full accent-primary-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-2xs text-gray-400">
                        <span>Average Rating Weight</span>
                        <span>{ruleForm.weightConfig.rating}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={ruleForm.weightConfig.rating}
                        onChange={(e) => setRuleForm({
                          ...ruleForm,
                          weightConfig: { ...ruleForm.weightConfig, rating: parseInt(e.target.value) }
                        })}
                        className="w-full accent-primary-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-2xs text-gray-400">
                        <span>Cost Weight</span>
                        <span>{ruleForm.weightConfig.cost}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={ruleForm.weightConfig.cost}
                        onChange={(e) => setRuleForm({
                          ...ruleForm,
                          weightConfig: { ...ruleForm.weightConfig, cost: parseInt(e.target.value) }
                        })}
                        className="w-full accent-primary-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Min Skill %</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={ruleForm.minSkillMatchPct}
                        onChange={(e) => setRuleForm({ ...ruleForm, minSkillMatchPct: parseInt(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs text-gray-400">Min Rating</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={ruleForm.minRating}
                        onChange={(e) => setRuleForm({ ...ruleForm, minRating: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2.5 rounded-xl glass-input text-sm"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300 py-1">
                    <input
                      type="checkbox"
                      checked={ruleForm.autoAssign}
                      onChange={(e) => setRuleForm({ ...ruleForm, autoAssign: e.target.checked })}
                      className="rounded accent-primary-500"
                    />
                    <span>Automatically Assign Best Match</span>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-700 text-white font-semibold transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Plus size={16} />
                    <span>Create Custom Rule</span>
                  </button>
                </form>
              </div>

              {/* Rules List */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold font-sans">Active Rules</h3>
                  <span className="text-xs text-gray-400">{allocationRules.length} Rules Defined</span>
                </div>
                <div className="space-y-4">
                  {allocationRules.length === 0 ? (
                    <div className="py-16 text-center glass-panel rounded-xl text-gray-400">
                      <Sliders className="mx-auto mb-3" size={32} />
                      <p>No allocation rules found. Default rule weights apply.</p>
                    </div>
                  ) : (
                    allocationRules.map((rule) => (
                      <div key={rule._id} className="glass-panel p-6 rounded-2xl space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-semibold text-white">{rule.ruleName}</h4>
                            <span className="text-2xs text-gray-400">Priority: {rule.priority} | Entity: {rule.entityType}</span>
                          </div>
                          <button
                            onClick={() => handleToggleRule(rule)}
                            className={`px-3 py-1 text-2xs font-semibold rounded-full transition-all border ${
                              rule.isActive 
                                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
                                : 'bg-white/5 text-gray-400 border-white/10'
                            }`}
                          >
                            {rule.isActive ? 'Active' : 'Disabled'}
                          </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-white/2 p-3 rounded-xl border border-white/5 text-center text-xs text-gray-300">
                          <div>
                            <span className="text-gray-400 block text-3xs uppercase">Skill Match</span>
                            <span className="font-semibold">{rule.weightConfig.skillMatch}%</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-3xs uppercase">Availability</span>
                            <span className="font-semibold">{rule.weightConfig.availability}%</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-3xs uppercase">Avg Rating</span>
                            <span className="font-semibold">{rule.weightConfig.rating}%</span>
                          </div>
                          <div>
                            <span className="text-gray-400 block text-3xs uppercase">Cost Score</span>
                            <span className="font-semibold">{rule.weightConfig.cost}%</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODAL: Trainer Recommendations (Manual Override) */}
      {showRecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="glass-panel rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] bg-[#0c0a15]">
            <div className="p-6 border-b border-dark-border flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">Recommended Trainers</h3>
                <p className="text-xs text-gray-400 mt-0.5">Ranked by scoring rules matching module availability requirements.</p>
              </div>
              <button 
                onClick={() => setShowRecModal(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-4 flex-1 no-scrollbar">
              {loadingRecs ? (
                <div className="flex flex-col items-center justify-center py-12 space-y-3">
                  <RefreshCw className="animate-spin text-primary-400" size={32} />
                  <span className="text-sm text-gray-400">Querying availability maps...</span>
                </div>
              ) : recommendations.length === 0 ? (
                <div className="py-12 text-center text-gray-400 text-sm">
                  <User className="mx-auto mb-2" size={32} />
                  <p>No trainers match availability schedules for this module.</p>
                </div>
              ) : (
                recommendations.map((cand, index) => (
                  <div key={cand.trainerId} className="glass-panel p-5 rounded-2xl border border-white/5 hover:border-primary-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary-400">#{index + 1} Candidate</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-primary-500/25 text-primary-300 text-3xs font-semibold">
                          Score: {cand.overallScore}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-base">{cand.trainerName}</h4>
                        <div className="flex items-center gap-4 text-xs text-gray-400 mt-1">
                          <span className="flex items-center gap-0.5"><Award size={13} className="text-amber-400" /> {cand.rating}/5</span>
                          <span className="flex items-center gap-0.5"><DollarSign size={13} className="text-emerald-400" /> ${cand.hourlyRate}/hr</span>
                          <span className="flex items-center gap-0.5"><Calendar size={13} className="text-sky-400" /> {cand.availableSlotsCount} slots</span>
                        </div>
                      </div>
                      
                      {/* Score breakdown metrics */}
                      <div className="flex flex-wrap gap-2 pt-1.5 text-3xs text-gray-400">
                        <span className="bg-white/2 px-2 py-1 rounded">Skills Match: {cand.scores?.skillScore}</span>
                        <span className="bg-white/2 px-2 py-1 rounded">Availability: {cand.scores?.availabilityScore}</span>
                        <span className="bg-white/2 px-2 py-1 rounded">Rating Score: {cand.scores?.ratingScore}</span>
                        <span className="bg-white/2 px-2 py-1 rounded">Cost Factor: {cand.scores?.costScore}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAssignTrainer(cand.trainerId)}
                      className="px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 whitespace-nowrap"
                    >
                      <span>Assign Trainer</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>
            
            <div className="p-4 bg-white/2 border-t border-dark-border flex justify-end">
              <button
                onClick={() => setShowRecModal(false)}
                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 text-sm font-semibold transition-all border border-white/5"
              >
                Close Recommendations
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulingDashboard;
