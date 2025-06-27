import React from "react";
import TodoList from './components/TodoList';
import Navbar from './components/Navbar'
import Footer from './components/Footer' 
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <TodoList />
      <Footer />
    </div>
  );
}

export default App;
