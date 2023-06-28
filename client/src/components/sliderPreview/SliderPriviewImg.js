import React, { useRef, useState } from "react";
import { img_url } from "../../utils/img";
import Lightbox from "react-image-lightbox";
import { v4 } from "uuid";

const SliderPriviewImg = ({ listImg, thumbnail }) => {
  const srcImg = useRef(null);

  console.log(listImg);

  const changeImg = (src) => {
    srcImg.current.setAttribute("src", src);
  };

  const [showLightBox, setShowLightBox] = useState({
    status: false,
    src: listImg && img_url + listImg[0],
  });

  const handleOpenLightBox = (e) => {
    setShowLightBox({ status: true, src: e.target.src });
  };

  const handleCloseLightBox = () => {
    setShowLightBox({ ...showLightBox, status: false });
  };

  return (
    <div className="w-full md:w-[50%] max-w-full mt-[55px] relative">
      <div className="w-full">
        <img
          ref={srcImg}
          className="w-full h-full object-cover"
          src={thumbnail}
          onClick={handleOpenLightBox}
          alt="thumbnail"
        />
        <div
          className="h-80px p-2 grid grid-cols-4 bg-gray-100 gap-1 mt-4 rounded-md text-center
        absolute bottom-0"
        >
          {(listImg?.length > 0 ? [thumbnail, ...listImg] : [thumbnail])?.map((p) => (
            <div
              onClick={() => changeImg(p)}
              key={v4()}
              className="border-2 p-2 aspect-[auto] overflow-hidden"
            >
              <img className="w-full h-full object-cover" src={p} alt="thumbnail" />
            </div>
          ))}
        </div>
      </div>
      {showLightBox.status && (
        <Lightbox mainSrc={showLightBox.src} onCloseRequest={handleCloseLightBox} />
      )}
    </div>
  );
};

export default SliderPriviewImg;
