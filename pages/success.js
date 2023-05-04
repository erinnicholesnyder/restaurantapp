import React, { useContext, useState } from "react";
import {useRouter} from "next/router"

function Success() {
    const router = useRouter();
    return (<h1>Success!</h1>)
};

export default Success