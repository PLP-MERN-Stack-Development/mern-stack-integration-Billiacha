import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { useParams } from 'react-router-dom';

export default function PostView() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    API.get(`/posts/${id}`).then(res => setPost(res.data)).catch(console.error);
  }, [id]);

  if (!post) return <div>Loading...</div>;
  return (
    <div>
      <h1>{post.title}</h1>
      {post.featuredImage && <img src={post.featuredImage.replace('/uploads','/uploads')} alt="featured" style={{maxWidth: '100%'}}/>}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <h3>Comments</h3>
      {post.comments.map((c, i) => <div key={i}><b>{c.authorName}</b>: {c.body}</div>)}
    </div>
  );
}
