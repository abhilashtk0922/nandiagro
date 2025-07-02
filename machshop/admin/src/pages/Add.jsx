import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Kisankraft");
  const [subCategory, setSubCategory] = useState("Machine");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDescription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full items-start gap-3 py-8"
    >
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full max-w-[500px] px-3 py-2"
          type="text"
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Kisankraft">Kisankraft</option>
            <option value="Really">Really</option>
            <option value="Mitsuyama">Mitsuyama</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="Machine">Machine</option>
            <option value="Parts">Parts</option>
            <option value="Others">Others</option>
          </select>
        </div>
      </div>

      <div>
        <p className="mb-2">Product Details</p>
        <div className="flex gap-3">
          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Tools")
                  ? prev.filter((item) => item !== "Tools")
                  : [...prev, "Tools"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("Tools") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Tools
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Things")
                  ? prev.filter((item) => item !== "Things")
                  : [...prev, "Things"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("Things") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Things
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Spares")
                  ? prev.filter((item) => item !== "Spares")
                  : [...prev, "Spares"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("Spares") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Spares
            </p>
          </div>

          <div
            onClick={() =>
              setSizes((prev) =>
                prev.includes("Repair")
                  ? prev.filter((item) => item !== "Repair")
                  : [...prev, "Repair"]
              )
            }
          >
            <p
              className={`${
                sizes.includes("Repair") ? "bg-pink-100" : "bg-slate-200"
              } px-3 py-1 cursor-pointer`}
            >
              Repair
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded-md"
      >
        Upload
      </button>
    </form>
  );
};

export default Add;
