import React from "react";
import { Breadcrumb } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";

const BreadcrumbComponent = (props) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumb className="m-5">
      {pathnames.length > 0 && (
        <Breadcrumb.Item icon={IoHomeOutline}>
          <Link to="/" className="font-black dark:text-white">
            Trang chủ
          </Link>
        </Breadcrumb.Item>
      )}
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return (
          <Breadcrumb.Item key={index}>
            {isLast ? (
              <p className="text-700 text-darker font-black dark:text-white">
                {props.BreadCrumbName}
              </p>
            ) : (
              <Link to={routeTo} className="font-black dark:text-white">
                {name}
              </Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
