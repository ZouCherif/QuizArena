import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";

function GoogleOauth() {
  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (codeResponse) => {},
  //   flow: "auth-code",
  // });

  return (
    <button
      // onClick={() => googleLogin()}
      className="flex xs:text-base text-sm items-center bg-transparent p-2 rounded-lg shadow-md mx-auto border-[1px] border-white text-white hover:bg-gray-400 hover:border-gray-400 hover:text-black"
    >
      <FcGoogle size={20} className="mr-2 " />
      Login with Google account
    </button>
  );
}

export default GoogleOauth;
