import React from "react";

const Hero = ({ handleLogout }) => {
    return (
        <section className="hero">
            <nav>
                <h2>Expense Tracker</h2>
                <button onClick={handleLogout}>Log out</button>
            </nav>

        </section>

    );
};

export default Hero;