import { Button } from "../buttons/Button";

export default function AdBanner() {
  return (
    <div className="text-center py-5 mt-5 bg-primary-background">
      <div className=""></div>
      <h3 className="m-4 text-xl">
        Classified ads for real estate <br className="sm:hidden" />- advertise
        now for free
      </h3>
      <div className="">
        <p>
          <span className="sm:inline-block hidden mr-1"> my property</span>
          <Button
            size="lg"
            href="/"
            className="dark:bg-black dark:text-white px-12 mx-1"
          >
            Rent
          </Button>
          <span className="sm:inline-block hidden mr-1 ml-1">or</span>
          <Button
            size="lg"
            href="/"
            className="dark:bg-black dark:text-white px-12 mx-1"
          >
            Sell
          </Button>
        </p>
      </div>
    </div>
  );
}
