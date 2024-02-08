import { useState } from "react";
function CreateQuiz() {
  const [isChecked, setIsChecked] = useState(true);
  const [categories, setCategories] = useState([]);
  const cat = [
    "Mathematiques",
    "Histoire geo",
    "Langues",
    "Culture generale",
    "Science",
    "Sport",
    "Art",
    "Musique",
    "TV & Films",
  ];

  const handleRadio = (e) => {
    if (e.target.id === "auto") {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  };

  const handleCategories = (e) => {
    const categoryName = e.target.getAttribute("data-name");
    console.log(categoryName);
    if (!categories.includes(categoryName)) {
      setCategories([...categories, categoryName]);
    } else {
      const updatedCategories = categories.filter(
        (category) => category !== categoryName
      );
      setCategories(updatedCategories);
    }
  };
  return (
    <div className="bg-[#1A1A2F] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg z-20 sm:w-[700px] w-screen sm:h-5/6 h-screen overflow-auto px-10 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl mt-2 font-semibold">Creer un quiz</h1>
        <select
          defaultValue={"publique"}
          className="bg-[#1A1A2F] border rounded-lg p-2"
        >
          <option value="publique" className="text-sm">
            publique
          </option>
          <option value="privée" className="text-sm">
            privée
          </option>
        </select>
      </div>
      <div className="w-4/5 mx-auto">
        <label htmlFor="name">nom du quiz:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
          placeholder="Le fameux quiz"
          required
        />
        <div className="flex mb-2">
          <div className="flex-1">
            <label htmlFor="nbP" className="text-sm">
              nombre de joueur max:
            </label>
            <br />
            <input
              type="number"
              id="nbP"
              name="nbP"
              className="w-[100px] p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
              placeholder="10"
              required
            />
          </div>
          <div className="flex-1">
            <label htmlFor="nbQ" className="text-sm">
              nombre de question:
            </label>
            <br />
            <input
              type="number"
              id="nbQ"
              name="nbQ"
              className="w-[100px] p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
              placeholder="15"
              required
              disabled={!isChecked}
            />
          </div>
        </div>
        <div className="flex mb-2">
          <div className="flex-1">
            <input
              id="auto"
              name="questions"
              type="radio"
              className="align-middle mr-1"
              defaultChecked={true}
              onChange={handleRadio}
            />
            <label htmlFor="auto" className="text-sm mr-2 cursor-pointer">
              generer mes questions
            </label>
          </div>
          <div className="flex-1">
            <input
              id="manual"
              name="questions"
              type="radio"
              className="align-middle mr-1"
              onChange={handleRadio}
            />
            <label htmlFor="manual" className="text-sm cursor-pointer">
              je cree mes questions
            </label>
          </div>
        </div>

        <div
          className={`duration-200 ${
            isChecked ? "" : "opacity-10 select-none pointer-events-none"
          }`}
        >
          <p className="text-sm mb-1">
            selectionnez le niveau de difficulter du quiz:
          </p>
          <select className="bg-[#1A1A2F] border rounded-lg p-2 mb-1">
            <option value="facile" className="text-sm">
              Facile
            </option>
            <option value="moyen" className="text-sm">
              Moyen
            </option>
            <option value="difficile" className="text-sm">
              Difficile
            </option>
          </select>
          <p className="text-sm mb-1">
            Sélectionnez les catégories souhaitées:
          </p>
          <ul className="flex flex-wrap text-sm whitespace-nowrap">
            {cat.map((category) => {
              return (
                <li
                  className={`mr-2 border rounded-full py-1 px-2 mb-1 cursor-pointer duration-300 ${
                    categories.includes(category)
                      ? "bg-[#6541F5] hover:bg-[#492bc3]"
                      : "hover:bg-gray-500"
                  }`}
                  data-name={category}
                  onClick={handleCategories}
                  key={category}
                >
                  {category}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <button
        className=" fixed right-5 bottom-8 rounded-lg bg-[#6541F5] py-2 px-4 hover:bg-[#886df3] duration-300 block mx-auto"
        type="submit"
      >
        Suivant
      </button>
    </div>
  );
}

export default CreateQuiz;
