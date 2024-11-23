'use client';

import { useState, useEffect } from 'react';
import { getComments } from './actions';

import data from "@/translations/cz/cz.json";

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  author: {
    name: string | null;
  };
}

interface CommentsListProps {
  postId: string;
}

export function CommentsList({ postId }: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      const fetchedComments = await getComments(postId);
      setComments(fetchedComments);
    };

    fetchComments();
  }, [postId]);

  return (
    <div>
      <h2 className="text-lg font-semibold"> {data.posts.comments.title} ({comments.length})</h2>
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500"> {data.generic.notFound} </p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{comment.content}</p>
              <p className="text-sm text-gray-500">
                {comment.author.name || 'Anonymous'} - {new Date(comment.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}