import { useState } from "react";
import axios from "axios";

export default function Upload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("파일을 선택하세요.");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      axios.post("http://localhost:8080/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("파일 업로드 실패", error);
    }
  };

  return (
    <div>
      <h1>PDF 파일 업로드</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>업로드</button>
    </div>
  );
}