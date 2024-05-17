"use client"
import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    message: "This is amazing! 👏 literally found my dream cafe",
    author: "Esther Z.",
    image: "./images/t1.jpg",
    time: "2 days ago"
  },
  {
    message: "Was playing around with this, saved me a few hours of searching.",
    author: "Marcel H.",
    image: "./images/t2.jpeg",
    time: "7 days ago"
  }
];

const Popup = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false); // Start with the popup not visible

  useEffect(() => {
    const delay = setTimeout(() => {
      setVisible(true); // Make the popup visible after 5 seconds
    }, 5000);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
        setVisible(true);
      }, 1000); // fade out duration
    }, 6000); // total duration including visible and transition time

    return () => {
      clearInterval(interval);
      clearTimeout(delay);
    };
  }, []);

  const { message, author, image, time } = testimonials[index];

  return (
    <>
      <style>
        {`
          .social-proof-container {
            position: fixed;
            bottom: 50px;
            right: 30px;
            z-index: 1000;
            width: 350px;
            background-color: #EBEBEB;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            padding: 15px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: opacity 1s;
            opacity: 1;
            border: 1px solid #C1C1C1;
          }

          @media (max-width: 768px) {
            .social-proof-container {
              right: 50%; /* Center horizontally */
              transform: translateX(50%); /* Adjust for the width of the container */
            }
          }

          .fade-in {
            opacity: 1;
          }

          .fade-out {
            opacity: 0;
          }

          .profile-pic {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }

          .social-proof-text {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            margin-bottom: 0; /* Ensure no additional bottom margin */
          }

          .social-proof {
            display: flex;
            align-items: center;
            width: 100%;
          }

          .author-time {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 0px; /* Set bottom margin to 0 */
          }

          .author {
            font-weight: bold;
            margin-bottom: 0px; /* Ensure no bottom margin on author */
          }

          .time {
            color: gray;
          }
        `}
      </style>
      <div className={`social-proof-container ${visible ? 'fade-in' : 'fade-out'}`}>
        <div className="social-proof">
          <img src={image} alt="Profile" className="profile-pic" />
          <div className="social-proof-text">
            <div className="author-time">
              <p className="author">{author}</p>
              <span className="time">{time}</span>
            </div>
            <p> "{message}"</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
