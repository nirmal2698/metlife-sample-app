import React, { useEffect, useState } from "react";

const useFetch = ({url, msg}) => {
    const [data, setData] = useState(null)

    useEffect((url, msg) => {
        fetch(url, msg)
        .then((res) => res.json())
        .then((data) => setData(data))
    }, [url], [msg])

    return [data]
};

export default useFetch;