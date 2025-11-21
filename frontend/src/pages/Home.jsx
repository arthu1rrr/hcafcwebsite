import heroImg from "../assets/heroimghome.JPG";
import leaguesImg from "../assets/andreashome.jpeg";
import womensImg from "../assets/katahomepage.JPG";
import Header from "../components/Header";
import Footer from "../components/Footer";

const sections = [
  { image: leaguesImg, title: "Mens", alt: "Leagues" },
  { image: null, title: null, alt: null }, // text card handled below
  { image: womensImg, title: "Womens\n& NB", alt: "Women's and NB" },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-hcafc-offwhite">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section
        className="relative"
        aria-labelledby="hero-title"
      >
        <img
          src={heroImg}
          alt="Hero background"
          className="h-[40vh] w-full object-cover md:h-[50vh]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end bg-black/30 px-4 text-center ">
          <h1
            id="hero-title"
            className="text-3xl font-extrabold tracking-tight text-white md:text-5xl"
          >
            Homerton College AFC
          </h1>
          <p className="mt-2 max-w-3xl text-base font-semibold text-white md:text-xl">
            4 teams across CUAFL, representing Homerton College. 
          </p>
          <p className=" max-w-3xl text-base font-semibold text-white md:text-xl">
            The Griffins have opportunities for players of all abilities. 
          </p>
          <p className=" max-w-3xl text-base font-semibold text-white md:text-xl pb-2">
             The most popular society at Homerton.
          </p>
        </div>
      </section>

      {/* Divider bar */}
      <div className="h-2 w-full bg-hcafc-navy" aria-hidden="true" />

      {/* Three-up section */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen -translate-x-1/2 md:static md:mx-0 md:w-full md:translate-x-0">
  <section
    className="grid grid-cols-1 gap-6 px-0  md:grid-cols-3"
    aria-label="Club information"
  >
    {/* Card 1 (image) */}
    <div className="relative overflow-hidden">
      <img
        src={sections[0].image}
        alt={sections[0].alt}
        className="block h-96 w-full object-cover"
      />
      <a
        href="#leagues"
        className="absolute inset-0 flex items-center justify-center bg-black/40 text-2xl font-bold text-white hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/70"
        aria-label={`${sections[0].title} – open leagues page`}
      >
        <span className="px-4 py-2">{sections[0].title}</span>
      </a>
    </div>

    {/* Card 2 (text-only) */}
    <div className="flex items-center justify-center p-5">
      <p className="text-center text-base font-semibold text-black/90">
        We are one of the largest college football clubs in Cambridge —
        one of the only clubs to have three men’s teams and our own women’s
        and non-binary team. We train on a state-of-the-art astro every
        Wednesday. Players of all abilities are welcome and encouraged to
        get involved.
      </p>
    </div>

    {/* Card 3 (image) */}
    <div className="relative overflow-hidden">
      <img
        src={sections[2].image}
        alt={sections[2].alt}
        className="block h-96 w-full object-cover"
      />
      <a
        href="#womens-nb"
        className="absolute inset-0 flex items-center justify-center bg-black/40 text-2xl font-bold text-white whitespace-pre-line hover:bg-black/50 focus:outline-none focus:ring-2 focus:ring-white/70"
        aria-label={`${sections[2].title} – open womens & non-binary team page`}
      >
        <span className="px-4 py-2 text-center">{sections[2].title}</span>
      </a>
    </div>
  </section>
</div>
<Footer />



      
    </div>
  );
}
