import { Link } from "react-router-dom";
import error404 from "/notfound.svg";
import { MdKeyboardBackspace } from "react-icons/md";

export default function Error404() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <img src={error404} alt="404 Images" className="md:w-1/6 w-1/2 mb-10" />
      <h1 className="mb-5">Page not found :(</h1>
      <Link
        to="/"
        className="flex items-center gap-2 hover:gap-3 transition-all text-primary-500"
      >
        <MdKeyboardBackspace /> Back
      </Link>
    </div>
  );
}
