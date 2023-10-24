import React, { useState, useEffect } from "react";

function Pagination({ pages, setCurrentPage, currentPage }) {
  const [currentButton, setCurrentButton] = useState(1);
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);
  const numberOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numberOfPages.push(i);
  }

  useEffect(() => {
    let tempNumberOfPages = [...arrOfCurrButtons];
    let dotsInitial = "...";
    let dotsLeft = "... ";
    let dotsRight = " ...";

    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages;
    } else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length];
    } else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5);
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length];
    } else if (currentButton > 4 && currentButton < numberOfPages.length - 2) {
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton);
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1);
      tempNumberOfPages = [1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length];
    } else if (currentButton > numberOfPages.length - 3) {
      const sliced = numberOfPages.slice(numberOfPages.length - 4);
      tempNumberOfPages = [1, dotsLeft, ...sliced];
    } else if (currentButton === dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
    } else if (currentButton === dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2);
    } else if (currentButton === dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2);
    }

    setArrOfCurrButtons(tempNumberOfPages);
    setCurrentButton(currentPage);
    setCurrentPage(currentPage);
  }, [currentButton, pages]);

  useEffect(() => {
    setCurrentButton(currentPage);
  }, [currentPage]);

  const handleNext = () => {
    setCurrentButton((prev) => prev + 1);
    setCurrentPage(currentButton + 1);
  };
  const handlePrev = () => {
    setCurrentButton((prev) => prev - 1);
    setCurrentPage(currentButton - 1);
  };

  const handlePage = (item) => {
    setCurrentPage(item);
    setCurrentButton(item);
  };
  return (
    <div className="pagination-container">
      {currentPage > 1 && (
        <a className="text-white" onClick={handlePrev}>
          Prev
        </a>
      )}
      {arrOfCurrButtons.map((item, index) => {
        return (
          <a key={index} className={`${currentButton === item ? "active" : ""}`} onClick={() => handlePage(item)}>
            {item}
          </a>
        );
      })}
      {currentPage < pages && (
        <a className="text-white" onClick={handleNext}>
          Next
        </a>
      )}
    </div>
  );
}

export default Pagination;
