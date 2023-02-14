import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Sidebar } from "../../components/section/Sidebar";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface IPost {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<IPost[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as IPost[]);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        {postsList?.map((post) => (
          <Post title={post.title} username={post.username} id={post.id} description={post.description} userId={post.userId} />
        ))}
      </div>
    </div>
  );
};
