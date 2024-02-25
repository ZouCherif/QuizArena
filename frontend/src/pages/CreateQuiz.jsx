import { useState } from "react";
import { getQuestions } from "../utils/api";
import { useNavigate } from "react-router-dom";

function CreateQuiz() {
  const [data, setData] = useState({
    name: "",
    type: "publique",
    nbP: 0,
    nbQ: 0,
    auto: true,
    categories: [],
    lvl: ["Moyen"],
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prevData[name], value]
            : prevData[name].filter((item) => item !== value)
          : value,
    }));
  };

  const cat = [
    "Mathematiques",
    "Histoire",
    "Langues",
    "Culture generale",
    "Science",
    "Sport",
    "Art",
    "Musique",
    "TV & Films",
  ];

  const handleOnSubmit = async () => {
    try {
      const response = await getQuestions(data);
      console.log(response);
      navigate("/questions", { state: { data: response.questions } });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="bg-[#1A1A2F] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg z-20 sm:w-[700px] w-screen sm:h-5/6 h-screen overflow-auto px-10 py-4 select-none">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl mt-2 font-semibold">Creer un quiz</h1>
        <select
          value={data.type}
          name="type"
          onChange={handleInputChange}
          className="bg-[#1A1A2F] border rounded-lg p-2 cursor-pointer"
        >
          <option value="publique">publique</option>
          <option value="privée">privée</option>
        </select>
      </div>
      <div className="w-4/5 mx-auto">
        <label htmlFor="name">nom du quiz:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={data.name}
          className="w-full p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
          placeholder="Le fameux quiz"
          required
          onChange={handleInputChange}
        />
        <div className="flex mb-2">
          <div className="flex-1">
            <label htmlFor="nbP" className="">
              nombre de joueur max:
            </label>
            <br />
            <input
              type="number"
              id="nbP"
              name="nbP"
              value={data.nbP}
              min={0}
              className="w-[100px] p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
              placeholder="10"
              required
              onChange={handleInputChange}
            />
          </div>
          <div
            className={`flex-1 duration-300 ${!data.auto ? "opacity-10" : ""}`}
          >
            <label htmlFor="nbQ">nombre de question:</label>
            <br />
            <input
              type="number"
              id="nbQ"
              name="nbQ"
              value={data.nbQ}
              min={0}
              className="w-[100px] p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
              placeholder="15"
              required
              disabled={!data.auto}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex mb-3">
          <div className="flex-1">
            <input
              id="auto"
              name="auto"
              type="radio"
              className="align-middle mr-1"
              value="true"
              checked={data.auto}
              onChange={handleInputChange}
            />
            <label htmlFor="auto" className=" mr-2 cursor-pointer">
              generer mes questions
            </label>
          </div>
          <div className="flex-1">
            <input
              id="manual"
              name="auto"
              type="radio"
              className="align-middle mr-1"
              value="false"
              checked={!data.auto}
              onChange={handleInputChange}
            />
            <label htmlFor="manual" className=" cursor-pointer">
              je cree mes questions
            </label>
          </div>
        </div>

        <div
          className={`duration-200 ${
            data.auto ? "" : "opacity-10 select-none pointer-events-none"
          }`}
        >
          <p className=" mb-1">
            selectionnez le niveau de difficulter du quiz:
          </p>
          <div className="flex mb-3 justify-around">
            <label
              className={`border py-2 px-4 rounded-full cursor-pointer duration-300 ${
                data.lvl.includes("Facile")
                  ? "bg-[#6541F5] hover:bg-[#492bc3]"
                  : "hover:bg-gray-500"
              }`}
            >
              <input
                type="checkbox"
                id="Facile"
                name="lvl"
                value="Facile"
                className="hidden"
                checked={data.lvl.includes("Facile")}
                onChange={handleInputChange}
              />
              <span className="cursor-pointer">Facile</span>
            </label>
            <label
              className={`border py-2 px-4 rounded-full cursor-pointer duration-300 ${
                data.lvl.includes("Moyen")
                  ? "bg-[#6541F5] hover:bg-[#492bc3]"
                  : "hover:bg-gray-500"
              }`}
            >
              <input
                type="checkbox"
                id="Moyen"
                name="lvl"
                value="Moyen"
                className="hidden"
                checked={data.lvl.includes("Moyen")}
                onChange={handleInputChange}
              />
              <span className="cursor-pointer">Moyen</span>
            </label>
            <label
              className={`border py-2 px-4 rounded-full cursor-pointer duration-300 ${
                data.lvl.includes("Difficile")
                  ? "bg-[#6541F5] hover:bg-[#492bc3]"
                  : "hover:bg-gray-500"
              }`}
            >
              <input
                type="checkbox"
                id="Difficile"
                name="lvl"
                value="Difficile"
                className="hidden"
                checked={data.lvl.includes("Difficile")}
                onChange={handleInputChange}
              />
              <span className="cursor-pointer">Difficile</span>
            </label>
          </div>
          <p className=" mb-1">Sélectionnez les catégories souhaitées:</p>
          <div className="flex flex-wrap text-sm whitespace-nowrap">
            {cat.map((category) => {
              return (
                <label
                  className={`mr-2 border rounded-full py-1 px-2 mb-2 cursor-pointer duration-300 ${
                    data.categories.includes(category)
                      ? "bg-[#6541F5] hover:bg-[#492bc3]"
                      : "hover:bg-gray-500"
                  }`}
                  key={category}
                >
                  <input
                    type="checkbox"
                    value={category}
                    name="categories"
                    onChange={handleInputChange}
                    className="hidden"
                    checked={data.categories.includes(category)}
                  />
                  <span className="cursor-pointer">{category}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
      <button
        className="rounded-lg bg-[#6541F5] py-2 px-4 hover:bg-[#886df3] duration-300 block ml-auto"
        type="submit"
        onClick={handleOnSubmit}
      >
        Suivant
      </button>
    </div>
  );
}

export default CreateQuiz;
