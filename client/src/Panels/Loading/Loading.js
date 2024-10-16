import React, { useState } from "react";
import './Loading.css'

function Loading() {
    return (
        <>
        <div className="loading">
            <div class="pencil">
                <div class="pencil__ball-point"></div>
                <div class="pencil__cap"></div>
                <div class="pencil__cap-base"></div>
                <div class="pencil__middle"></div>
                <div class="pencil__eraser"></div>
            </div>
            <div class="line"></div>
        </div> 
        </>
    )
};

export default Loading;
