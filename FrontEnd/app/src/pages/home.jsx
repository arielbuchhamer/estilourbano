import Header from "../components/header";
import ListTurnos from "../components/listTurnos";
import React from "react";
const Home = () => {
    
    return (
        <>
            <div className="min-h-screen bg-[var(--color-bg)] text-white">
                <Header/>
                <ListTurnos/>
            </div>
            

        </>
      
    );
};

export default Home;