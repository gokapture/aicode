import React, { useState, useEffect } from "react";
import axios from "axios";
import download from "./assets/download.png";
import email from "./assets/email.png";
import QRCode from "react-qr-code";
type PreviewComponentProps = {
  formData: FormData;
};
const PreviewComponent: React.FC<PreviewComponentProps> = ({ formData }) => {
  const [image, setImage] = useState("");
  const [qr, setQr] = useState("");
  useEffect(() => {
    console.log(formData.get("target_image"));
    console.log(formData.get("input_image"));
    axios.post("https://ai-photobooth.cyclic.cloud/faceswap", formData).then((res) => {
      setImage(res.data.image);
      formData.delete("target_image");
      formData.delete("input_image");
    });
  }, []);

  return (
    <div className="flex-1 w-full flex justify-center items-center flex-col">
      <div className="flex-1 max-w-[75%] border-black rounded-3xl p-1 flex justify-center items-center">
        <div className="flex-1 max-w-[75%] rounded-3xl p-1 justify-center items-center flex">
          {!qr ? (
            <img
              src={
                image ||
                "https://cdnl.iconscout.com/lottie/premium/thumb/loading-shapes-5391802-4514914.gif"
              }
              className="max-h-[50rem] object-cover w-[50rem] rounded-3xl "
              alt=""
            />
          ) : (
            <div className="bg-white ">
              <QRCode value={qr} />
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex flex-row justify-center items-center gap-10 mt-5">
        <button
          onClick={() => {
            if (qr) {
              setQr("");
              return;
            } else {
              setQr(image);
            }
          }}
          className="h-24 w-24 bg-black rounded-full flex justify-center items-center"
        >
          <p className="text-white font-bold text-3xl">QR</p>
        </button>
        <button
          onClick={() => {
            //download image
            const link = document.createElement("a");
            link.href = image;
            link.download = "swaped_image_go_kapture.jpeg";
            document.body.appendChild(link);
            link.click();
          }}
          className="h-24 w-24 bg-black rounded-full flex justify-center items-center "
        >
          <img src={download} className="h-14 w-14" />
        </button>
        <button
          onClick={() => {}}
          className="h-24 w-24 bg-black rounded-full flex justify-center items-center "
        >
          <img src={email} className="h-14 w-14 " />
        </button>
      </div>
      <button
        onClick={() => {
          window.location.reload();
        }}
        className="mt-4 py-2 px-6 bg-black text-white rounded-3xl text-xl font-semibold relative overflow-hidden"
      >
        Re Generate
      </button>
      {/* {qr && (
      )} */}
    </div>
  );
};

export default PreviewComponent;
