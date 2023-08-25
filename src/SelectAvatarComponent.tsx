import React, { useState } from "react";
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
type SelectAvatarComponentProps = {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  formData: FormData;
};
const SelectAvatarComponent: React.FC<SelectAvatarComponentProps> = ({
  setCount,
  formData,
}) => {
  const [selected, setSelected] = useState(cp);
  const [clicked, setClicked] = useState(false);
  const images = [cp, cpc, im, cp3, z, cp2, thor, cpf, cpf2];
  
  const handleClickGenerate = async () => {
    setClicked(true);
    try {
      const response = await fetch(selected);
      const imageBuffer = await response.arrayBuffer();
      
      const imageFile = new File([imageBuffer], "image.jpeg", { type: "image/jpeg" });
      formData.append("target_image", imageFile);
      
      setCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error fetching image data:", error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center flex-col">
      <div className="border-dashed flex-1 max-w-[75%] border-black border-2 rounded-3xl p-1">
        <img
          src={selected}
          className="w-full max-h-[35rem] rounded-2xl "
          alt=""
        />
      </div>
      <div
        style={{
          overflow: "scroll", // This will add scrollbars when needed
          // border: "1px solid #ccc",
          flexDirection: "row",
          display: "flex",
          marginTop: "1rem",
          padding: "1rem",
        }}
      >
        {images.map((imageUrl, index) => (
          <img
            onClick={() => {
              setSelected(imageUrl);
            }}
            key={index}
            src={imageUrl}
            alt={`Image ${index}`}
            style={{
              height: "6rem", // Adjust image width to your preference
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
              borderRadius: "0.5rem",
              opacity: imageUrl === selected ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      <div className="flex justify-center items-center w-full gap-10 ">
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
          disabled={clicked}
          className={`mt-4 py-2 px-6 ${
            clicked ? "bg-gray-600" : "bg-black"
          } text-white rounded-3xl text-xl font-semibold relative overflow-hidden`}
        >
          Generate
        </button>
      </div>
    </div>
  );
};

export default SelectAvatarComponent;
