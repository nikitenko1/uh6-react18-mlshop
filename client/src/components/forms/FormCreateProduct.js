import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { toast } from "react-hot-toast";
import { uploadMultiFile, uploadOneFile } from "../../api/uploadApi";
import { addProduct } from "../../api/productApi";
import { createProduct } from "../../redux/slices/productSlice";
import Loading from "../loading/Loading";

const FormCreateProduct = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  const [memory, setMemory] = useState("");
  const [product, setProduct] = useState({
    name: "",
    newPrice: "",
    oldPrice: "",
    vat: "",
    colors: [],
    memories: [],
    category: "Phone",
    contentHtml: "",
    contentMarkdown: "",
    display: "",
    resolution: "",
    operatingSystem: "",
    chipset: "",
    ram: "",
    mobileNetwork: "",
    pin: "",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const mdParser = new MarkdownIt();

  const handleEditorChange = ({ html, text }) => {
    setProduct({ ...product, contentHtml: html, contentMarkdown: text });
  };

  const deleteColor = (id) => {
    const newListColor = product.colors.filter((p) => p !== id);
    setProduct({ ...product, colors: newListColor });
  };

  const deleteMemory = (id) => {
    const newListMemories = product.memories.filter((p) => p !== id);
    setProduct({ ...product, memories: newListMemories });
  };

  const onChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (product.colors.length === 0 || product.memories.length === 0)
      return alert("product.colors.length === 0 || product.memories.length === 0!");

    setLoading(true);
    try {
      const imageList = await uploadMultiFile(files);
      const imageOne = await uploadOneFile(file);
      const newProduct = {
        ...product,
        image: imageList,
        thumbnail: imageOne,
        newPrice: +product.newPrice,
        oldPrice: +product.oldPrice,
      };
      const res = await addProduct(newProduct);

      if (res.data.success) {
        navigate("/admin/products?page=1");
        dispatch(createProduct(res.data.product));
        toast.success(res.data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data);
    }
  };
  return (
    <form
      onSubmit={onSubmitForm}
      className="p-3 h-[100%] overflow-auto scrollbar-thin
    scrollbar-thumb-slate-500 scrollbar-thumb-rounded-full"
    >
      <div className="w-full">
        <label className="block mb-2">Name</label>
        <input
          name="name"
          placeholder="Name..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.name}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">New Price</label>
        <input
          name="newPrice"
          placeholder="New Price..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.newPrice}
          onChange={onChangeInput}
          required
          type="number"
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Old Price</label>
        <input
          name="oldPrice"
          placeholder="Old Price..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.oldPrice}
          onChange={onChangeInput}
          type="number"
        />
      </div>
      <div className="w-full mt-4">
        <label htmlFor="file-image" className="block mb-2">
          <i className="bx bx-upload text-2xl"></i>
        </label>
        <input
          name="image"
          placeholder="Images..."
          type={"file"}
          multiple
          className="border-[1px] p-2 outline-none rounded-md w-full"
          id="file-image"
          onChange={(e) => setFiles([...e.target.files])}
          required
        />
        <small className="text-gray-400">Can upload multiple files</small>
      </div>
      <div className="w-full mt-4">
        <label htmlFor="file-image" className="block mb-2">
          Thumbnail
        </label>
        <input
          name="image"
          placeholder="Thumbnail..."
          type={"file"}
          className="border-[1px] p-2 outline-none rounded-md w-full"
          id="file-image"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <small className="text-gray-400">Only upload 1 file as thumbnail</small>
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Colors</label>
        <div className="flex items-center">
          <input
            name="colors"
            placeholder="Colors..."
            className="border-[1px] p-2 w-full outline-none rounded-md"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button
            type="button"
            className="px-4 py-2 bg-amber-400 rounded-md text-white ml-3 ring-inset ring-2 hover:ring-[#b2071d]"
            onClick={() => {
              setProduct({ ...product, colors: [...product.colors, color] });
              setColor("");
            }}
          >
            Add
          </button>
        </div>
        <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 mt-4 gap-3">
          {product.colors.map((p) => (
            <p
              key={p}
              className="bg-slate-400 ring-inset ring-2 hover:ring-[#b2071d] text-xs rounded-md p-2
               text-white flex items-center justify-between"
            >
              {p}
              <p onClick={() => deleteColor(p)} className="ml-2 cursor-pointer">
                x
              </p>
            </p>
          ))}
        </div>
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Memory</label>
        <div className="flex items-center">
          <input
            name="memory"
            placeholder="Memories..."
            className="border-[1px] p-2 w-full outline-none rounded-md"
            value={memory}
            onChange={(e) => setMemory(e.target.value)}
          />
          <button
            type="button"
            className="px-4 py-2 bg-amber-400 rounded-md text-white ml-3
            ring-inset ring-2 hover:ring-[#b2071d]"
            onClick={() => {
              setProduct({ ...product, memories: [...product.memories, memory] });
              setMemory("");
            }}
          >
            Add
          </button>
        </div>
        <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 mt-4 gap-3">
          {product.memories.map((p) => (
            <p
              key={p}
              className="bg-slate-400 ring-inset ring-2 hover:ring-[#b2071d] text-xs rounded-md p-2
             text-white flex items-center justify-between"
            >
              {p}
              <p onClick={() => deleteMemory(p)} className="ml-2 cursor-pointer">
                x
              </p>
            </p>
          ))}
        </div>
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Category</label>
        <select
          className="border-[1px] p-2 outline-none rounded-md w-full"
          name="category"
          value={product.category}
          onChange={onChangeInput}
          required
        >
          <option value={"Phone"}>Phone</option>
          <option value={"Watch"}>Watch</option>
          <option value={"Tablet"}>Tablet</option>
          <option value={"Laptop"}>Laptop</option>
          <option value={"Loudspeaker"}>Loudspeaker</option>
          <option value={"Mouse"}>Mouse</option>
          <option value={"Keyboard"}>Keyboard</option>
        </select>
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Display</label>
        <input
          name="display"
          placeholder="Display..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.display}
          onChange={onChangeInput}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Resolution</label>
        <input
          name="resolution"
          placeholder="Resolution..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.resolution}
          onChange={onChangeInput}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Operating System</label>
        <input
          name="operatingSystem"
          placeholder="Operating System..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.operatingSystem}
          onChange={onChangeInput}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Chipset</label>
        <input
          name="chipset"
          placeholder="Chipset..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.chipset}
          onChange={onChangeInput}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Ram</label>
        <input
          name="ram"
          placeholder="Ram..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.ram}
          onChange={onChangeInput}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Mobile Network</label>
        <input
          name="mobileNetwork"
          placeholder="Mobile Network..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.mobileNetwork}
          onChange={onChangeInput}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Pin</label>
        <input
          name="pin"
          placeholder="Pin..."
          className="border-[1px] p-2 w-full outline-none rounded-md"
          value={product.pin}
          onChange={onChangeInput}
          type="number"
        />
      </div>
      <div className="mt-4 w-full">
        <p className="mb-2">Description</p>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>
      <div className="w-full text-right">
        <input
          type={"submit"}
          placeholder="Add Product"
          className="bg-green-600 mt-4 p-2 rounded-md text-white ring-2 hover:ring-[#ffd400]
          hover:scale-105 transition-all"
        />
      </div>
      {loading && <Loading />}
    </form>
  );
};

export default FormCreateProduct;
