import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar /> 
      <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold">Welcome to Smart Shopping Assistant!</h1>
        
        
      </main>
      <Footer />
    </>
  );
}

export default App;
