import { Compass, MapPinned, Sparkles, Mountain, Clock3 } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../Theme/themeContext";

export default function WelcomeStep() {
  const { darkMode } = useTheme();

  const cards = [
    {
      icon: MapPinned,
      title: "Personalized Places",
      text: "Recommendations tailored to your interests."
    },
    {
      icon: Mountain,
      title: "Hidden Gems",
      text: "Discover places most visitors never find."
    },
    {
      icon: Sparkles,
      title: "Smarter Planning",
      text: "Build trips around your preferred vibe."
    }
  ];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: .45,
      }}
      className="space-y-10"
    >
      {/* Hero */}

      <div className="text-center">

        <div
          className="
          mx-auto
          w-20
          h-20
          rounded-3xl
          bg-gradient-to-br
          from-emerald-500
          to-teal-500
          flex
          items-center
          justify-center
          shadow-xl
          shadow-emerald-500/20
        "
        >
          <Compass
            className="text-white"
            size={38}
          />
        </div>

        <h1
          className={`mt-8 text-4xl md:text-5xl font-bold ${
            darkMode
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          Welcome to Skyline
        </h1>

        <p
          className={`mt-5 text-lg max-w-2xl mx-auto leading-relaxed ${
            darkMode
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        >
          Let's personalize your travel experience so Skyline can
          recommend destinations, restaurants, hidden gems and local
          experiences you'll actually love.
        </p>
      </div>

      {/* Info Cards */}

      <div className="grid md:grid-cols-3 gap-5">

        {cards.map((card) => {

          const Icon = card.icon;

          return (
            <motion.div
              key={card.title}
              whileHover={{
                y: -6,
              }}
              transition={{
                duration: .2,
              }}
              className={`
              rounded-3xl
              border
              p-6
              transition-all

              ${
                darkMode
                  ? "bg-white/5 border-white/10"
                  : "bg-slate-50 border-slate-200"
              }
            `}
            >
              <div
                className="
                w-12
                h-12
                rounded-2xl
                bg-emerald-500/10
                flex
                items-center
                justify-center
              "
              >
                <Icon
                  className="text-emerald-500"
                  size={24}
                />
              </div>

              <h3
                className={`mt-5 text-lg font-semibold ${
                  darkMode
                    ? "text-white"
                    : "text-slate-900"
                }`}
              >
                {card.title}
              </h3>

              <p
                className={`mt-2 text-sm leading-relaxed ${
                  darkMode
                    ? "text-slate-400"
                    : "text-slate-500"
                }`}
              >
                {card.text}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom Notice */}

      <div
        className={`
        rounded-2xl
        border
        px-6
        py-5
        flex
        items-center
        gap-4

        ${
          darkMode
            ? "bg-emerald-500/10 border-emerald-500/20"
            : "bg-emerald-50 border-emerald-200"
        }
      `}
      >
        <Clock3
          className="text-emerald-500 flex-shrink-0"
          size={24}
        />

        <div>

          <p
            className={`font-semibold ${
              darkMode
                ? "text-white"
                : "text-slate-900"
            }`}
          >
            Takes less than a minute
          </p>

          <p
            className={`text-sm mt-1 ${
              darkMode
                ? "text-slate-400"
                : "text-slate-600"
            }`}
          >
            Answer a few quick questions and Skyline will build a
            personalized experience just for you.
          </p>

        </div>

      </div>
    </motion.div>
  );
}