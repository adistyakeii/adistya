import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { appDatabase } from "../../libs/FirebaseApp";
import { Link } from "react-router-dom";
import { DevotionalType } from "app-types";

export default function Devotional() {
  const [devotionals, devotionalLoading] = useCollection(
    collection(appDatabase, "devotional"),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );

  return (
    <section className="layout">
      <div className="mb-10 mt-1 space-y-2">
        <h1>Devotional</h1>
        <p>feel free to read and reflect on what I had made :D</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {devotionalLoading
          ? Array.from({ length: 3 }).map((_, key) => (
              <div
                key={key}
                className="flex flex-col md:mt-0 mt-2 animate-pulse"
              >
                <figure className="relative w-full h-44 rounded-md bg-gray-300 dark:bg-gray-600"></figure>
                <div className="mt-3 flex flex-col">
                  <h4 className="w-1/2 h-5 bg-gray-300 dark:bg-gray-600 rounded-sm"></h4>
                </div>
              </div>
            ))
          : devotionals?.docs.map((devotional) => {
              const data = devotional.data() as DevotionalType;
              return (
                <div key={devotional.id} className="flex flex-col md:mt-0 mt-2">
                  <figure className="relative w-full h-44 rounded-md">
                    <Link to={`/devotional/${devotional.id}`}>
                      <img
                        sizes="(max-width: 768px) 100%"
                        src={data.thumbnail}
                        alt={data.title}
                        className="w-full object-cover rounded-lg h-44"
                      />
                    </Link>
                  </figure>
                  <div className="mt-3">
                    <Link to={`/devotional/${devotional.id}`}>
                      <h4>{data.title}</h4>
                    </Link>
                  </div>
                </div>
              );
            })}
      </div>
    </section>
  );
}
