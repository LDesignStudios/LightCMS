"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function EditPostPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/admin/posts');
  });

  return null;
}
