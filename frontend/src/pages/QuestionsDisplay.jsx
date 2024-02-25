import { useLocation } from "react-router-dom";
function QuestionsDisplay() {
  const location = useLocation();
  const data = location.state?.data;
  return (
    <div className="max-w-[1200px] mx-auto">
      <div className="xs:text-5xl text-center font-semibold my-7 select-none text-3xl">
        <span className="xs:text-5xl text-center font-semi-bold text-[#6541F5] font-bold text-3xl">
          Q
        </span>
        uiz
        <span className="xs:text-5xl text-center font-semi-bold font-bold text-orange-500 text-3xl">
          A
        </span>
        rena
      </div>
      <div className="bg-[#1A1A2F] p-5 mb-5 select-none">
        <h1 className="text-3xl font-semibold">These are the questions</h1>
      </div>
      {data.map((element) => (
        <div>
          <div className="bg-[#1A1A2F] p-5 mb-5 text-lg">
            {element.question}
          </div>
          <ul className="ml-10 w-fit min-w-96">
            <li className="bg-[#1A1A2F] p-3 mb-3">1. {element.options[0]}</li>
            <li className="bg-[#1A1A2F] p-3 mb-3">2. {element.options[1]}</li>
            <li className="bg-[#1A1A2F] p-3 mb-3">3. {element.options[2]}</li>
            <li className="bg-[#1A1A2F] p-3 mb-5">4. {element.options[3]}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default QuestionsDisplay;
