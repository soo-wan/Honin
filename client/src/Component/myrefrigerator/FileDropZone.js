import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import upload from "../../assets/images/community/upload.png";
import jaxios from "../util/jwtUtil";

const FileDropZone = ({ setImage, setSavefilename }) => {
  const [preview, setPreview] = useState(null); // 이미지 미리보기 상태
  const [files, setFiles] = useState([]); // 선택된 파일 상태
  const [errorMessages, setErrorMessages] = useState([]); // 오류 메시지 상태
  const maxFileSize = 10 * 1024 * 1024;

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // 이미지 파일만 허용
    maxFiles: 1, // 파일 개수 1개로 제한
    maxSize: maxFileSize, // 최대 파일 크기 설정
    onDrop: (acceptedFiles) => {
      let result = handleFiles(acceptedFiles);
      if (result) {
        uploadFiles(acceptedFiles);
      }
    },
    onDropRejected: (fileRejections) => {
      const messages = new Set();

      fileRejections.forEach((rejection) => {
        if (rejection.errors.some((e) => e.code === "file-too-large")) {
          messages.add("이미지 파일의 크기는 10MB를 초과할 수 없습니다.");
        } else {
          messages.add("파일 업로드 중 오류가 발생했습니다. 이미지 파일 1장 업로드 가능합니다.");
        }
      });

      // Set을 배열로 변환하여 오류 메시지 상태를 업데이트
      setErrorMessages(Array.from(messages));
    },
  });

  // 오류 메시지가 있는 경우 한 번만 알림을 표시하도록 하는 함수
  useEffect(() => {
    if (errorMessages.length > 0) {
      alert(errorMessages.join("\n"));
      setErrorMessages([]); // 메시지 표시 후 상태 초기화
    }
  }, [errorMessages]);

  // 파일을 처리하여 미리보기 이미지를 설정하는 함수
  const handleFiles = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFiles(acceptedFiles); // 선택된 파일을 상태에 저장
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null); // 파일이 없으면 미리보기 초기화
      setFiles([]);
    }
    return true;
  };

  // 파일을 서버로 업로드하는 함수
  const uploadFiles = async (acceptedFiles) => {
    const formData = new FormData();

    acceptedFiles.forEach((file) => {
      formData.append("image", file);
    });
    try {
      const result = await jaxios.post(
        "/api/myrefrigerator/imgupload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setImage(result.data.image);
      setSavefilename(result.data.savefilename);
    } catch (error) {
      console.error("파일 업로드 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <div
        {...getRootProps()}
        style={{
          border: "2px dashed #cccccc",
          padding: "20px",
          textAlign: "center",
          cursor: "pointer",
          width: "90%",
          marginLeft: "0.5rem",
        }}
      >
        <input {...getInputProps()} />
        <p>
          Drag n Drop <img src={upload} alt="Upload Icon" />
        </p>
      </div>
      {preview && (
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <img
            src={preview}
            alt="Preview"
            style={{
              maxWidth: "100%",
              maxHeight: "160px",
              objectFit: "contain",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FileDropZone;