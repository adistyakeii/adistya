/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

import { useLocation } from "react-router-dom";
import classNames from "@app/libs/ClassNames";
import Blockquote from "./Blockquote";
import { Heading2, Heading3, Heading4 } from "./Heading";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import Code from "./Code";

interface Props {
  path: string | undefined | null;
}

export default function MDRenderer({ path }: Props) {
  const { hash } = useLocation();
  const [loading, setLoading] = useState<boolean>(false);
  const [mdContent, setMdContent] = useState<string>("");

  useEffect(() => {
    void (async function () {
      setLoading(true);
      const response = await fetch(path ?? "");
      const mdxText = await response.text();
      setLoading(false);
      setMdContent(mdxText);
    })();
  }, [path]);

  useEffect(() => {
    (function () {
      if (loading) return;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView();
        }
      } else {
        window.scrollTo(0, 0);
      }
    })();
  }, [hash, loading]);

  return (
    <ReactMarkdown
      components={{
        blockquote: Blockquote,
        h2: Heading2,
        h3: Heading3,
        h4: Heading4,
        code: ({ inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              {...props}
              children={String(children).replace(/\n$/, "")}
              style={oneDark}
              language={match[1]}
              PreTag="div"
            />
          ) : (
            <Code {...props} children={children} />
          );
        },
      }}
      className={classNames(
        "prose dark:prose-invert",
        "md:prose-lg",
        "prose-headings:scroll-mt-24",
        "prose-img:my-4",
        "prose-pre:p-0 prose-pre:bg-transparent"
      )}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
    >
      {mdContent}
    </ReactMarkdown>
  );
}
