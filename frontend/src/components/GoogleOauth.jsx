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
      className="flex items-center bg-stone-200 p-2 shadow-md mx-auto border-[1px] border-black text-black"
    >
      <FcGoogle size={20} className="mr-2" />
      login with Google account
    </button>
  );
}

export default GoogleOauth;
