import classNames from "@app/libs/ClassNames";

type Props = JSX.IntrinsicElements["code"];

export default function Code(props: Props) {
  return (
    <code
      className={classNames(
        "py-1 px-1.5 font-normal rounded border",
        "bg-transparent",
        "border-theme-300 dark:border-theme-700",
        props.className ?? ""
      )}
    >
      {props.children}
    </code>
  );
}
