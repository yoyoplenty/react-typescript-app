import { addDoc, collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { IPost } from "./main";

interface ILike {
  likeId: string;
  userId: string;
}

export const Post = ({ id, title, description, userId, username }: IPost) => {
  const [user] = useAuthState(auth);
  const [totalLikes, setTotalLikes] = useState<ILike[] | null>(null);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setTotalLikes(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })));
  };

  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: id });
      if (user) setTotalLikes((prev) => (prev ? [...prev, { userId: user.uid, likeId: newDoc.id }] : [{ userId: user.uid, likeId: newDoc.id }]));
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(likesRef, where("postId", "==", id), where("userId", "==", user?.uid));

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) setTotalLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId));
    } catch (error) {
      console.log(error);
    }
  };

  const hasUserLiked = totalLikes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="text-center py-2">
      <div className="text-dark">
        <h1>{title}</h1>
      </div>
      <div className="descrption fw-bold">
        <p>{description}</p>
      </div>
      <div className="text-secondary">
        <p>{username}</p>
        <button onClick={hasUserLiked ? removeLike : addLike}> {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} </button>
        {totalLikes && <p>Likes:{totalLikes.length} </p>}
      </div>
    </div>
  );
};
