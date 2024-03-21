import React, { useEffect, useMemo, useState } from "react";
// import { io } from "socket.io-client";

function Bot() {
  // const [initialQues, setInitialQues] = useState([]);
  // const [accountRelatedProb, setAccountRelatedProb] = useState({});

  // const socket = useMemo(() => io("http://localhost:8000/"), []);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log("socket connected");

  //     socket.on("initial-questions", (questions) => {
  //       console.log(questions);
  //       setInitialQues(questions);
  //     });

  //     socket.on("account-related", (accountProblems) => {
  //       console.log(accountProblems);
  //       setAccountRelatedProb(accountProblems);
  //     });
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // const handleQuestionClick = (question) => {
  //   socket.emit("question-clicked", question);
  // };

  return (
    <div className="d-flex flex-column gap-4   h-100 w-100 ">
      <div className="py-1 bg-primary rounded-top-lg">
        <h2 className="text-white p-1 text-center" style={{fontSize:'20px'}}>BOT</h2>
      </div>
      <div className="p-1 text-center d-flex flex-column gap-4">
        <p>How can I help you?</p>
        {/* <div className="d-flex flex-column gap-2">
          {initialQues.map((question, index) => (
            <div
              key={index}
              className="text-sm text-primary border border-primary rounded-lg cursor-pointer p-1"
              onClick={() => handleQuestionClick(question)}
            >
              {question}
            </div>
          ))}
        </div> */}
        {/* {accountRelatedProb.query && (
          <div className="d-flex flex-column gap-2 text-primary">
            <p className="font-weight-bold underline">{accountRelatedProb.query}?</p>
            <ul className="d-flex flex-column p-1 gap-2">
              {accountRelatedProb.issue.map((item, index) => (
                <li key={index} className="text-sm border border-primary p-1 rounded-lg">{item}</li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Bot;
