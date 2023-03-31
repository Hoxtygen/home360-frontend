import { Button } from "./Button";

export default function PropertyAssessment() {
  return (
    <div className="sm:flex max-w-5xl mx-auto my-0 items-center">
      <div className="bg-[url('../../public/images/property-assessment.jpeg')] w-screen h-60 bg-contain bg-no-repeat bg-center sm:w-1/2"></div>
      <div className="text-center sm:w-1/2">
        <h2 className="text-3xl">
          <span>How much </span>
          <br className="sm:hidden" />
          is your property <br className="hidden sm:block" /> worth?
        </h2>
        <h4 className="text-xl">Count on the best</h4>
        <Button
          href="/"
          className="dark:bg-black dark:text-white mt-2.5"
          variant="link"
        >
          For a free assessment
        </Button>
      </div>
    </div>
  );
}
