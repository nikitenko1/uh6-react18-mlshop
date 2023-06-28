import { Link } from "react-router-dom";
import Plus from "../shared/Plus";
import { toast } from "react-hot-toast";
import { deleteProductApi } from "../../api/productApi";
import { useDispatch } from "react-redux";
import { deleteProducts } from "../../redux/slices/productSlice";
import { v4 } from "uuid";
import { calculateCreatedTime } from "../../utils/formatDate";

const ProductTable = ({ product }) => {
  const dispatch = useDispatch();

  if (product.length === 0)
    return (
      <div className="h-[100%] flex items-center justify-center ">
        <p className="text-[#b2071d] font-semibold">Not a product!</p>
        <Plus />
      </div>
    );

  const removeProduct = async (id) => {
    const check = window.confirm("you are sure to remove!");
    if (!check) return;
    try {
      const res = await deleteProductApi(id);
      if (res.data.success) {
        dispatch(deleteProducts(id));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="my-2 sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b">
            <table className="min-w-full divide-y">
              <thead className="bg-white">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Old Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    New Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    CreateAt
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[#fff] divide-y">
                {product.map((p) => (
                  <tr key={v4()}>
                    <td className="pl-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-[70px] w-[50px]">
                          <img className="w-full h-full object-cover" src={p.thumbnail} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-black">
                            {p.name.length > 40 ? p.name.slice(0, 40) + "..." : p.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-black">{p.oldPrice || "Do not have"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-black">{p.newPrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800`}
                      >
                        {p.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {calculateCreatedTime(p.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link to={`edit/${p._id}`} className="text-indigo-600 hover:text-indigo-900">
                        Edit
                      </Link>
                      <button
                        onClick={() => removeProduct(p._id)}
                        className="text-indigo-600 hover:text-indigo-900 ml-3"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Plus />
    </div>
  );
};

export default ProductTable;
