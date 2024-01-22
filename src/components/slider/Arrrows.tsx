type ArrowProps = {
  prevSlide(): void;
  nextSlide(): void;
};

export default function Arrows({ prevSlide, nextSlide }: ArrowProps) {
  return (
    <div className="arrows">
      <span
        className="cursor-pointer z-[100] absolute p-4 w-auto -mt-12 text-32 font-bold top-[50%] hover:bg-[rgba(0, 0, 0, 0.6)] transition-all"
        onClick={prevSlide}
      >
        &#10094;
      </span>
      <span
        className="cursor-pointer z-[100] absolute p-4 w-auto -mt-12 text-32 font-bold top-[50%] right-0"
        onClick={nextSlide}
      >
        &#10095;
      </span>
    </div>
  );
}
