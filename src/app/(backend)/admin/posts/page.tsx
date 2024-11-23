import { getPosts } from "@/features/Content/Posts/Posts/actions";
import { PostsList } from "@/features/Content/Posts/Posts/PostsList";
import { Suspense } from "react";
import data from "@/translations/cz/cz.json";
import PageHeader from "@/components/Layout/PageHeader";
import { TabComponent } from "@/components/Layout/TabComponent";
import { CommentsList } from "@/features/Content/Posts/Comments/CommentsList";
import { LikesList } from "@/features/Content/Posts/Likes/LikesList";

export default async function PostsPage() {
  const posts = await getPosts();

  const tabs = [
    { 
      label: data.posts.allPosts,
      visible: true,
      content: (
        <Suspense fallback={<div>{data.loading.loading}</div>}>
          <PostsList filter="all" initialPosts={posts} />
        </Suspense>
      )
    },
    { label: data.posts.published, visible: true, content: (
      <Suspense fallback={<div>{data.loading.loading}</div>}>
        <PostsList filter="published" initialPosts={posts} />
      </Suspense>
    ) },
    { label: data.posts.drafts, visible: true, content: (
      <Suspense fallback={<div>{data.loading.loading}</div>}>
        <PostsList filter="drafts" initialPosts={posts} />
      </Suspense>
    ) },
    { label: data.posts.comments.title, visible: true, content: (
      <Suspense fallback={<div>{data.loading.loading}</div>}>
        <CommentsList postId={posts[0]?.id} />
      </Suspense>
    ) },
    { label: data.posts.likes.title, visible: true, content: (
      <Suspense fallback={<div>{data.loading.loading}</div>}>
        <LikesList postId={posts[0]?.id} />
      </Suspense>
    ) },
  ];

  return (
    <div className="">
      <div className="">              
        <PageHeader
          title={data.posts.title}
          buttonLabel={`${data.buttons.add} ${data.buttons.new.toLowerCase()}`}
          buttonLink="/admin/posts/add-new"
        />
        
        <div className="flex">
          <TabComponent tabs={tabs} />        
        </div>               
      </div>
    </div>
  );
}