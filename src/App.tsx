import React from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import SearchForm from "./components/SearchForm";

function App() {
  const { bookingNo } = useParams();
  const [query, setQuery] = React.useState(bookingNo || "");
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (location.pathname === "/" && !bookingNo) {
      setQuery("");
    }
  }, [location.pathname, bookingNo]);

  return (
    <div className="App">
      <div className="print:hidden">
        <Header />
      </div>
      <main className="px-5 flex flex-col w-full justify-center">
        <div className="print:hidden">
          <SearchForm
            query={query}
            setQuery={setQuery}
            onSubmit={() => {
              if (query === "") {
                return navigate("/");
              }
              navigate("/search/" + query);
            }}
          />
        </div>
        <div className="max-w-xl self-center">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default App;
