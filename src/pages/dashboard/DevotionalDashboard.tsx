import MDEditor from "@uiw/react-md-editor";
import { useCallback, useContext, useEffect, useState } from "react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import classNames from "../../libs/ClassNames";
import TextField from "../../components/textfields/DefaultTextField";
import { ThemeContext } from "../../contexts/ThemeContext";
import { FileWithPath, useDropzone } from "react-dropzone";
import { BiTrash } from "react-icons/bi";
import { appDatabase, appStorage } from "../../libs/FirebaseApp";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadString,
} from "firebase/storage";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ContainedButton from "../../components/buttons/ContainedButton";

export default function DevotionalDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [thumbnail, setThumbnail] = useState<string>("");
  const [thumbImg, setThumbImg] = useState<FileWithPath | null>(null);
  const [title, setTitle] = useState<string>("");
  const [titleError, setTitleError] = useState<boolean>(false);
  const { theme } = useContext(ThemeContext);
  const [content, setContent] = useState<string | undefined>(
    localStorage.getItem("newAfterthought") ?? ""
  );

  function handleChange(val: string | undefined) {
    localStorage.setItem("newAfterthought", val ?? "");
    setContent(val);
  }

  function handleChangeTitle(evt: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { value },
    } = evt;
    setTitleError(value.length <= 0);
    setTitle(value);
  }

  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setThumbnail(URL.createObjectURL(acceptedFiles[0]));
    setThumbImg(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop,
  });

  function deleteThumbnail() {
    setThumbnail("");
    setThumbImg(null);
  }

  async function handleSave() {
    if (title.length <= 0) {
      setTitleError(true);
      return;
    }
    if (!content) return;
    if (!thumbImg) return;
    try {
      setLoading(true);
      const contentRef = ref(appStorage, `devotional/${title}/content.md`);
      const thumbnailRef = ref(
        appStorage,
        `devotional/${title}/${thumbImg.path ?? "thumbnail.jpg"}`
      );
      const uploadedContent = await uploadString(contentRef, content);
      const uploadedThumb = await uploadBytes(thumbnailRef, thumbImg);

      const thumbDownloadUrl = await getDownloadURL(uploadedThumb.ref);
      const contentDownloadUrl = await getDownloadURL(uploadedContent.ref);

      await addDoc(collection(appDatabase, "devotional"), {
        title,
        thumbnail: thumbDownloadUrl,
        content: contentDownloadUrl,
        created: Timestamp.now(),
      }).then(() => {
        setLoading(false);
        localStorage.setItem("newAfterthought", "");
        navigate(-1);
      });
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => URL.revokeObjectURL(thumbnail);
  });

  return (
    <div className="layout" data-color-mode={theme}>
      <h3 className="mb-5">New Devotional</h3>
      <TextField
        onChange={handleChangeTitle}
        label="Devotional name"
        error={titleError ? "Devotional title is required" : ""}
      />

      <div className="mt-5">
        <div className="flex justify-between items-center mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Thumbnail
          </label>

          {thumbnail.length <= 0 ? (
            <div />
          ) : (
            <button
              onClick={deleteThumbnail}
              className="border border-red-500 p-1 rounded-md"
            >
              <BiTrash />
            </button>
          )}
        </div>
        {thumbnail.length > 0 ? (
          <img className="rounded w-full" src={thumbnail} alt="thumbnail" />
        ) : (
          <div
            {...getRootProps({
              className:
                "border-dashed border-2 w-full h-32 rounded flex justify-center items-center cursor-pointer",
            })}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop some files here, or click to select files</p>
            )}
          </div>
        )}
      </div>

      <div className="my-8">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Content
        </label>
        <MDEditor
          value={content}
          height={700}
          onChange={handleChange}
          previewOptions={{
            className: classNames(
              "prose dark:prose-invert",
              "md:prose-lg",
              "prose-headings:scroll-mt-24",
              "prose-img:my-4",
              "prose-pre:p-0 prose-pre:bg-transparent"
            ),
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeRaw],
          }}
        />
      </div>
      <ContainedButton
        className="mb-5"
        onClick={handleSave}
        loading={loading}
        disabled={loading}
      >
        Save
      </ContainedButton>
    </div>
  );
}
