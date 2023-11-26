import React from "react";

function EmbededVideoIframe(_props = {}) {

    return (
        < React.Fragment >
            <div style={{ width: "100%", height: "100%" }}>
                <iframe style={{ border: "none" }} width="560" height="315" src="http://localhost:3000/embeded"
                    allowFullScreen title="qwe"></iframe>
            </div>
        </React.Fragment >

    );
}

export default EmbededVideoIframe;
