import { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import files from "./fakeFile";
import { ThemeProvider } from "./components/ThemeContext";
import Background from "./components/Background";
import Toggle from "./components/ThemeToggle";

const App = () => {
  const [currentAccount, setCurrentAccount] = useState();
  const [data, setData] = useState(files);

  const connectWallet = async () => {
    if (typeof window.ethereum !== "undefined") {
      console.log("MetaMask is installed!");
    } else {
      alert("Please Install Metamask");
    }

    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (addressArray.length > 0) {
        setCurrentAccount(addressArray[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeProvider>
      <Background>
        <div className="absolute right-0 top-0 mr-14 mt-7 md:mr-2 md:mt-6 z-50">
          <Toggle />
        </div>
        <div>
          {currentAccount ? (
            <Homepage currentAccount={currentAccount} data={data} />
          ) : (
            <LandingPage
              connectWallet={connectWallet}
              currentAccount={currentAccount}
              setCurrentAccount={setCurrentAccount}
              data={data}
            />
          )}
          <footer className="dark:bg-slate-900 flex py-2 justify-center align-middle border-t">
            <a
              href="https://blockgames.gg"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-grow justify-center align-middle self-center text-sm dark:text-gray-200 text-gray-500"
            >
              Powered by{" "}
              <h1 className="text-gray-500 dark:text-gray-200 ml-2 font-bold text-sm self-center">
                Blockgames
              </h1>
            </a>
          </footer>
        </div>
      </Background>
    </ThemeProvider>
  );
};

export default App;
