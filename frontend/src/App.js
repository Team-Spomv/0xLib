import { useState } from "react";
import "./App.css";
import Homepage from "./pages/Homepage";
import LandingPage from "./pages/LandingPage";
import files from "./fakeFile";

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
    </div>
  );
};

export default App;
