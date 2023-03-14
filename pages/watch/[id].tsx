// import NodeCache from "node-cache";
//
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ArrowNext, ArrowPerv } from "../../src/common/Icons";
import { episode } from "../../types/episode";

import { commentSchema } from "../../types/commentSchema";

const IframeContainerArabic = dynamic(
  () => import("../../src/components/watchPage/IframeContainerArabic")
);
const Quality = dynamic(() => import("../../src/components/watchPage/Quality"));
const IframeContainer = dynamic(
  () => import("../../src/components/watchPage/IframeContainer")
);
const Navbar = dynamic(() => import("../../src/common/NavBar/Navbar"));
const Comments = dynamic(
  () => import("../../src/components/watchPage/comments/Comments")
);

function index({
  data,
  comments,
}: {
  data: episode[];
  dataAr: { data: string[] };
  comments: { data: commentSchema[] };
}) {
  const router = useRouter();
  console.log(comments);
  const { id, animeData, title, ids }: any = router.query;
  const nextEpNum: any = id?.slice(-1);
  //fc

  const nextEp = id?.slice(0, id.length - 1);
  // console.log(dataAr, "from back");
  const [hydrated, setIsHydrated] = useState(false);
  const [whatLanguage, setWhatLanguage] = useState("en");
  const sourceDefault = data[0].url ? data[0].url : "default";
  const [sourceIs, setSource] = useState(sourceDefault);
  const [active, setActive] = useState("default");
  useEffect(() => {
    if (window !== undefined) {
      setIsHydrated(true);
    }
  }, [whatLanguage]);

  // console.log(dataAr1);

  return (
    <div className="bg-slate-200">
      <Head>
        <title>AnimoTime</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="AnimoTime a free streaming web application packed with many features"
        />
      </Head>
      <Navbar />
      <main className=" max-w-8xl m-auto px-2 md:px-5 lg:px-7 xl:px-9 relative min-h-screen pb-4">
        <div className="pt-[220px] md:pt-[220px] xl:pt-[125px] h-full flex gap-4 flex-wrap  mx-auto">
          {hydrated && (
            <div className="w-full md:w-2/3 flex-wrap gap-2 md:min-w-[360px] mx-auto flex-grow justify-center">
              <div className=" w-full">
                {/* quality */}
                <Quality
                  data={data}
                  active={active}
                  setActive={setActive}
                  setSource={setSource}
                  setWhatLanguage={setWhatLanguage}
                  whatLanguage={whatLanguage}
                />
                {/* {ifram} */}
                {whatLanguage === "ar" ? (
                  <>
                    <IframeContainerArabic
                      // data={dataAr1}
                      id={id}
                      setWhatLanguage={setWhatLanguage}
                      nextEpNum={nextEpNum}
                    />
                  </>
                ) : (
                  <IframeContainer sourceIs={data[0].url} />
                )}
              </div>
              <div className="mt-5 uppercase gap-2 w-fit flex flex-row-reverse">
                {+animeData > 1 && (
                  <>
                    <Link
                      href={`/watch/${nextEp}${
                        +nextEpNum + 1
                      }?animeData=${animeData}&ids=${ids}&title=${title}`}
                      className={`${
                        +nextEpNum === +animeData && "hidden"
                      } w-fit px-2 py-1 gap-1 flex items-center justify-center rounded-md`}
                      target="_parent"
                    >
                      Next <ArrowNext />
                    </Link>
                    <>
                      <Link
                        href={`/watch/${nextEp}${
                          +nextEpNum - 1
                        }?animeData=${animeData}&ids=${ids}&title=${title}`}
                        className={`${
                          +nextEpNum === 1 && "hidden"
                        } w-fit px-2 py-1 gap-1 flex items-center justify-center rounded-md`}
                        target="_parent"
                      >
                        <ArrowPerv /> Prev
                      </Link>
                    </>
                  </>
                )}
              </div>
            </div>
          )}
          <div className="md:min-w-[320px] max-w-[360px] self-center mx-auto">
            {!!comments.data.length ? (
              <Comments data={comments} animeEpId={id} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default index;

export const getServerSideProps = async (context: {
  req: { url: string };
  params: { id: string };
}) => {
  const { id } = context.params;
  const req = await fetch(
    `https://animo-time-api.vercel.app/anime/gogoanime/servers/${id}`
  );
  // console.log(req.status);
  const res = req.status === 500 ? { message: "error" } : await req.json();

  const reqComment = await fetch(
    `https://animotime.onrender.com/api/comments/${id}`
  );
  const resComment = await reqComment.json();

  return {
    props: {
      data: { ...res },
      comments: resComment,
    },
  };
};
