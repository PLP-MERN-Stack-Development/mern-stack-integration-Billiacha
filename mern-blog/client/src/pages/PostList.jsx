import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await API.get('/posts', { params: { page, limit: 10, search }});
      setPosts(res.data.data);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [page, search]);

  return (
    <div>
      <h1>Posts</h1>
      <input placeholder="Search" value={search} onChange={e => setSearch(e.target.value)} />
      {loading && <p>Loading...</p>}
      <ul>
        {posts.map(p => (
          <li key={p._id}>
            <Link to={`/posts/${p._id}`}>{p.title}</Link>
            <div>{p.excerpt}</div>
          </li>
        ))}
      </ul>
      <button onClick={() => setPage(p => Math.max(1, p-1))}>Prev</button>
      <span>{page}</span>
      <button onClick={() => setPage(p => p+1)}>Next</button>
    </div>
  );
}
