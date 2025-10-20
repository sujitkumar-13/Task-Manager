const Showing = ({ currentPage, totalTasks, handleNext, handlePrev }) => {
  return (
    <>
      <div>
        <h1 className="text-[#c4c0c0]">
          Showing 5 of <span>{totalTasks}</span> tasks
        </h1>
      </div>

      <div className="flex gap-[10px] mt-4 ">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="flex items-center gap-[5px] border border-[#2c2f3f] px-[16px] py-[8px] text-[#c4c0c0] rounded-xl hover:bg-[#1b253d] disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-[16px] py-[8px] text-[#c4c0c0] border border-[#2c2f3f] rounded-xl">
          Page {currentPage}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === Math.ceil(totalTasks / 5)}
          className="flex items-center gap-[5px] text-[#c4c0c0] border border-[#2c2f3f] px-[16px] py-[8px] rounded-xl hover:bg-[#1b253d] disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Showing;
