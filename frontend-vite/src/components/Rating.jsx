import React from "react";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";
import PropTypes from "prop-types";

const Rating = ({ value, text = "", color }) => {
  return (
    <div className="rating">
      <span style={{ color }}>
        {value < 0.5 ? (
          <FaRegStar />
        ) : value < 1 ? (
          <FaStarHalfAlt />
        ) : (
          <FaStar />
        )}
      </span>
      <span style={{ color }}>
        {value < 1.5 ? (
          <FaRegStar />
        ) : value < 2 ? (
          <FaStarHalfAlt />
        ) : (
          <FaStar />
        )}
      </span>
      <span style={{ color }}>
        {value < 2.5 ? (
          <FaRegStar />
        ) : value < 3 ? (
          <FaStarHalfAlt />
        ) : (
          <FaStar />
        )}
      </span>
      <span style={{ color }}>
        {value < 3.5 ? (
          <FaRegStar />
        ) : value < 4 ? (
          <FaStarHalfAlt />
        ) : (
          <FaStar />
        )}
      </span>
      <span style={{ color }}>
        {value < 4.5 ? (
          <FaRegStar />
        ) : value < 5 ? (
          <FaStarHalfAlt />
        ) : (
          <FaStar />
        )}
      </span>
      <span style={{ color }}>{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#FBDB3A",
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};

export default Rating;
