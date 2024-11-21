import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
      aria-label="Toggle theme"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;