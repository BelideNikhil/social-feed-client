import { useEffect, useState } from "react";
import { apiClient } from "../api/client";

export const Feed = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await apiClient.get("/posts/all");
      setPosts(response?.data?.posts);
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {!loading ? (
        <div>
          {posts?.length > 0 ? (
            <div className="post-container">
              {posts?.map((post) => {
                return (
                  <div key={post?._id} className="post">
                    <img src={post?.image} />
                    <h3>{post.caption}</h3>
                  </div>
                );
              })}
            </div>
          ) : (
            <div>No posts found</div>
          )}
        </div>
      ) : null}
      {loading ? <div>Loading</div> : null}
    </>
  );
};
