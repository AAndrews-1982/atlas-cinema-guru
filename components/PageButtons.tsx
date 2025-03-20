"use client";

interface PageButtonsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PageButtons = ({ currentPage, totalPages, onPageChange }: PageButtonsProps) => {
  return (
    <div className="flex items-center justify-center gap-4 my-5">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-6 py-3 rounded-l-full text-navy bg-teal transition-all ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-tealDark"
        }`}
      >
        Previous
      </button>

      {/* Page Number Display */}
      <span className="px-4 text-white font-bold">
        Page {currentPage} of {totalPages}
      </span>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-6 py-3 rounded-r-full text-navy bg-teal transition-all ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-tealDark"
        }`}
      >
        Next
      </button>
    </div>
  );
};

export default PageButtons;
