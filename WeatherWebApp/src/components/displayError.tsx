interface Params {
    error: string;
}

function displayError({ error }: Params) {
    return (
        <>
        <div id="errDiv">
            <p>{error}</p>
        </div>
        </>
    );
};

export default displayError;