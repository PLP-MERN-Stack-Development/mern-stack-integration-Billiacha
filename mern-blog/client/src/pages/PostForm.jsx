import React, { useState, useContext } from 'react';
import API from '../api/api';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function PostForm({ editMode=false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('title', title);
    form.append('content', content);
    categories.forEach(cat => form.append('categories[]', cat));
    if (file) form.append('featuredImage', file);

    try {
      if (editMode) {
        const res = await API.put(`/posts/${id}`, form, { headers: { 'Content-Type':'multipart/form-data' }});
        navigate(`/posts/${res.data._id}`);
      } else {
        const res = await API.post('/posts', form, { headers: { 'Content-Type':'multipart/form-data' }});
        navigate(`/posts/${res.data._id}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={submit}>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required/>
      <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Content" required />
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button type="submit">Save</button>
    </form>
  );
}
