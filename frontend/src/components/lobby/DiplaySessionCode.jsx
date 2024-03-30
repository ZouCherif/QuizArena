import { useState, useEffect } from "react";
import { getSessionCode } from "../../utils/api";

function DisplaySessionCode({ id }) {
  const [code, setCode] = useState(null);
  useEffect(() => {
    const getCode = async (id) => {
      try {
        const { sessionCode } = await getSessionCode(id);
        setCode(sessionCode);
      } catch (err) {
        console.log(err);
      }
    };
    getCode(id);
  }, [id]);
  return <span className="text-6xl font-semibold mr-4">{code}</span>;
}

export default DisplaySessionCode;
