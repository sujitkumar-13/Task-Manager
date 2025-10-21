
import { HiMagnifyingGlass } from "react-icons/hi2";

const SearchBox = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="relative flex items-center text-[#c4c0c0] xl:w-[40%]" id="searchBox">
            <HiMagnifyingGlass className="text-[22px] absolute left-[10px]" />
            <input
                type="text"
                className="border border-[#2c2f3f] w-full rounded-xl py-[10px] pl-[40px] pr-[20px] text-[15px] outline-none hover:border-[#3a3f56]"
                placeholder="Search by title or description"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    );
};

export default SearchBox