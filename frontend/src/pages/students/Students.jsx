import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Users, GraduationCap, Mail, Phone, ShieldAlert, Award } from 'lucide-react';
import api from '../../services/api';

const Students = () => {
  const { user } = useSelector((state) => state.auth);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/students');
        setStudents(response.data || []);
      } catch (error) {
        console.error('Failed to fetch students list', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const isAuthorized = user?.role === 'SuperAdmin' || user?.role === 'Admin' || user?.role === 'Coordinator';

  if (!isAuthorized) {
    return (
      <div className="rounded-2xl glass-panel p-10 border border-dark-border text-center flex flex-col items-center justify-center space-y-3 animate-fadeIn">
        <ShieldAlert className="text-pink-500" size={32} />
        <h4 className="text-md font-semibold text-white">Access Denied</h4>
        <p className="text-xs text-gray-400">Only platform administrators or coordinators can view this panel.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-white">Learners Management Panel</h2>
        <p className="text-xs text-gray-400 font-light mt-1">
          Monitor enrolled student profiles, education levels, and academic skills.
        </p>
      </div>

      <div className="rounded-2xl glass-panel border border-dark-border overflow-hidden">
        {students.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-dark-border bg-white/5 text-[10px] md:text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Education Level</th>
                  <th className="px-6 py-4">Guardian Contact</th>
                  <th className="px-6 py-4">Acquired Skills</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border/40 text-xs font-light">
                {students.map((student) => {
                  const studentName = student.user 
                    ? `${student.user.firstName} ${student.user.lastName}` 
                    : 'Unknown Learner';

                  return (
                    <tr key={student._id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary-500/10 text-primary-400 flex items-center justify-center font-bold">
                          {studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{studentName}</p>
                          <div className="flex flex-col gap-0.5 mt-1 text-[10px] text-gray-400">
                            <span className="flex items-center gap-1">
                              <Mail size={10} />
                              {student.user?.email || 'N/A'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone size={10} />
                              {student.user?.mobile || 'N/A'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/5 text-gray-300 border border-dark-border">
                          {student.educationLevel}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        <p className="font-medium text-white">{student.guardianName}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">{student.guardianMobile}</p>
                      </td>
                      <td className="px-6 py-4">
                        {student.skills && student.skills.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5 max-w-xs">
                            {student.skills.map((skill, index) => (
                              <span key={index} className="text-[9px] font-medium bg-primary-500/10 text-primary-400 px-2 py-0.5 rounded-md">
                                {skill}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-[10px] text-gray-500 italic">No skills listed</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center flex flex-col items-center justify-center space-y-2">
            <Users className="text-gray-500" size={32} />
            <p className="text-xs text-gray-400 font-light">No students registered in the system yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Students;
