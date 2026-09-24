'use client';

import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ImageUpload } from '@/components/ui/ImageUpload';

export default function DashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      router.push('/login');
    }
  }, [router]);

  if (!mounted) return <div className="p-8 text-center">Loading...</div>;

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="bg-white shadow rounded-lg p-6 mb-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600">This is your dashboard. Soon you will see your generated posters here.</p>
      </div>

      <div className="bg-white shadow rounded-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Test Image Upload (Cloudinary)</h2>
        <p className="text-gray-500 text-sm mb-6">
          Since we just configured Cloudinary, you can use this block to test if your keys are working correctly. 
          When we build the poster form, this component will be used there.
        </p>
        <div className="max-w-md">
          <ImageUpload 
            label="Upload a photo" 
            onUploadSuccess={(url) => setUploadedUrl(url)} 
          />
          {uploadedUrl && (
            <div className="mt-4 p-4 bg-green-50 text-green-800 rounded-md border border-green-200">
              <p className="font-semibold">Upload successful!</p>
              <a href={uploadedUrl} target="_blank" rel="noreferrer" className="underline text-sm break-all">
                {uploadedUrl}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
