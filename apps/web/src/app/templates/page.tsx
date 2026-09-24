'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface Template {
  _id: string;
  title: string;
  occasionType: string;
  thumbnailUrl: string;
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'}/templates`);
        const data = await res.json();
        setTemplates(data);
      } catch (error) {
        console.error('Failed to fetch templates', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTemplates();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Template Gallery</h1>
          <p className="mt-2 text-gray-600">Choose a design to start creating your poster.</p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-gray-200 animate-pulse rounded-lg h-80 w-full"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
              <div className="relative h-64 w-full bg-gray-100">
                <Image 
                  src={template.thumbnailUrl} 
                  alt={template.title} 
                  fill 
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium shadow-sm">
                  {template.occasionType}
                </div>
              </div>
              <div className="p-4 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{template.title}</h3>
                <Link href={`/create?template=${template._id}`}>
                  <Button className="w-full mt-4">Use Template</Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
