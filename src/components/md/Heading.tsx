import { useLocation } from "react-router-dom";
import classNames from "@app/libs/ClassNames";

type H2Props = JSX.IntrinsicElements["h2"];
type H3Props = JSX.IntrinsicElements["h3"];
type H4Props = JSX.IntrinsicElements["h4"];
type HLinkProps = JSX.IntrinsicElements["a"] & {
  headingId: string;
};
const getHashURL = (path: string) => path.split("#")[1];

function Headinglink(props: HLinkProps) {
  const { hash } = useLocation();
  const { title, headingId, href, children, ...rest } = props;
  return (
    <a
      title={title}
      href={`#${href ?? ""}`}
      className={classNames(
        "no-underline transition",
        "border-b border-dashed",
        "hover:border-gray-500",
        "font-bold",
        headingId == getHashURL(hash) ? "border-gray-500" : "border-transparent"
      )}
      {...rest}
    >
      {children}
    </a>
  );
}

export function Heading2(props: H2Props) {
  const toId = props.children
    ?.toString()
    .toLocaleLowerCase()
    .replace(/[^a-zA-Z0-9 ]/, "")
    .replace(/[^\x20-\x7E]/g, "")
    .split(" ")
    .join("-");

  return (
    <h2 id={toId ?? ""}>
      <Headinglink title={toId} href={toId} headingId={toId ?? ""}>
        {props.children}
      </Headinglink>
    </h2>
  );
}

export function Heading3(props: H3Props) {
  const toId = props.children
    ?.toString()
    .toLocaleLowerCase()
    .replace(/[^a-zA-Z0-9 ]/, "")
    .replace(/[^\x20-\x7E]/g, "")
    .split(" ")
    .join("-");

  return (
    <h3 id={toId ?? ""}>
      <Headinglink title={toId} href={toId} headingId={toId ?? ""}>
        {props.children}
      </Headinglink>
    </h3>
  );
}
export function Heading4(props: H4Props) {
  const toId = props.children
    ?.toString()
    .toLocaleLowerCase()
    .replace(/[^a-zA-Z0-9 ]/, "")
    .replace(/[^\x20-\x7E]/g, "")
    .split(" ")
    .join("-");

  return (
    <h4 id={toId ?? ""}>
      <Headinglink title={toId} href={toId} headingId={toId ?? ""}>
        {props.children}
      </Headinglink>
    </h4>
  );
}
