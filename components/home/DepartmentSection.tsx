import { useState } from "react";
import MainBtn from "../common/MainBtn";
import Link from "next/link";
import Title from "../common/Title";

import { DepartmentType } from "../../types/department";

interface IProps {
  departments: DepartmentType[];
}

const DepartmentSection = ({ departments }: IProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <section className=" md:mt-20 mt-16">
      <Title
        title={"진료과별 이야기"}
        firstSubTitle={"진료과별로 정보를 공유할 수 있습니다."}
        secondSubTitle={"여러분도 함께해주세요."}
      />
      {/* Department Card */}
      <section className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-3 lg:gap-4 md:gap-4 gap-2 lg:mt-4 md:mt-4 mt-3">
        {departments.slice(0, 18).map((el) => {
          return (
            <li key={el.id} className="list-none">
              <Link href={`/department/${el.name}?id=${el.id}`}>
                <a>
                  <div className="flex justify-center items-center lg:h-16 md:h-16 h-12 border text-gray-main hover:text-blue-main border-gray-sub hover:border-blue-main cursor-pointer active:border-blue-sub active:text-blue-sub">
                    <div className="font-sub font-normal lg:text-sm md:text-sm text-xs">
                      {el.name}
                    </div>
                  </div>
                </a>
              </Link>
            </li>
          );
        })}
        {isOpen
          ? departments.slice(18).map((el) => {
              return (
                <li key={el.id} className="list-none">
                  <Link href={`/department/${el.name}`}>
                    <a>
                      <div className="flex justify-center items-center lg:h-16 md:h-16 h-12 border text-gray-main hover:text-blue-main border-gray-sub hover:border-blue-main cursor-pointer active:border-blue-sub active:text-blue-sub">
                        <div className="font-sub font-normal lg:text-sm md:text-sm text-xs">
                          {el.name}
                        </div>
                      </div>
                    </a>
                  </Link>
                </li>
              );
            })
          : null}
      </section>
      {/* button */}
      <section className="flex justify-center w-auto mt-4">
        {isOpen ? (
          <MainBtn context={"닫기"} handleClick={() => setIsOpen(!isOpen)} />
        ) : (
          <MainBtn context={"더보기"} handleClick={() => setIsOpen(!isOpen)} />
        )}
      </section>
    </section>
  );
};

export default DepartmentSection;
