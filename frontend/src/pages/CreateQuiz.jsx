function CreateQuiz() {
  return (
    <div className="bg-[#1A1A2F] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg z-20 sm:w-[600px] w-screen sm:h-5/6 h-screen overflow-auto px-10 py-4">
      <div className="flex justify-between items-center mb-8">
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
      <div className="w-2/3 mx-auto">
        <label htmlFor="name">nom du quiz:</label>
        <input
          type="text"
          id="name"
          name="name"
          className="w-full p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
          placeholder="Le fameux quiz"
          required
        />
        <div className="flex">
          <div>
            <label htmlFor="nbP" className="text-sm">
              nombre de joueur max:
            </label>
            <input
              type="number"
              id="nbP"
              name="nbP"
              className="w-[100px] p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
              placeholder="10"
              required
            />
          </div>
          <div>
            <label htmlFor="nbQ" className="text-sm">
              nombre de question:
            </label>
            <input
              type="number"
              id="nbQ"
              name="nbQ"
              className="w-[100px] p-3 rounded bg-[#D9D9D9] opacity-50 text-black mb-1"
              placeholder="15"
              required
            />
          </div>
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
