import './App.css'
import ListOfUsers from './components/ListOfUsers'
import { CreateNewUser } from './components/CreateNewUser'
import ListOfPosts from './components/ListOfPosts'
function App() {
  return (
    <>
      <ListOfUsers/>
      <CreateNewUser/>
      <ListOfPosts/>
    </>
  )  
}

export default App
