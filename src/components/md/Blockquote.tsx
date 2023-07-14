type Props = JSX.IntrinsicElements["blockquote"];

export default function Blockquote(props: Props) {
  return (
    <blockquote className="[&>p]:opacity-60">
      <style jsx="true">
        {`
          blockquote {
            border-image: linear-gradient(to bottom, #34956b, #00b4d8) 1;
          }
        `}
      </style>
      {props.children}
    </blockquote>
  );
}
