import { FiGithub, FiMail } from "react-icons/fi";
import { TbBrandTelegram } from "react-icons/tb";

export default function Home() {
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
              Android & iOS Developer
            </h3>
            <div className="[&>p:not(:last-child)]:mb-3 [&>p]:max-w-prose md:pb-6 [&>p]:w-full">
              <p>
                Hello 👋, I'm Trian Oky Ragil Saputra, a guy who likes to make
                mobile applications, and anything related to technology. Welcome
                to my personal website, which is where you can find my portfolio
                and blog
              </p>
              <p>
                As a self-taught developer, I started learning mobile
                development when I was in 11th grade, which is where I first
                learned to use React Native and Java.
              </p>
              <p>
                I currently use Flutter for cross-platform development, and use
                Kotlin/Swift for native development
              </p>
              <p>
                For me personally, I will continue to learn about programming
                development, and will keep updating according to the development
                of the :D
              </p>
              <p>
                <b>
                  "Programming isn't about what you know; it's about what you
                  can figure out."
                </b>
                <br /> <i>- Chris Pine</i>
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
