import React from 'react';

const languages = [
  { id: 'javascript', name: 'JavaScript', mode: 'javascript' },
  { id: 'python', name: 'Python', mode: 'python' },
  { id: 'cpp', name: 'C++', mode: 'text/x-c++src' },
  { id: 'java', name: 'Java', mode: 'text/x-java' },
];

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onLanguageChange(e.target.value)}
      className="bg-card text-foreground border border-border rounded-md px-3 w-[120px] py-1 focus:outline-none focus:ring-2 focus:ring-ring"
    >
      {languages.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector; 