'use client'

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from "@material-tailwind/react";
import { IoSend } from "react-icons/io5";

const Input: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const resetForm = () => {
    setQuestion('');
    setOptions(['', '']);
  };

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
      toast.promise(
        axios.post('/api/ask', questionPayload),
        {
          loading: 'Sending question...',
          success: (res) => {
            console.log('LLM response:', res.data);
            resetForm();
            return <b>Question answered successfully!</b>;
          },
          error: (err) => {
            console.error('Error sending question:', err);
            return <b>Error sending question.</b>;
          }
        }
      );

    } catch (error) {
      console.error('Error sending question:', error)
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, '']);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  return (
    <div className="w-[100%]">
      <div className="w-[100%] pt-3">
        <div className='flex flex-row gap-1'>
          <input
            type="text"
            placeholder="Enter your question here"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="input input-bordered w-full mb-2 border-2 border-gray-400 rounded-lg"
          />
          <button className="btn btn-info rounded-lg text-white" onClick={handleSendClick}>
          <IoSend className='h-5 w-5'/>
        </button>
        </div>
        
        {options.map((option, index) => (
          <div key={index}>
            
            <input
              type="text"
              placeholder={`Enter Option ${String.fromCharCode(65 + index)} here !`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
              className="input input-bordered w-full mb-1 my-1 rounded-lg"
            />
            
          </div>
        ))}
        <div className="flex flex-row justify-between gap-1">
          <Button color='green' className='w-full' onClick={addOption} disabled={options.length === 5}>Add Option</Button>
          {options.length > 2 && (
                <Button color='red' className='w-full' onClick={() => removeOption(options.length)}>Remove Option</Button>
              )}
        </div>
        
      </div>
      
    </div>
  );
};

export default Input;
