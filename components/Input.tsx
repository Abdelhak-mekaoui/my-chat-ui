'use client'

import React, { useState } from 'react';
import axios from 'axios'; 

const Input: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '', '', '', '']);

  const handleSendClick = async () => {
    if (question.trim() === '' || options.some(option => option.trim() === '')) {
      console.error('Please fill in the question and all options.');
      return;
    }

    const formattedOptions = options.reduce((acc, option, index) => {
      const letter = String.fromCharCode(65 + index);
      return { ...acc, [letter]: option };
    }, {});

    const questionPayload = {
      id: "question-123", 
      context: "",
      context_v2: "",
      prompt: question,
      options: formattedOptions,
    };

    try {
      const response = await axios.post('/api/ask', questionPayload);
      console.log('LLM response:', response.data);
      
    } catch (error) {
      console.error('Error sending question:', error)
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  return (
    <div className="py-4">
      <div className="mb-4">
        <div className="label">
            <span className="label-text">Ask me</span>
            <span className="label-text-alt">Top Right label</span>
        </div>
        <input
          type="text"
          placeholder="Enter your question here"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="input input-bordered w-full mb-2 rounded-lg"
        />
        {options.map((option, index) => (
        <>
        <div className="label">
            <span className="label-text">{`Option ${String.fromCharCode(65 + index)}`}</span>
            <span className="label-text-alt">Top Right label</span>
        </div>
          <input
            key={index}
            type="text"
            placeholder={`Enter Option ${String.fromCharCode(65 + index) } here !`}
            value={option}
            onChange={(e) => updateOption(index, e.target.value)}
            className="input input-bordered w-full mb-1 my-1 rounded-lg"
          />
          </>
        ))}
      </div>
      <button className="btn btn-info rounded-lg" onClick={handleSendClick}>
        Send
      </button>
    </div>
  );
};

export default Input;
