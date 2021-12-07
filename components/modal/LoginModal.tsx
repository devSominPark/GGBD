import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import queryString from "query-string";
import axios from "axios";

interface IProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ isLoginModalOpen, setIsLoginModalOpen }: IProps) => {
  const router = useRouter();
  const code = router.query.code as string;

  useEffect(() => {
    const getKakaoAccessToken = async (code: string) => {
      const formData = {
        grant_type: "authorization_code",
        client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API,
        redirect_uri: `${process.env.NEXT_PUBLIC_API_URL}/oauth/kakao`,
        code,
      };
      const tokenData = await axios.post(
        `https://kauth.kakao.com/oauth/token?${queryString.stringify(formData)}`
      );
      return tokenData;
    };
    const getSocialAccessToken = async (code: string) => {
      try {
        const tokenData = await getKakaoAccessToken(code);
        const userInfo = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/oauth/kakao/login`,
          {
            tokenData,
          }
        );
        console.log(userInfo);
        router.push("/");
      } catch (e) {
        console.log(e);
      }
    };
    if (code) {
      getSocialAccessToken(code);
    }
  }, [code]);

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API}&redirect_uri=${process.env.NEXT_PUBLIC_API_URL}/oauth/kakao&&response_type=code`;
  return (
    <main
      className={
        " fixed overflow-hidden z-50 inset-0 transform  bg-gray-sub bg-opacity-25" +
        (isLoginModalOpen ? "  " : " hidden ")
      }
    >
      {/* Modal section */}
      <section
        className={
          "flex flex-col items-center mx-4  justify-center md:w-screen md:max-w-lg md:mx-auto lg:mx-auto my-auto rounded-2xl inset-0 absolute bg-white h-1/2  shadow-xl"
        }
      >
        {/* logo div */}
        <div className="mb-10">
          <Image
            src="/images/global/logo_lg.svg"
            alt="logo_lg"
            width={120}
            height={24}
          />
        </div>
        {/* description div */}
        <div className="font-main text-center text-gray-main border-gray-sub border-t border-b py-10 w-5/6 px-4">
          공감병동에 방문해주셔서 감사합니다.
          <br />
          소셜을 통해 로그인하시면 공감병동의 <br className="md:hidden" />
          서비스를
          <br className="hidden md:block" /> 보다 더 다양하게 이용할 수
          있습니다.
          <br className="hidden md:block" />
          감사합니다.
        </div>
        {/* button div */}
        <div className="flex flex-col items-center w-5/6 gap-y-6 mt-8">
          <button className="flex items-center justify-center w-full h-14 bg-white rounded-xl shadow-lg">
            <Image
              src="/images/auth/google.svg"
              alt="google_logo"
              width={18}
              height={18}
            />
            <span className="font-google text-google-label text-lg ml-2">
              Google 계정으로 로그인
            </span>
          </button>
          <a
            href={kakaoURL}
            className="flex items-center justify-center w-full h-14 bg-kakao-container rounded-xl shadow-lg cursor-pointer"
          >
            <Image
              src="/images/auth/kakao.svg"
              alt="kakao_logo"
              width={18}
              height={18}
            />
            <span className="text-kakao-label text-opacity-90 text-lg ml-2">
              카카오 로그인
            </span>
          </a>
        </div>
      </section>
      {/* background section */}
      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setIsLoginModalOpen(false);
        }}
      ></section>
    </main>
  );
};

export default LoginModal;
