import React from "react";
import { Breadcrumb } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { LiaHomeSolid } from "react-icons/lia";

const MyBreadCrumb = (props) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb className="m-5">
      {pathnames.length > 0 && (
        <Breadcrumb.Item>
          <div className="text-Darker font-bold text-lg dark:text-white flex gap-2 items-center">
            <LiaHomeSolid size="23" className="mb-1"/>
            <Link to="/">
              Trang chủ
            </Link>
          </div>
        </Breadcrumb.Item>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        
        return (
          <Breadcrumb.Item key={index}>
            {isLast ? (
              <p className="font-bold text-gray-500 text-lg dark:text-white">
                {props.BreadCrumbName}
              </p>
            ) : (
              <Link to={routeTo} className="text-Darker font-bold text-lg dark:text-white">
                {name === "settings" ? "Cài đặt": (name === "posts" ? "Bài viết": name )}
              </Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default MyBreadCrumb;
