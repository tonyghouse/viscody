import ThemeContextDefaultProvider from "./context/ThemeContextProvider";
import DataTypeContextProvider from "./context/DataTypeContextProvider";
import MasterLayout from "./components/MasterLayout";



function App() {

  return (
    <>
    <div className="App">
        
        <ThemeContextDefaultProvider>
          <DataTypeContextProvider>
            <MasterLayout />
          </DataTypeContextProvider>
        </ThemeContextDefaultProvider>
         
      </div>

    </>
  )
}

export default App
