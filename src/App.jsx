import { useState } from "react";
import "./App.css";
import bgCardFront from './images/bg-card-front.png';
import bgCardBack from './images/bg-card-back.png';
function App() {
  const defaultCCInfo = {
    ccNum: "0000 0000 0000 0000",
    ccHolder: "Jane Appleseed",
    ccVal: { month: "00", year: "00" },
    ccCVCNum: "000",
  };
  const [userInput, setUserInput] = useState(defaultCCInfo);
  const [inputCorrect, setInputCorrectness] = useState({
    name: false,
    ccNum: false,
    ccMM: false,
    ccYY: false,
    ccCVC: false,
  });
  const [isInputing, changeInputingState] = useState(true);

  const continueClickHandler = (event) =>{
    setUserInput(defaultCCInfo);
    changeInputingState(true);
  }

  const ccHolderChangeHandler = (event) => {
    setUserInput((prevInput) => {
      if (event.target.value === "") {
        return {
          ...prevInput,
          ccHolder: defaultCCInfo.ccHolder,
        };
      }
      setInputCorrectness((prevState) => {
        return {
          ...prevState,
          name: false,
        };
      });
      return {
        ...prevInput,
        ccHolder: event.target.value,
      };
    });
  };

  const ccNumChangeHandler = (event) => {
    if (event.target.value === "") {
    }
    setUserInput((prevInput) => {
      if (event.target.value === "") {
        return {
          ...prevInput,
          ccNum: defaultCCInfo.ccNum,
        };
      }
      setInputCorrectness((prevState) => {
        return {
          ...prevState,
          ccNum: false,
        };
      });
      let input = event.target.value.replace(/\D/g, "").substring(0, 16);
      input = input != "" ? input.match(/.{1,4}/g).join(" ") : "";

      event.target.value = input;
      return {
        ...prevInput,
        ccNum: event.target.value,
      };
    });
  };

  const ccValMChangeHandler = (event) => {
    setUserInput((prevInput) => {
      if (event.target.value === "") {
        return {
          ...prevInput,
          ccVal: defaultCCInfo.ccVal,
        };
      }
      setInputCorrectness((prevState) => {
        return {
          ...prevState,
          ccMM: false,
        };
      });
      let input = event.target.value.replace(/\D/g, "").substring(0, 2);
      event.target.value = input;
      return {
        ...prevInput,
        ccVal: {
          month:
            event.target.value.length > 1
              ? event.target.value
              : "0" + event.target.value,
          year: prevInput.ccVal.year,
        },
      };
    });
  };
  const ccValYChangeHandler = (event) => {
    setUserInput((prevInput) => {
      if (event.target.value === "") {
        return {
          ...prevInput,
          ccVal: defaultCCInfo.ccVal,
        };
      }
      setInputCorrectness((prevState) => {
        return {
          ...prevState,
          ccYY: false,
        };
      });
      let input = event.target.value.replace(/\D/g, "").substring(0, 2);
      event.target.value = input;
      return {
        ...prevInput,
        ccVal: {
          month: prevInput.ccVal.month,
          year:
            event.target.value.length > 1
              ? event.target.value
              : "0" + event.target.value,
        },
      };
    });
  };

  const ccCVCChangeHandler = (event) => {
    setUserInput((prevInput) => {
      if (event.target.value === "") {
        return {
          ...prevInput,
          ccCVCNum: defaultCCInfo.ccCVCNum,
        };
      }
      setInputCorrectness((prevState) => {
        return {
          ...prevState,
          ccCVC: false,
        };
      });
      let input = event.target.value.replace(/\D/g, "").substring(0, 3);
      event.target.value = input;
      return {
        ...prevInput,
        ccCVCNum: event.target.value,
      };
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    let flag = false;
    setInputCorrectness((prevState) => {
      return {
        name: false,
        ccYY: false,
        ccMM: false,
        ccCVC: false,
        ccNum: false,
      };
    });
    const ccInput = userInput;
    if (ccInput.ccNum.length < 19 || ccInput.ccNum === defaultCCInfo.ccNum) {
      setInputCorrectness((prevState) => {
        return {
          ...prevState,
          ccNum: true,
        };
      });
      flag = true;
    }
    if (
      ccInput.ccHolder.length <= 0 ||
      ccInput.ccHolder === defaultCCInfo.ccHolder
    ) {
      setInputCorrectness((prevState) => {
        return {
          ...prevState,
          name: true,
        };
      });
      flag = true;
    }
    if (ccInput.ccVal.month === "00" || ccInput.ccVal.month > "12") {
      setInputCorrectness((prevState) => {
        return {
          ...prevState,
          ccMM: true,
        };
      });
      flag = true;
    }
    if (
      ccInput.ccVal.year <
      new Date().toLocaleDateString("en", { year: "2-digit" })
    ) {
      setInputCorrectness((prevState) => {
        return {
          ...prevState,
          ccYY: true,
        };
      });
      flag = true;
    }
    let dateObj = new Date();
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let year = dateObj.getUTCFullYear();
    let newdate = year + "/" + month;
    let inputDate = "20" + ccInput.ccVal.year + "/" + ccInput.ccVal.month;
    if (Date.parse(inputDate) < Date.parse(newdate)) {
      setInputCorrectness((prevState) => {
        return {
          ...prevState,
          ccYY: true,
          ccMM: true,
        };
      });
      flag = true;
    }

    if (ccInput.ccCVCNum.length < 3 || ccInput.ccCVCNum === "000") {
      setInputCorrectness((prevState) => {
        return {
          ...prevState,
          ccCVC: true,
        };
      });
      flag = true;
    }
    if (flag) {
      return;
    }
    changeInputingState(false);
  };

  return (
    <>
      <div className="main-page-container">
        <div className="card-display-container"></div>
        <div className="card-form-container">
          <div className="form-container">
            {console.log(isInputing)}
            {isInputing ? (
              <div className="main-form">
                <form className="actual-form" onSubmit={submitHandler} id="actual-form">
                  <p>CARDHOLDER NAME</p>
                  <input
                    type="text"
                    name="ccHolder"
                    id="ccHolder"
                    placeholder={"eg. " + defaultCCInfo.ccHolder}
                    autoComplete="off"
                    maxLength="19"
                    style={
                      inputCorrect.name
                        ? {
                            border: "double 2px transparent",
                            outline: "none",
                            backgroundImage:
                              "linear-gradient(#ffffff, #ffffff),linear-gradient(to right, hsl(0, 100%, 66%), hsl(0, 100%, 66%))",
                            backgroundOrigin: "border-box",
                            backgroundClip: "padding-box, border-box",
                          }
                        : {}
                    }
                    onChange={ccHolderChangeHandler}
                  />
                  <p
                    id="label-info"
                    style={!inputCorrect.name ? { visibility: "hidden" } : {}}
                  >
                    Input is not correct.
                  </p>
                  <p>CARD NUMBER</p>
                  <input
                    type="text"
                    name="ccNumber"
                    id="ccNumber"
                    placeholder={"eg. " + defaultCCInfo.ccNum}
                    autoComplete="off"
                    minLength="19"
                    maxLength="19"
                    style={
                      inputCorrect.ccNum
                        ? {
                            border: "double 2px transparent",
                            outline: "none",
                            backgroundImage:
                              "linear-gradient(#ffffff, #ffffff),linear-gradient(to right, hsl(0, 100%, 66%), hsl(0, 100%, 66%))",
                            backgroundOrigin: "border-box",
                            backgroundClip: "padding-box, border-box",
                          }
                        : {}
                    }
                    onChange={ccNumChangeHandler}
                  />
                  <p
                    id="label-info"
                    style={!inputCorrect.ccNum ? { visibility: "hidden" } : {}}
                  >
                    Input is not correct.
                  </p>
                  <div className="adition-info">
                    <div style={{ width: "50%" }}>
                      <p>EXP DATE (MM/YY)</p>
                      <input
                        type="text"
                        name="ccMonth"
                        id="ccMonth"
                        placeholder={"MM"}
                        autoComplete="off"
                        maxLength="2"
                        style={
                          inputCorrect.ccMM
                            ? {
                                border: "double 2px transparent",
                                outline: "none",
                                backgroundImage:
                                  "linear-gradient(#ffffff, #ffffff),linear-gradient(to right, hsl(0, 100%, 66%), hsl(0, 100%, 66%))",
                                backgroundOrigin: "border-box",
                                backgroundClip: "padding-box, border-box",
                              }
                            : {}
                        }
                        onChange={ccValMChangeHandler}
                      />
                      <input
                        type="text"
                        name="ccYear"
                        id="ccYear"
                        placeholder={"YY"}
                        autoComplete="off"
                        maxLength="2"
                        style={
                          inputCorrect.ccYY
                            ? {
                                border: "double 2px transparent",
                                outline: "none",
                                backgroundImage:
                                  "linear-gradient(#ffffff, #ffffff),linear-gradient(to right, hsl(0, 100%, 66%), hsl(0, 100%, 66%))",
                                backgroundOrigin: "border-box",
                                backgroundClip: "padding-box, border-box",
                              }
                            : {}
                        }
                        onChange={ccValYChangeHandler}
                      />
                      <p
                        id="label-info"
                        style={
                          !inputCorrect.ccMM && !inputCorrect.ccYY
                            ? { visibility: "hidden" }
                            : {}
                        }
                      >
                        The date is not valid.
                      </p>
                    </div>
                    <div>
                      <p>CVC</p>
                      <input
                        type="text"
                        name="ccCVC"
                        id="ccCVC"
                        placeholder={"eg. " + defaultCCInfo.ccCVCNum}
                        autoComplete="off"
                        minLength="3"
                        maxLength="3"
                        style={
                          inputCorrect.ccCVC
                            ? {
                                border: "double 2px transparent",
                                outline: "none",
                                backgroundImage:
                                  "linear-gradient(#ffffff, #ffffff),linear-gradient(to right, hsl(0, 100%, 66%), hsl(0, 100%, 66%))",
                                backgroundOrigin: "border-box",
                                backgroundClip: "padding-box, border-box",
                              }
                            : {}
                        }
                        onChange={ccCVCChangeHandler}
                      />
                      <p
                        id="label-info"
                        style={
                          !inputCorrect.ccCVC ? { visibility: "hidden" } : {}
                        }
                      >
                        Input is not correct.
                      </p>
                    </div>
                  </div>
                  <button id="submit-btn" type="submit">
                    Confirm
                  </button>
                </form>
              </div>
            ) : (
              <div style={{color:"hsl(278, 68%, 11%)", display:"grid",placeItems:"center",textAlign:"center"}}>
                <svg
                  width="80"
                  height="80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="40" cy="40" r="40" fill="url(#a)" />
                  <path
                    d="M28 39.92 36.08 48l16-16"
                    stroke="#fff"
                    stroke-width="3"
                  />
                  <defs>
                    <linearGradient
                      id="a"
                      x1="-23.014"
                      y1="11.507"
                      x2="0"
                      y2="91.507"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stop-color="#6348FE" />
                      <stop offset="1" stop-color="#610595" />
                    </linearGradient>
                  </defs>
                </svg>
                <h3 style={{margin:"1rem", marginBottom:"0",fontSize:"2rem"}}>Thank you!</h3>
                <p style={{marginBottom:"1rem"}}>We've added your card details</p>
                <button id="submit-btn" type="button" onClick={continueClickHandler}>
                  Continue
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="cards-vfx">
        <div className="card-holder">
          <div className="card-front">
            <img
              src={bgCardFront}
              alt="Credit Card Front"
            />
            <div className="card-front__cc">
              <div className="card-info-vfx">
                <svg
                  width="84"
                  height="47"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse
                    cx="23.478"
                    cy="23.5"
                    rx="23.478"
                    ry="23.5"
                    fill="#fff"
                  />
                  <path
                    d="M83.5 23.5c0 5.565-4.507 10.075-10.065 10.075-5.559 0-10.065-4.51-10.065-10.075 0-5.565 4.506-10.075 10.065-10.075 5.558 0 10.065 4.51 10.065 10.075Z"
                    stroke="#fff"
                  />
                </svg>
                <div className="card-info-text">
                  <h2>{userInput.ccNum}</h2>
                  <div className="card-info-text-sub">
                    <p>{userInput.ccHolder}</p>
                    <p>{userInput.ccVal.month + "/" + userInput.ccVal.year}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-back">
            <img src={bgCardBack} alt="Credit Card Back" />
            <div className="card-back__cc">
              <p>{userInput.ccCVCNum}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
