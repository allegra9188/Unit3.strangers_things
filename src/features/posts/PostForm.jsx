import { useState } from "react";
// import from post slice

export default function PostForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [createPost] = useCreatePostMutation();
  const tryCreatePost = (evt) => {
    evt.preventDefault();

    const post = { name, description, price };
    createPost(post);
  };

  return (
    <form onSubmit={tryCreatePost}>
      <h1>Create a Post</h1>
      <label>
        Name
        <input
          type="text"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </label>
      <label>
        Description
        <input
          type="text"
          value={description}
          onChange={(evt) => setDescription(evt.target.value)}
        />
      </label>
      <label>
        Price
        <input
          type="text"
          value={price}
          onChange={(evt) => setPrice(evt.target.value)}
        />
      </label>
    </form>
  );
}
