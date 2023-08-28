import React, { useState } from "react";

import one from "./assets/1.png";
import two from "./assets/2.png";
import three from "./assets/3.png";
import four from "./assets/4.jpeg";
import five from "./assets/5.jpeg";
import six from "./assets/6.jpg";
import seven from "./assets/7.png";
import eight from "./assets/8.jpg";
import nine from "./assets/9.jpg";
import ten from "./assets/10.png";
import eleven from "./assets/11.jpg";
type SelectAvatarComponentProps = {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  formData: FormData;
};
const SelectAvatarComponent: React.FC<SelectAvatarComponentProps> = ({
  setCount,
  formData,
}) => {
  const [selected, setSelected] = useState(one);
  const [clicked, setClicked] = useState(false);
  // console.log(cp);
  const images = [one, two, three, four, five, six, seven, eight, nine, ten, eleven];
  
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
            alt={imageUrl}
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
