import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className='container-content'>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
