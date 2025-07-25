import "./App.css";
import Form from "../src/containers/form/Form";
import Header from "../src/assets/components/Header";
import Footer from "../src/assets/components/Footer";

function App() {
  return (
    <div className="App" id="appContainerID">
      <div className="logoParent">
        <Header />
      </div>
      <Form />
      <div id="footer" className="footerParent">
        <Footer />
      </div>
    </div>
  );
}

export default App;
