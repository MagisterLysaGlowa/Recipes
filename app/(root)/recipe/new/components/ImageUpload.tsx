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
      {renderFileList()}
    </div>
  );
};

export default ImageUpload;
