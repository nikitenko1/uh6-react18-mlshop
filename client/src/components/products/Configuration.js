import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getConfigurationApi } from "../../api/productApi";

const Configuration = ({ img }) => {
  const [configuration, setConfiguration] = useState({});

  const { id } = useParams();

  useEffect(() => {
    (async (id) => {
      try {
        const res = await getConfigurationApi(id);
        if (res.data.success) {
          setConfiguration(res.data.configuration);
        }
      } catch (error) {
        console.log(error);
      }
    })(id);
  }, [id]);

  return (
    <div className="bg-white py-6 px-2 rounded-md shadow-md overflow-hidden">
      <div className="w-full h-[350px] flex justify-center mb-4">
        <img className="w-full md:w-[350px] h-full object-cover" src={img} alt="" />
      </div>
      <div className="w-[400px] flex text-[13px]">
        <div>
          <div className="flex items-start justify-start">
            <p className="p-2">Screen: {configuration?.display || "Updating"}</p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">Resolution: {configuration?.resolution || "Updating"}</p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">Operating system: {configuration?.operatingSystem || "Updating"}</p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">Processor chip: {configuration?.chipset || "Updating"}</p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">Ram: {configuration?.ram || "Updating"}</p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">Pin: {configuration?.pin || "Updating"}</p>
          </div>
          <div className="flex items-start justify-start">
            <p className="p-2">Network: {configuration?.mobileNetwork || "Updating"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
