import './App.css';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import User from './components/getproduct/User';
import Add from './components/addproduct/Add';
import Edit from './components/updateproduct/Edit';

function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element: <User/>,
    },
    {
      path:"/add",
      element: <Add/>,
    },
    {
      path:"/edit/:id",
      element: <Edit/>,
    },
  ])

  return (
    <div className="App">
       <RouterProvider router={route}></RouterProvider>
    </div>
  );
}

export default App;
