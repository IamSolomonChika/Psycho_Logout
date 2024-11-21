import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState({ title: '', subtitle: '' });
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [clickCount, setClickCount] = useState(0);
  const [runCount, setRunCount] = useState(0);

  const messages = {
    initial: {
      title: `Welcome, ${user.name}! 👋`,
      subtitle: "You've successfully logged in to your account."
    },
    steps: [
      {
        title: "Wait!! Why do you want to leave? 😕",
        subtitle: "Please don't go!",
        buttonText: "Yo! Wait"
      },
      {
        title: "Are you sure? Really sure? 😢",
        subtitle: "Just one more click if you really want to leave... Please Stay!",
        buttonText: "Final Warning!"
      },
      {
        title: "So you really hate me this much? 😭",
        subtitle: "Please don't give up on me!",
        buttonText: "So, You Clicked It!"
      },
      {
        title: "Fine, Go Ahead! 🤬",
        subtitle: "Nobody Wants you here anyway!",
        buttonText: "Close The Door Behind You!"
      }
    ]
  };

  useEffect(() => {
    setMessage({
      title: `Welcome, ${user.name}! 👋`,
      subtitle: "You've successfully logged in to your account."
    });
  }, [user.name]);

  const getRandomPosition = () => {
    const textAreaHeight = 300; // Approximate height of text area
    const textAreaTop = window.innerHeight * 0.3; // Approximate top position of text area
    const buttonWidth = 100;
    const buttonHeight = 40;
    
    let newX = Math.random() * (window.innerWidth - buttonWidth);
    let newY = Math.random() * (window.innerHeight - buttonHeight);
    
    // Avoid text area
    while (newY > textAreaTop && newY < textAreaTop + textAreaHeight) {
      newY = Math.random() * (window.innerHeight - buttonHeight);
    }
    
    return { x: newX, y: newY };
  };

  const handleLogoutHover = () => {
    if (isRunning && runCount < 1) {
      setRunCount(prev => prev + 1);
      setButtonPosition(getRandomPosition());
    }
  };

  const handleLogout = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    if (newCount === 5) {
      actualLogout();
      setClickCount(0);
      setRunCount(0);
      return;
    }

    if (newCount === 1) {
      setIsRunning(true);
    }

    if (runCount === newCount - 1) {
      setButtonPosition(getRandomPosition());
      setRunCount(newCount);
    }

    setMessage({
      title: messages.steps[newCount - 1]?.title || messages.initial.title,
      subtitle: messages.steps[newCount - 1]?.subtitle || messages.initial.subtitle
    });
  };

  const actualLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end pt-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <div className="text-center py-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            {message.title}
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">
            {message.subtitle}
          </p>
          {!isRunning && (
            <button
              onClick={handleLogout}
              className="mt-8 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
              Logout
            </button>
          )}
        </div>

        {isRunning && (
          <button
            onClick={handleLogout}
            onMouseEnter={handleLogoutHover}
            style={{
              position: 'fixed',
              left: buttonPosition.x,
              top: buttonPosition.y,
              transition: 'all 0.2s ease-out',
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {clickCount === 0 ? "Logout" : messages.steps[clickCount - 1]?.buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardPage; 