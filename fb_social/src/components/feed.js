import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import '../css/feed.css';


function Feed() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedWithUsernames = async () => {
      try {
        // Fetch posts
        const { data: posts, error: postsError } = await supabase.from('posts').select('*');
        if (postsError) {
          console.error('Error fetching posts:', postsError);
          return;
        }

        // Fetch users
        const { data: users, error: usersError } = await supabase.from('users').select('*');
        if (usersError) {
          console.error('Error fetching users:', usersError);
          return;
        }

        // Map user_id in posts to username in users
        const feedWithUsernames = posts.map((post) => {
          const user = users.find((u) => u.id === post.user_id); // Match user_id with id in users table
          return {
            ...post,
            username: user ? user.username : 'Unknown User', // Add username to the post
          };
        });

        setFeed(feedWithUsernames);
      } catch (error) {
        console.error('Unexpected error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedWithUsernames();
  }, []);

  if (loading) {
    return <p>Loading feed...</p>;
  }

  return (
    <div className="feed-container">
      <h2>Feed</h2>
      <ul className="feed-list">
        {feed.map((item) => (
          <li key={item.id} className="feed-item">
            <div className="feed-username">{item.username}</div>
            <div className="feed-message">{item.content}</div>
            <div className="feed-timestamp">{new Date(item.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Feed;