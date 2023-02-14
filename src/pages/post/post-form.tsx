import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface PostFormData {
  title: string;
  description: string;
}

export const PostForm = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string().required("title cannot be empty"),
    description: yup.string().required("description cannot be empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, "posts");

  const onCreatePost = async (data: PostFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  return (
    <div className="pylg-4 p-3 mt-3">
      <form onSubmit={handleSubmit(onCreatePost)}>
        <div className="mb-3">
          <p className="text-danger fw-bold">{errors.title?.message}</p>
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input type="title" className="form-control" id="exampleInputEmail1" aria-describedby="titleHelp" {...register("title")} />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <p className="text-danger fw-bold">{errors.description?.message}</p>
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <textarea className="form-control" id="exampleInputPassword1" {...register("description")} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
