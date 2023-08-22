import { useDropzone } from "react-dropzone";
import ImagePreview from "components/shared/ImagePreview";
import { uploadImages } from "lib/utils/uploadImages";
import { useState } from "react";
import { checkFileSize } from "lib/utils/utils";

type Props = {
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  name: string;
};

export default function UploadComponent(props: Props) {
  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>();
  const { setFieldValue, name } = props;
  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
        "image/webp": [".webp"],
      },
      maxFiles: 10,
      validator: checkFileSize,
      onDrop: async (acceptedFiles, fileRejections) => {
        if (fileRejections.length > 0) {
          return;
        }
        setUploadedFiles(acceptedFiles);
        const result = await uploadImages(acceptedFiles);
        console.log("result:", acceptedFiles);
        console.log("result:", result);
        setFieldValue(name, result);
      },
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => {
    return (
      <li key={file.name} className="text-sm text-blue-500">
        {file.name} - {file.size} bytes:
        <ul>
          {errors.map((e) => (
            <li key={e.code} className="text-red-500">
              {e.message}
            </li>
          ))}
        </ul>
      </li>
    );
  });
  return (
    <div className="">
      <div {...getRootProps({ className: "dropzone border border-slate-300" })}>
        <input {...getInputProps({ name: name })} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">
                Drag and drop some files here,{" "}
              </span>{" "}
              or click to select files
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              SVG, PNG, JPG or WEBP (MAX. 2MB/file)
            </p>
          </div>
        )}
      </div>
      <aside>
        <ul>{fileRejectionItems}</ul>
      </aside>
      <ImagePreview images={uploadedFiles} />
    </div>
  );
}
