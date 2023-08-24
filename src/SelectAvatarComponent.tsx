import React, { useState, useEffect } from "react";
import cp from "./assets/cp.jpeg";
import cpc from "./assets/cpc.png";
import cp3 from "./assets/cp3.png";
import cp2 from "./assets/cp2.jpeg";
import cpf from "./assets/cpf.jpg";
import cpf2 from "./assets/cpf2.webp";
import im from "./assets/im.jpg";
import z from "./assets/z.png";
import thor from "./assets/thor.jpg";
import axios from "axios";
import { dataURItoBlob } from "./App";
type SelectAvatarComponentProps = {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  formData: FormData;
};
const SelectAvatarComponent: React.FC<SelectAvatarComponentProps> = ({
  setCount,
  formData,
}) => {
  const [selected, setSelected] = useState(cp);
  const images = [cp, cpc, im, cp3, z, cp2, thor, cpf, cpf2];
  const handleClickGenerate = async () => {
    try {
      const response = await axios.get(selected, {
        responseType: "arraybuffer",
      });
      const imageBuffer = new Uint8Array(response.data);

      const imageBlob = new Blob([imageBuffer], { type: "image/jpeg" });

      const file = new File([imageBlob], "image.jpeg", { type: "image/jpeg" });
      formData.append("target_image", file);
      setCount((e) => e + 1);
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  return (
    <div className="flex-1 w-full flex justify-center items-center flex-col">
      <div className="border-dashed flex-1 max-w-[75%] border-black border-2 rounded-3xl p-1">
        <img
          src={selected}
          className="w-full max-h-[35rem] rounded-2xl "
          alt=""
        />
      </div>
      <div className="flex flex-1 w-full h-36 flex-row overflow-x-auto justify-center items-center">
        {images.map((item) => (
          <img
            onClick={() => setSelected(item)}
            src={item}
            className={`h-24 mx-2 my-2 rounded-2xl ${
              selected !== item && "opacity-80"
            }`}
            alt=""
          />
        ))}
      </div>
      <div className="flex justify-center items-center w-full gap-10">
        <button
          onClick={() => {
            setCount((e) => e - 1);
          }}
          className="mt-4 py-2 px-6 bg-gray-600 text-white rounded-3xl text-xl font-semibold relative overflow-hidden"
        >
          Back
        </button>
        <button
          onClick={() => {
            handleClickGenerate();
          }}
          className="mt-4 py-2 px-6 bg-black text-white rounded-3xl text-xl font-semibold relative overflow-hidden"
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default SelectAvatarComponent;
