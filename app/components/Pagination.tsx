<<<<<<< HEAD
=======
'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface NavigationButtonProps {
  onClick: () => void;
  disabled: boolean;
  label: string;
  className: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
  onClick,
  disabled,
  label,
  className
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={`${label} page`}
    aria-disabled={disabled}
    className={`
      px-5 
      py-3 
      w-28 
      text-blue 
      bg-teal 
      transition-opacity 
      duration-300
      ${className}
      ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}
    `}
  >
    {label}
  </button>
);

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  // Navigation state
  const isPreviousDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  // Event handlers
  const handlePrevious = () => {
    if (!isPreviousDisabled) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      onPageChange(currentPage + 1);
    }
  };

  // Early return if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav 
      className="flex items-center justify-center gap-2 my-5 py-5"
      aria-label="Pagination navigation"
    >
      <NavigationButton
        onClick={handlePrevious}
        disabled={isPreviousDisabled}
        label="Previous"
        className="rounded-l-full"
      />

      <span 
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        Page {currentPage} of {totalPages}
      </span>

      <NavigationButton
        onClick={handleNext}
        disabled={isNextDisabled}
        label="Next"
        className="rounded-r-full"
      />
    </nav>
  );
};

export default Pagination;
>>>>>>> 25e2ed2 (still not able to load images)
