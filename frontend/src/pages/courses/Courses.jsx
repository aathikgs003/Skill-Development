import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BookOpen, Calendar, Clock, Plus, X, Award } from 'lucide-react';
import api from '../../services/api';
import { toast } from 'react-toastify';

const Courses = () => {
  const { user } = useSelector((state) => state.auth);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [durationHours, setDurationHours] = useState('');
  const [level, setLevel] = useState('Beginner');

  const fetchCourses = async () => {
    try {
      const response = await api.get('/courses');
      setCourses(response.data || []);
    } catch (error) {
      console.error('Failed to fetch courses', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !durationHours) {
      return toast.error('Please fill in all fields');
    }

    try {
      await api.post('/courses', {
        title,
        description,
        category,
        durationHours: Number(durationHours),
        level,
      });
      toast.success('Course created successfully!');
      setIsModalOpen(false);
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setDurationHours('');
      setLevel('Beginner');
      fetchCourses();
    } catch (error) {
      console.error('Failed to create course', error);
    }
  };

  const isAllowedToCreate = user?.role === 'SuperAdmin' || user?.role === 'Admin' || user?.role === 'Coordinator';

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Ecosystem Courses Catalog</h2>
          <p className="text-xs text-gray-400 font-light mt-1">Browse training programs, syllabus, and course levels.</p>
        </div>
        {isAllowedToCreate && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium text-xs transition-all duration-200"
          >
            <Plus size={14} />
            <span>Add Course</span>
          </button>
        )}
      </div>

      {courses.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div key={course._id} className="rounded-2xl glass-panel p-6 border border-dark-border flex flex-col justify-between space-y-4 glass-panel-hover">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-semibold bg-indigo-500/20 text-indigo-400 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {course.category}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                    course.level === 'Beginner' 
                      ? 'bg-emerald-500/10 text-emerald-400' 
                      : course.level === 'Intermediate' 
                      ? 'bg-blue-500/10 text-blue-400' 
                      : 'bg-pink-500/10 text-pink-400'
                  }`}>
                    {course.level}
                  </span>
                </div>
                <h4 className="text-md font-bold text-white">{course.title}</h4>
                <p className="text-xs text-gray-400 font-light leading-relaxed line-clamp-3">
                  {course.description}
                </p>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-dark-border text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{course.durationHours} Hours</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen size={14} />
                  <span>{course.modules?.length || 0} Modules</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl glass-panel p-10 border border-dark-border text-center flex flex-col items-center justify-center space-y-3">
          <BookOpen className="text-gray-500" size={32} />
          <h4 className="text-md font-semibold text-white">No courses available</h4>
          <p className="text-xs text-gray-400">There are no courses loaded in the catalog at this time.</p>
        </div>
      )}

      {/* Add Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg rounded-3xl glass-panel border border-dark-border p-6 md:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div>
              <h3 className="text-lg font-bold text-white">Create New Course</h3>
              <p className="text-xs text-gray-400 font-light">Add a syllabus/training program to the platform catalog.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Course Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                  placeholder="e.g. Advanced Node.js Development"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all resize-none"
                  placeholder="e.g. Master backend engineering, asynchronous coding patterns, and worker threads."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white/5 border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                    placeholder="e.g. Web Development"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Duration (Hours)</label>
                  <input
                    type="number"
                    value={durationHours}
                    onChange={(e) => setDurationHours(e.target.value)}
                    className="w-full bg-white/5 border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                    placeholder="e.g. 40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Course Level</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="w-full bg-dark-bg border border-dark-border focus:border-primary-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-medium text-xs transition-all duration-200 mt-2"
              >
                Create Course
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
