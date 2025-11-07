import { useState, useEffect, useCallback } from 'react';
import API from '../api/api';

export default function useApi({ method = 'get', url, body = null, deps = [] }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const call = useCallback(async (override = {}) => {
    setLoading(true);
    setError(null);
    try {
      const res = await API({ method, url, data: override.body ?? body, params: override.params });
      setData(res.data);
      setLoading(false);
      return res.data;
    } catch (err) {
      setError(err?.response?.data || err.message);
      setLoading(false);
      throw err;
    }
  }, [method, url, body, ...deps]);

  useEffect(() => {
    // optionally fetch on mount for GET
    if (method.toLowerCase() === 'get' && url) call();
  }, [call, method, url]);

  return { data, loading, error, call, setData };
}
