import MDEditor from "@uiw/react-md-editor";
import { useContext, useState } from "react";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import classNames from "../../libs/ClassNames";
import TextField from "../../components/textfields/DefaultTextField";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function AfterthoughtDashboard() {
  const { theme } = useContext(ThemeContext);
  const [value, setValue] = useState<string | undefined>(
    localStorage.getItem("newAfterthought") ?? ""
  );

  function handleChange(val: string | undefined) {
    localStorage.setItem("newAfterthought", val ?? "");
    setValue(val);
  }

  return (
    <div className="layout" data-color-mode={theme}>
      <h3 className="mb-5">Renungan Baru</h3>
      <TextField label="Judul Renungan" />

      <MDEditor
        className="my-5"
        value={value}
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
      <button className="bg-primary-400 w-full my-5 rounded p-1 text-white">
        Simpan
      </button>
    </div>
  );
}
