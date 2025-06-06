import { Button } from "./ui/button";
import { currentPageAtom } from "./three/TextHero";
import { useAtom } from "jotai";

const RedirectionBtn = (props: { page: string }) => {
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);

  return (
    <div className="fixed inset-0 pointer-events-none">
      <section
        className={`flex w-full h-full flex-col items-center justify-center 
      duration-500
      ${currentPage !== props.page ? "" : "opacity-0"}`}
      >
        <div className="h-[66%]"></div>
        <Button onClick={() => setCurrentPage(props.page)}>NEXT</Button>
      </section>
    </div>
  );
};

export default RedirectionBtn;
