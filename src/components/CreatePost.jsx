import { useState } from "react";
import { apiClient } from "../api/client";
import { useModal } from "../context/modal.context";

export const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { closeModalHandler } = useModal();

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    const urlPreview = URL.createObjectURL(uploadedFile);

    setFile(uploadedFile);
    setPreview(urlPreview);
  };

  const createPostHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", file);

    try {
      const response = await apiClient.post("/posts/create", formData);
      console.log("response", response);
    } catch (error) {
      console.log("create post error", error);
    } finally {
      setLoading(false);
    }
    // call clearImageHandler on success
  };

  const clearImageHandler = () => {
    setPreview(null);
    setFile(null);
  };
  return (
    <div className="create-post-wrapper">
      <form onSubmit={createPostHandler}>
        <div>
          Caption
          <input
            type="text"
            name="caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="caption"
          />
        </div>
        {/* show input file only when no file has been uploaded */}
        {/* allow user to only upload images */}
        <input
          type="file"
          accept="image/*"
          name="file"
          onChange={handleFileChange}
        />
        {/* show image preview only after upload */}
        {preview ? (
          <div>
            <img src={preview} alt="" />
            <button
              type="button"
              onClick={() => {
                clearImageHandler();
                closeModalHandler();
              }}
            >
              X
            </button>
          </div>
        ) : null}
        <button type="submit" disabled={loading}>
          {loading ? "Loading" : "Create"}
        </button>
      </form>
    </div>
  );
};
