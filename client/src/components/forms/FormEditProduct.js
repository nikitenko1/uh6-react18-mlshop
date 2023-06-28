import React, { useState, useEffect } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loading from "../loading/Loading";
import { getOneProductApi, getDescriptionApi, updateProductApi } from "../../api/productApi";
import { useDispatch } from "react-redux";
import { updateProduct } from "../../redux/slices/productSlice";

const FormEditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  const [memory, setMemory] = useState("");
  const [product, setProduct] = useState({
    name: "",
    newPrice: "",
    oldPrice: "",
    colors: [],
    memories: [],
    category: "Phone",
  });
  const [contentMarkdown, setContentMarkdown] = useState("");
  const [contentHtml, setContentHtml] = useState("");

  const mdParser = new MarkdownIt();

  function handleEditorChange({ html, text }) {
    setContentMarkdown(text);
    setContentHtml(html);
  }

  useEffect(() => {
    (async (id) => {
      try {
        setLoading(true);
        const res = await getOneProductApi(id);
        if (res.data.success) {
          const { name, colors, memories, newPrice, oldPrice, category } = res.data.product;
          setProduct({
            ...product,
            name,
            newPrice,
            oldPrice,
            colors,
            memories,
            category,
          });
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast.error(error.response.data);
      }
    })(id);
  }, [id]);

  useEffect(() => {
    (async (id) => {
      try {
        const res = await getDescriptionApi(id);
        if (res.data.success) {
          setContentMarkdown(res.data.description.contentMarkdown);
          setContentHtml(res.data.description.contentHtml);
        }
      } catch (error) {
        toast.error(error.response.data);
      }
    })(id);
  }, [id]);

  const deleteColor = (id) => {
    const newListColor = product.colors.filter((p) => p !== id);
    setProduct({ ...product, colors: newListColor });
  };

  const deleteMemory = (id) => {
    const newListMemory = product.memories.filter((p) => p !== id);
    setProduct({ ...product, memories: newListMemory });
  };

  const onChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (product.colors.length === 0 || product.memories.length === 0)
      return toast.warn("product.colors.length === 0 || product.memories.length === 0!");

    setLoading(true);

    try {
      const res = await updateProductApi(id, {
        ...product,
        oldPrice: +product.oldPrice,
        newPrice: +product.newPrice,
        contentHtml,
        contentMarkdown,
      });
      if (res.data.success) {
        dispatch(updateProduct({ ...product, _id: id }));
        navigate(-1); // navigate(-1) is equivalent to hitting the back button.
        toast.success(res.data.message);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data);
      setLoading(false);
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
        />
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
        <div className="grid grid-cols-8 mt-4 gap-3">
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
        <div className="grid grid-cols-8 mt-4 gap-3">
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
      <div className="mt-4 w-full">
        <p className="mb-2">Description</p>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
          value={contentMarkdown}
        />
      </div>

      <div className="w-full text-right">
        <input
          type={"submit"}
          placeholder="Update Product"
          className="bg-green-600 mt-4 p-2 rounded-md text-white ring-2 hover:ring-[#ffd400]
          hover:scale-105 transition-all"
        />
      </div>
      {loading && <Loading />}
    </form>
  );
};

export default FormEditProduct;
