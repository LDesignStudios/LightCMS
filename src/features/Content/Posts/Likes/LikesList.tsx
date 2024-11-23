'use client';

import { useState, useEffect } from 'react';
import { getPostLikes } from './actions';
// import data from "@/translations/cz/cz.json";

interface Like {
  id: string;
  user: {
    name: string | null;
  };
}

interface LikesListProps {
  postId: string;
}

export function LikesList({ postId }: LikesListProps) {
  const [likes, setLikes] = useState<Like[]>([]);

  useEffect(() => {
    const fetchLikes = async () => {
      const fetchedLikes = await getPostLikes(postId);
      setLikes(fetchedLikes);
    };

    fetchLikes();
  }, [postId]);

  return (
    <div>
      <h2 className="text-lg font-semibold"> Likes ({likes.length})</h2>
      <div className="space-y-4">
        {likes.length === 0 ? (
          <p className="text-gray-500">Not found</p>
        ) : (
          likes.map(like => (
            <div key={like.id} className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{like.user.name || 'Anonymous'}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}