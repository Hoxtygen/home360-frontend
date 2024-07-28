import React from "react";
import Image from "next/image";

export default function ListingImages({ images = [] }: { images: string[] }) {
  return (
    <div className="relative">
      {images && (
        <>
          <div className="">
            <Image
              alt=""
              src={
                images[0] ||
                `https://source.unsplash.com/random/300x200?sig=${
                  Math.random() * 10
                }`
              }
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
          {/* <div className="absolute left-8 bottom-3">
              <Button
                onClick={() => setShowListingImagesDialog(true)}
                className="dark:bg-white dark:hover:bg-white hover:bg-white dark:hover:text-black "
              >
                <Image src={CameraIcon} alt="camera icon" />
                View {listingData?.apartmentImages.length} images
              </Button>
            </div> */}
        </>
      )}
    </div>
  );
}
