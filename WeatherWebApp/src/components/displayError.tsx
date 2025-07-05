import { useState } from "react";

interface Params {
    error: string | undefined;
}

function DisplayError({ error }: Params) {
    return (
        <>
        <div className="poppins-light">
            <p>{error}</p>
        </div>
        </>
    );
};

export default DisplayError;