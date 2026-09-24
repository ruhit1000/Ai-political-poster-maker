'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface Template {
  _id: string;
  title: string;
  occasionType: string;
  thumbnailUrl: string;
  layoutConfig: {
    templateFile: string;
    slots: Record<string, string>;
  };
}

function CreatePosterForm() {
  const { user } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const templateId = searchParams.get('template');
  
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [formData, setFormData] = useState({
    headline: '',
    userName: user?.name || '',
    userDesignation: '',
    userPhoto: '',
    leader1: '',
    leader2: '',
  });

  useEffect(() => {
    if (!templateId) {
      router.push('/templates');
      return;
    }

    const fetchTemplate = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/templates/${templateId}`);
        if (!res.ok) throw new Error('Template not found');
        const data = await res.json();
        setTemplate(data);
      } catch (error) {
        console.error(error);
        router.push('/templates');
      } finally {
        setLoading(false);
      }
    };
    
    fetchTemplate();
  }, [templateId, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleNextStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.headline) newErrors.headline = 'Headline is required';
    if (!formData.userName) newErrors.userName = 'Name is required';
    if (!formData.userDesignation) newErrors.userDesignation = 'Designation is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(2);
  };

  const handleNextStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.userPhoto) newErrors.userPhoto = 'Your photo is required';
    
    // Check if leader photos are required based on template slots
    if (template?.layoutConfig?.slots?.leader1 && !formData.leader1) {
      newErrors.leader1 = 'Leader photo is required';
    }
    if (template?.layoutConfig?.slots?.leader2 && !formData.leader2) {
      newErrors.leader2 = 'Second leader photo is required';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(3);
  };

  const handleGenerate = async () => {
    // Part 9 will handle the actual generation API call
    console.log('Generating with:', formData);
    alert('Generation API will be connected in Part 9! For now, your form state is valid and ready.');
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (!template) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create Poster</h1>
        <p className="text-gray-600 mt-2">Template: <span className="font-semibold">{template.title}</span></p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 -z-10 transition-all duration-300"
            style={{ width: `${(step - 1) * 50}%` }}
          ></div>
          
          {[1, 2, 3].map((num) => (
            <div 
              key={num} 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-4 transition-colors ${
                step >= num ? 'bg-blue-600 border-blue-200 text-white' : 'bg-white border-gray-200 text-gray-400'
              }`}
            >
              {num}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm font-medium text-gray-500">
          <span>Text Details</span>
          <span>Upload Photos</span>
          <span>Review & Generate</span>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6 md:p-8 border border-gray-100">
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Step 1: Text Details</h2>
            <Input 
              label="Headline (e.g., মহান বিজয় দিবস)" 
              name="headline"
              value={formData.headline}
              onChange={handleChange}
              error={errors.headline}
              placeholder="Enter main headline"
            />
            <Input 
              label="Your Name" 
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              error={errors.userName}
              placeholder="e.g. John Doe"
            />
            <Input 
              label="Your Designation / Organization" 
              name="userDesignation"
              value={formData.userDesignation}
              onChange={handleChange}
              error={errors.userDesignation}
              placeholder="e.g. President, XYZ Committee"
            />
            
            <div className="pt-4 flex justify-end">
              <Button onClick={handleNextStep1}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold mb-4">Step 2: Upload Photos</h2>
            
            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900">Your Photo (Required)</h3>
                <p className="text-sm text-gray-500 mb-4">Upload a clear portrait with a clean background.</p>
                <ImageUpload 
                  label="" 
                  onUploadSuccess={(url) => {
                    setFormData({ ...formData, userPhoto: url });
                    if (errors.userPhoto) setErrors({ ...errors, userPhoto: '' });
                  }} 
                  defaultImage={formData.userPhoto}
                />
                {errors.userPhoto && <p className="text-red-500 text-sm mt-1">{errors.userPhoto}</p>}
              </div>
            </div>

            {template.layoutConfig?.slots?.leader1 && (
              <div className="p-4 border rounded-lg bg-gray-50">
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900">Leader 1 Photo (Required)</h3>
                  <p className="text-sm text-gray-500 mb-4">Upload photo of the main leader.</p>
                  <ImageUpload 
                    label="" 
                    onUploadSuccess={(url) => {
                      setFormData({ ...formData, leader1: url });
                      if (errors.leader1) setErrors({ ...errors, leader1: '' });
                    }}
                    defaultImage={formData.leader1}
                  />
                  {errors.leader1 && <p className="text-red-500 text-sm mt-1">{errors.leader1}</p>}
                </div>
              </div>
            )}

            {template.layoutConfig?.slots?.leader2 && (
              <div className="p-4 border rounded-lg bg-gray-50">
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900">Leader 2 Photo (Required)</h3>
                  <p className="text-sm text-gray-500 mb-4">Upload photo of the secondary leader.</p>
                  <ImageUpload 
                    label="" 
                    onUploadSuccess={(url) => {
                      setFormData({ ...formData, leader2: url });
                      if (errors.leader2) setErrors({ ...errors, leader2: '' });
                    }}
                    defaultImage={formData.leader2}
                  />
                  {errors.leader2 && <p className="text-red-500 text-sm mt-1">{errors.leader2}</p>}
                </div>
              </div>
            )}

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={handleNextStep2}>Next Step</Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Step 3: Review & Generate</h2>
            
            <div className="bg-gray-50 p-6 rounded-lg border">
              <h3 className="font-medium text-lg mb-4 border-b pb-2">Text Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Headline</p>
                  <p className="font-medium">{formData.headline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-medium">{formData.userName}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-500">Designation</p>
                  <p className="font-medium">{formData.userDesignation}</p>
                </div>
              </div>

              <h3 className="font-medium text-lg mb-4 border-b pb-2">Photos</h3>
              <div className="flex flex-wrap gap-4">
                {formData.userPhoto && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                      <Image src={formData.userPhoto} alt="User" fill className="object-cover" />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">You</span>
                  </div>
                )}
                {formData.leader1 && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                      <Image src={formData.leader1} alt="Leader 1" fill className="object-cover" />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Leader 1</span>
                  </div>
                )}
                {formData.leader2 && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden border">
                      <Image src={formData.leader2} alt="Leader 2" fill className="object-cover" />
                    </div>
                    <span className="text-xs text-gray-500 mt-1">Leader 2</span>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
              <Button onClick={handleGenerate} className="bg-green-600 hover:bg-green-700 focus:ring-green-500 border-transparent text-white">
                Generate Poster with AI
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CreatePosterPage() {
  return (
    <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center"><Loader2 className="animate-spin h-8 w-8 text-blue-600" /></div>}>
      <CreatePosterForm />
    </Suspense>
  );
}
