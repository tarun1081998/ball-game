import React from "react";

const Cell = ({ children }) => {
    return (
        <div className="cell">
            {children}
        </div>
    );
};

export default Cell;