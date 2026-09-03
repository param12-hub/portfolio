import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '../lib/api';
import { GlassCard } from '../components/common/GlassCard';
import { Mail, Send, CheckCircle2, MapPin, Globe, PhoneCall } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setServerError('');
      await api.sendMessage(data);
      setSubmitted(true);
      reset();
    } catch (err: any) {
      setServerError(err.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 space-y-12">
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">GET IN TOUCH</span>
        <h1 className="text-4xl font-extrabold text-slate-100">Let's Build Something Exceptional</h1>
        <p className="text-base text-slate-400 leading-relaxed">
          Have a new product idea, cloud architecture inquiry, or high-performance project? Send a message below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <GlassCard className="space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Mail className="w-5 h-5 text-indigo-400" /> Contact Details
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-slate-400" />
                <span>Hyderabad, India</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-slate-400" />
                <span>parameshrajuri@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Globe className="w-4 h-4 text-slate-400" />
                <span>Available Globally (Remote)</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-2 border-emerald-500/30 bg-emerald-500/5">
            <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Response Time SLA</span>
            </div>
            <p className="text-xs text-slate-300">Usually responds within 2 - 4 business hours.</p>
          </GlassCard>
        </div>

        {/* Validated Form */}
        <div className="lg:col-span-2">
          <GlassCard className="space-y-6">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-slate-100">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-400">Thank you for reaching out. I'll get back to you shortly.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      {...register('name')}
                      placeholder="Alex Smith"
                      className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name.message}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Email</label>
                    <input
                      type="email"
                      {...register('email')}
                      placeholder="alex@company.dev"
                      className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                    />
                    {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Subject (Optional)</label>
                  <input
                    type="text"
                    {...register('subject')}
                    placeholder="Project Inquiry / Advisory"
                    className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase mb-1">Your Message</label>
                  <textarea
                    rows={5}
                    {...register('message')}
                    placeholder="Tell me about your project scope, goals, and timeline..."
                    className="w-full px-4 py-3 bg-slate-900/60 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                  {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message.message}</p>}
                </div>

                {serverError && <p className="text-xs text-rose-400">{serverError}</p>}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
