import React from "react";
import Image from "next/image";

type Props = {
  images?: File[] | null;
};

const ImagePreview = ({ images }: Props) => {
  const ListImages = images && Array.from(images);
  return (
    <div>
      <div className="grid grid-cols-12 gap-2 my-2">
        {images &&
          images.map((image) => {
            const src = URL.createObjectURL(image);
            return (
              <div
                className="relative aspect-video col-span-4"
                key={image.name}
              >
                <Image
                  src={src}
                  alt={image.name}
                  className="object-cover"
                  fill
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImagePreview;
