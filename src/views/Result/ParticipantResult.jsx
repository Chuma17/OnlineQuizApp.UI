import "./Result.css"
import axios from "../../axios/axios";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const ParticipantResult = () => {
    return <>
        <div id="result-page-content">

            <header id="result-header">
                Header
            </header>

            <aside id="result-aside">
                Aside
            </aside>

            <main id="result-main">
                Main
            </main>

            <section id="result-section">
                Section
            </section>

        </div>

    </>
}

export default ParticipantResult;