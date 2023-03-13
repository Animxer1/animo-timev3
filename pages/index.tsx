//
import Head from "next/head";
import HeroSection from "../src/components/Home/HeroSection";
import { anime } from "../types/anime";
import { recent_episodes } from "../types/recent_episodes";
import { trending } from "../types/trending";
import dynamic from "next/dynamic";

const Upcoming = dynamic(
  () => import("../src/components/Home/Upcoming/Upcoming")
);

const PastYear = dynamic(
  () => import("../src/components/Home/PastYear/PastYear")
);
const RecentEpisodes = dynamic(
  () => import("../src/components/Home/recentEpisodes/RecentEpisodes")
);
const Navbar = dynamic(() => import("../src/common/NavBar/Navbar"));
const Home = ({
  data,
  dataEp,
  dataPastYear,
  dataUpcoming,
}: // response_Q,
{
  data: [trending];
  dataEp: [recent_episodes];
  dataPastYear: [anime];
  dataUpcoming: [anime];
}) => {
  // console.log(response_Q);
  return (
    <div className=" min-h-screen bg-slate-200 ">
      <Head>
        <title>AnimoTime</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="AnimoTime a free streaming web application packed with many features"
        />
      </Head>
      <main className=" max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative">
        <Navbar />
        <HeroSection data={data} />
        <RecentEpisodes data={dataEp} />
        <PastYear data={dataPastYear} />
        <Upcoming data={dataUpcoming} />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const req = await fetch(`${process.env.NEXT_PUBLIC_API}trending?perPage=4`);
  const res = await req.json();
  const data = await res.results;
  const reqEp = await fetch(
    `${process.env.NEXT_PUBLIC_API}recent-episodes?perPage=15`
  );
  const resEp = await reqEp.json();
  const dataEp = await resEp.results;
  const reqPastYear = await fetch(
    `${process.env.NEXT_PUBLIC_API}advanced-search?year=2022&perPage=11`
  );
  const resPastYear = await reqPastYear.json();
  const dataPastYear = await resPastYear.results;
  const reqUpcoming = await fetch(
    `${process.env.NEXT_PUBLIC_API}advanced-search?status=FINISHED&perPage=8`
  );
  const resUpcoming = await reqUpcoming.json();
  const dataUpcoming = await resUpcoming.results;
  // const question = await fetch(`http://localhost:3000/api/quize`);
  // const response_Q = await question.json();

  return {
    props: {
      data,
      dataEp,
      dataPastYear,
      dataUpcoming,
      // response_Q,
    },
    revalidate: 6000,
  };
};
