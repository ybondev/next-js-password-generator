"use client";
import Checkbox from "@components/Checkbox";
import { getRandomChar, getRandomSpecialChar } from "@utils/utils";
import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

const page = () => {
  const [data, setData] = useState(12);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("STRONG");
  const [password, setPassword] = useState({
    uppercase: false,
    lowercase: false,
    numbers: false,
    symbols: false,
  });

  const handleChangeUppercase = () => {
    setPassword({
      ...password,
      uppercase: !password.uppercase,
    });
  };

  const handleChangeLowercase = () => {
    setPassword({
      ...password,
      lowercase: !password.lowercase,
    });
  };

  const handleChangeNumbers = () => {
    setPassword({
      ...password,
      numbers: !password.numbers,
    });
  };

  const handleChangeSymbols = () => {
    setPassword({
      ...password,
      symbols: !password.symbols,
    });
  };

  const fieldsArray = [
    {
      field: password.uppercase,
      getChar: () => getRandomChar(65, 90),
    },
    {
      field: password.lowercase,
      getChar: () => getRandomChar(97, 122),
    },
    {
      field: password.numbers,
      getChar: () => getRandomChar(48, 57),
    },
    {
      field: password.symbols,
      getChar: () => getRandomSpecialChar(),
    },
  ];

  const GENERATE_PASSWORD = () => {
    let generatedPassword = "";
    const checkedFields = fieldsArray.filter(({ field }) => field);

    for (let i = 0; i < document.getElementById("range").value; i++) {
      const index = Math.floor(Math.random() * checkedFields.length);
      const letter = checkedFields[index]?.getChar();

      if (letter) {
        generatedPassword += letter;
      }
    }
    if (generatedPassword) {
      setResult(generatedPassword);
    } else {
      toast.error(" Please select at least one option");
    }
  };

  const handleClipboard = async () => {
    if (result) {
      await navigator.clipboard.writeText(result);
      toast.success("Copied to your clipboard");
    } else {
      toast.error("No password to copy");
    }
  };

  useEffect(() => {
    if (document.getElementById("range").value >= 12) {
      setStatus("STRONG!!");
      document.getElementById("stat").style.color = "#a3ffae";
    } else if (document.getElementById("range").value == 8) {
      setStatus("MEDIUM!");
      document.getElementById("stat").style.color = "orange";
    } else if (document.getElementById("range").value <= 5) {
      setStatus("WEAK!");
      document.getElementById("stat").style.color = "red";
    }
  });

  return (
    <>
      <section className="password_section container-fluid">
        <div className="container">
          <div className="row gy-3">
            <div className="col-md-6">
              <div className="img_container">
                <Image
                  src={`./assets/undraw_secure_login_pdn4.svg`}
                  width={500}
                  height={0}
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form">
                <div className="header">
                  password <span>generator</span>
                </div>
                <div className="display_value">
                  <input
                    type="text"
                    className="text form-control"
                    id="password"
                    placeholder="P4s$w0rd!"
                    value={result}
                  />
                  <FaCopy className="fa_icon" onClick={handleClipboard} />
                </div>
                <span>Password length</span>
                <div className="range_container">
                  <input
                    type="range"
                    id="range"
                    min={1}
                    max={50}
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                  />
                  <span>{data}</span>
                </div>
                <div className="checkbox_container">
                  <span>Include uppercase letters</span>
                  <Checkbox
                    value={password.uppercase}
                    onChange={handleChangeUppercase}
                  />
                </div>
                <div className="checkbox_container">
                  <span>Include lowercase letters</span>
                  <Checkbox
                    value={password.lowercase}
                    onChange={handleChangeLowercase}
                  />
                </div>
                <div className="checkbox_container">
                  <span>Include numbers</span>
                  <Checkbox
                    value={password.numbers}
                    onChange={handleChangeNumbers}
                  />
                </div>
                <div className="checkbox_container">
                  <span>Include symbols</span>
                  <Checkbox
                    value={password.symbols}
                    onChange={handleChangeSymbols}
                  />
                </div>
                <div className="status_container mt-3">
                  <div className="stats">
                    <span>strength</span>
                    <span id="stat">{status}</span>
                  </div>
                </div>
                <div className="btn_container mt-3">
                  <button onClick={GENERATE_PASSWORD}>generate</button>
                </div>
                <div className="dev mt-3">
                  <Link href="" className="link">
                    ybon.dev
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
