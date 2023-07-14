import { DevotionalType } from "app-types";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { FiGithub, FiMail } from "react-icons/fi";
import { TbBrandTelegram } from "react-icons/tb";
import { Link } from "react-router-dom";
import { appDatabase } from "../libs/FirebaseApp";

export default function Home() {
  const [devotionals, devotionalLoading] = useCollection(
    collection(appDatabase, "devotional"),
    { snapshotListenOptions: { includeMetadataChanges: true } }
  );
  return (
    <>
      <div className="banner h-48 md:rounded-xl mx-auto max-w-2xl md:w-full" />
      <div className="layout">
        <section className="flex flex-col">
          <div className="relative flex h-14 md:h-16">
            <img
              src="/pfp.jpeg"
              alt="Profile Picture"
              className="rounded-full absolute left-1 bottom-0.5 border-4 cursor-pointer border-white dark:border-theme-900"
              width={128}
              height={128}
              decoding="async"
              style={{ color: "transparent" }}
            />
            <div className="flex items-center ml-auto max-w-max">
              <a
                href="https://t.me/triankyy"
                target="_blank"
                aria-label="Telegram account"
                className="inline-flex items-center justify-center w-7 h-7 mr-2.5 last-of-type:mr-0"
              >
                <TbBrandTelegram className="w-5 h-5" />
              </a>
              <a
                href="mailto: triankyy@gmail.com?subject="
                target="_blank"
                aria-label="Email me"
                className="inline-flex items-center justify-center w-7 h-7 mr-2.5 last-of-type:mr-0"
              >
                <FiMail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/triankyy"
                target="_blank"
                aria-label="Github account"
                className="inline-flex items-center justify-center w-7 h-7 mr-2.5 last-of-type:mr-0"
              >
                <FiGithub className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-3 md:mt-6">
            <h2>Adistya Putri Nugraheni</h2>
            <h3 className="max-w-max mb-7 text-transparent font-bold text-xl md:text-2xl bg-clip-text bg-gradient-to-r from-primary-500 to-ternary-500 dark:text-transparent">
              Christian educator
            </h3>
            <div className="[&>p:not(:last-child)]:mb-3 [&>p]:max-w-prose md:pb-6 [&>p]:w-full">
              <p>
                Hello everyone 👋, it's me Adistya. I am a christian educator.
                This is my website for you all that really want to learn about
                Jesus through the simple quiz and sharing anything you want. I
                invite you to join my language class. Thanks for visiting! Hope
                you love it! :D
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 pt-32">
          <h3 className="mb-2 md:mb-3">Recent Devotionals</h3>
          <p className="mb-6 md:mb-8">
            feel free to read and reflect on what I had made
          </p>

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
                    <div
                      key={devotional.id}
                      className="flex flex-col md:mt-0 mt-2"
                    >
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
                        <Link to={`/project/${devotional.id}`}>
                          <h4>{data.title}</h4>
                        </Link>
                      </div>
                    </div>
                  );
                })}
          </div>
        </section>
      </div>
    </>
  );
}
