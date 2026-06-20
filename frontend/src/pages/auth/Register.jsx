import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../store/slices/authSlice';
import { User as UserIcon, Mail, Phone, Lock, Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Please enter a valid email').required('Email is required'),
  mobile: yup.string().matches(/^\d{10}$/, 'Mobile must be 10 digits').required('Mobile is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: yup.string().oneOf(['Student', 'Trainer']).required('Role selection is required'),
});

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      role: 'Student',
    }
  });

  const onSubmit = async (data) => {
    const resultAction = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(resultAction)) {
      toast.success('Registration successful! Please log in.');
      navigate('/login');
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">
          Register
        </h1>
        <p className="text-sm text-gray-400 font-light">
          Join the skill development ecosystem today.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name Fields Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">First Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <UserIcon size={16} />
              </span>
              <input
                type="text"
                placeholder="John"
                {...register('firstName')}
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
              />
            </div>
            {errors.firstName && (
              <p className="text-xs text-red-400 mt-1">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              {...register('lastName')}
              className="w-full px-4 py-3 rounded-xl glass-input text-sm"
            />
            {errors.lastName && (
              <p className="text-xs text-red-400 mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-300">Email Address</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Mail size={16} />
            </span>
            <input
              type="email"
              placeholder="john@example.com"
              {...register('email')}
              className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Mobile Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-300">Mobile Number</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Phone size={16} />
            </span>
            <input
              type="text"
              placeholder="9876543210"
              {...register('mobile')}
              className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>
          {errors.mobile && (
            <p className="text-xs text-red-400 mt-1">{errors.mobile.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-300">Password</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <Lock size={16} />
            </span>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className="w-full pl-10 pr-4 py-3 rounded-xl glass-input text-sm"
            />
          </div>
          {errors.password && (
            <p className="text-xs text-red-400 mt-1">{errors.password.message}</p>
          )}
        </div>

        {/* Role Selection */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-gray-300">I want to join as</label>
          <select
            {...register('role')}
            className="w-full px-4 py-3 rounded-xl glass-input text-sm appearance-none bg-dark-bg cursor-pointer"
          >
            <option value="Student">Student / Learner</option>
            <option value="Trainer">Trainer / Instructor</option>
          </select>
          {errors.role && (
            <p className="text-xs text-red-400 mt-1">{errors.role.message}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary-600 hover:bg-primary-500 disabled:bg-primary-800 disabled:text-gray-400 text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-primary-600/20"
        >
          {loading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            'Create Account'
          )}
        </button>
      </form>

      <div className="text-center">
        <p className="text-xs text-gray-400 font-light">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
