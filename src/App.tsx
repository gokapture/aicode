import { useEffect, useRef, useState } from "react";
import CaptureImageComponent from "./CaptureImageComponent";
import SelectAvatarComponent from "./SelectAvatarComponent";
import PreviewComponent from "./PreviewComponent";
import axios from "axios";

export const dataURItoBlob = (dataURI: string): Blob => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new File([new Blob([ab], { type: mimeString })], "image.jpeg", {
    type: "image/jpeg",
  });
};
function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(false);
  const [count, setCount] = useState(0);
  const [formData] = useState(new FormData()); // Initialize formData
  useEffect(() => {
    checkLocalStorageAppId();
  }, []);

  const checkLocalStorageAppId = async () => {
    let storedAppId = localStorage.getItem("APP_ID");

    if (!storedAppId || !(await isValidAppId(storedAppId))) {
      promptForValidAppId();
    }
  };

  const isValidAppId = async (appId: string): Promise<boolean> => {
    try {
      const response = await axios.post("https://ai-photobooth.onrender.com/check-app-id", {
        app_id: appId,
      });
      return response.data.bool;
    } catch (error) {
      return false;
    }
  };

  const promptForValidAppId = async () => {
    let isValid = false;

    while (!isValid) {
      const appIdInput = window.prompt("Enter GoKapture App ID") || "";
      if (!appIdInput) continue;

      isValid = await isValidAppId(appIdInput);

      if (isValid) {
        localStorage.setItem("APP_ID", appIdInput);
        alert("App ID set successfully.");
      } else {
        alert("Please enter a valid App ID.");
      }
    }
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error(
          "Error accessing webcam plz throw your device in garbage :)",
          error
        );
      });
  }, [capturedImage, showButtons]);

  const handleCaptureClick = async () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);

      const capturedDataURL = canvas.toDataURL("image/jpeg");
      const file = dataURItoBlob(capturedDataURL);
      formData.append("input_image", file);
      setCapturedImage(capturedDataURL);
      setShowButtons(true);
    }
  };
  const handleNextClick = () => {
    setCount((e) => e + 1);
  };

  const handleRetryClick = () => {
    setCapturedImage(null);
    setShowButtons(false);
  };

  return (
    <div className=" w-full flex justify-center items-center flex-col p-2 ">
      <img
        src="https://www.gokapture.com/img/gokapture/favicon.png"
        alt="Logo"
      />{" "}
      {count === 0 && (
        <CaptureImageComponent
          capturedImage={capturedImage}
          handleCaptureClick={handleCaptureClick}
          handleNextClick={handleNextClick}
          handleRetryClick={handleRetryClick}
          showButtons={showButtons}
          videoRef={videoRef}
        />
      )}
      {count === 1 && (
        <SelectAvatarComponent setCount={setCount} formData={formData} />
      )}
      {count === 2 && <PreviewComponent formData={formData} />}
    </div>
  );
}

export default App;
