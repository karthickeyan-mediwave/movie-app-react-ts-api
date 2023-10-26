// const Layout = () => {
//   return <main className="container"></main>;
// };

// export default Layout;
import { useEffect } from "react";

const Layout = (props: any) => {
  useEffect(() => {
    if (props.title) {
      document.title = props.title;
    }
  }, [props.title]);
  return (
    <>
      <div className="container">{props.children}</div>
    </>
  );
};

export default Layout;
