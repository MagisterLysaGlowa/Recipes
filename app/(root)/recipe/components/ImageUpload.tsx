import React, { ChangeEvent } from "react";

type Props = {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const ImageUpload = (props: Props) => {
  const { setFiles, files } = props;

  const renderFileList = () => (
    <ol>
      {[...files].map((f, i) => (
        <li key={i}>
          {f.name} - {f.type}
        </li>
      ))}
    </ol>
  );

  const renderImagePreviews = () =>
    files.map((file, index) => {
      const imageUrl = URL.createObjectURL(file);
      return (
        <li key={index}>
          <img
            src={imageUrl}
            alt={file.name}
            style={{ width: "150px", height: "auto", marginBottom: "10px" }}
          />
        </li>
      );
    });

  return (
    <div>
      <label>Dodawanie zdjęć</label>
      <input
        type="file"
        multiple
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          e.target.files && setFiles([...e.target.files]);
        }}
      />
      <ol style={{ listStyleType: "none", padding: 0 }}>
        {renderImagePreviews()}
      </ol>
    </div>
  );
};

export default ImageUpload;
