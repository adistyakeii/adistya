import { doc } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { Navigate, useParams } from "react-router-dom";
import { appDatabase } from "../../libs/FirebaseApp";
import { DevotionalType } from "app-types";
import { HiOutlineCalendar } from "react-icons/hi";
import moment from "moment";
import MDRenderer from "../../components/md/MDRenderer";

export default function DevotionalDetail() {
  const { devotionalId } = useParams();
  const [devotional, loading, error] = useDocument(
    doc(appDatabase, "devotional", devotionalId ?? ""),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  if (loading) {
    return (
      <div className="animate-pulse layout flex flex-col">
        <div className="w-1/2 h-8 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        <div className="w-full h-5 bg-gray-300 dark:bg-gray-600 rounded-md mt-5"></div>
        <div className="mt-5 w-full h-80 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        <div className="self-end w-1/2 h-8 bg-gray-300 dark:bg-gray-600 rounded-md mt-5"></div>
        <div className="w-full h-8 bg-gray-300 dark:bg-gray-600 rounded-md mt-28"></div>
        <div className="w-full h-5 bg-gray-300 dark:bg-gray-600 rounded-md mt-5"></div>
        <div className="w-1/2 h-5 bg-gray-300 dark:bg-gray-600 rounded-md mt-5"></div>
        <div className="w-1/3 h-5 bg-gray-300 dark:bg-gray-600 rounded-md mt-20"></div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="w-1/3 h-5 bg-gray-300 dark:bg-gray-600 rounded-md mt-5"
          ></div>
        ))}
      </div>
    );
  } else if (error) {
    return <Navigate to="/404" replace={true} />;
  } else {
    const data = devotional?.data() as DevotionalType | null;
    return (
      <section className="layout">
        <h1>{data?.title}</h1>

        <img
          className="mt-5 w-full object-cover rounded-lg"
          sizes="(max-width: 768px) 100%"
          src={data?.thumbnail}
          alt={data?.title}
        />

        <div className="flex items-center text-lg gap-x-2 justify-end my-5">
          <HiOutlineCalendar />
          <p>{moment(data?.created.toDate()).format("DD MMM YYYY")}</p>
        </div>

        <MDRenderer path={data?.content} />
      </section>
    );
  }
}
