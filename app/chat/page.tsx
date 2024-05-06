"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "@/public/logo.png";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button, Card } from "@material-tailwind/react";
import axios from "axios";
import { IoSend } from "react-icons/io5";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import { useRecoilState } from "recoil";
import conversationState from "@/store";

type MessageItem = {
  question: string;
  options: any;
  response: string;
};

const Page: React.FC = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [conversation, setConversation] = useRecoilState(conversationState);

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      question: "",
      options: "",
      response: "",
    },
  ]);
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>(["", ""]);

  useEffect(() => {
    if (sessionStatus === "loading") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [sessionStatus]);

  useEffect(() => {
    const fetchConversationData = async () => {
      try {
        const response = await fetch(`/api/conversation/${conversation}`);
        const data = (await response.json()) as MessageItem[];

        console.log("API response data:", data);

        const messagesData: MessageItem[] = data.map((item) => ({
          question: item.question,
          options: item.options,
          response: item.response,
        }));

        setMessages(messagesData);
      } catch (error) {
        console.error("Failed to fetch conversation data:", error);
      }
    };

    if (conversation) {
      fetchConversationData();
    }
  }, [conversation]);

  const resetForm = () => {
    setQuestion("");
    setOptions(["", ""]);
  };

  const handleSendClick = async () => {
    try {
      setMessages((prevMessages) => [
        ...prevMessages,
        { question: question, options: options, response: "" },
      ]);

      const questionId = `question-${Date.now().toString()}`;
      const initState: { [key: string]: any } = {};
      const requestData = {
        conversationId: conversation,
        id: questionId,
        context: "", // Adjust based on your application's needs
        context_v2: "", // Adjust based on your application's needs
        prompt: question,
        options: options.reduce((acc, option, index) => {
          acc[String.fromCharCode(65 + index)] = option;
          return acc;
        }, initState),
      };
      console.log(JSON.stringify(requestData));

      const response = await axios.post("/api/chat-proxy/", requestData);
      const responseData = response.data;

      setMessages((prevMessages) => {
        // Clone the previous messages array
        const updatedMessages = [...prevMessages];
        // Check if the last message has an empty response, typically it should be the one we've just added
        const lastMessageIndex = updatedMessages.length - 1;
        if (
          lastMessageIndex >= 0 &&
          updatedMessages[lastMessageIndex].response === ""
        ) {
          // Update only the response for the last message
          updatedMessages[lastMessageIndex].response = responseData.answer;
        }
        return updatedMessages; // Return the modified array
      });

      toast.success("Question sent successfully!");
      resetForm();
      router.refresh();
    } catch (error) {
      toast.error("Failed to send question. Please try again later.");
      console.error("Error sending question:", error);
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = [...options];
      newOptions.splice(index, 1);
      setOptions(newOptions);
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!session) {
      router.push("/");
    }
  }, [loading, session, router]);

  if (loading || conversation == "")
    return (
      <div className="mx-auto my-auto">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  return (
    <div className="h-full my-2 w-full xl:max-w-3xl mx-auto p-2">
      <Card
        placeholder="d"
        onPointerEnterCapture={() => console.log("pointer")}
        onPointerLeaveCapture={() => console.log("pointer")}
        className="shadow-blue-gray-900/5 h-[60vh] bg-base-200"
      >
        <ScrollArea className="p-4 border-solid">
          {messages &&
            messages.slice(0, 10).map((item, index:any) => (
              <React.Fragment key={index}>
                <div className="chat chat-end">
                  <div className="chat-bubble">{item.question}</div>
                  {item.options &&
                    typeof item.options === "object" &&
                    Object.keys(item.options).map((key, idx) => (
                      <div key={idx} className="chat-bubble mt-1">
                        {`${String.fromCharCode(65 + idx)}: ${
                          item.options[key]
                        }`}
                      </div>
                    ))}
                </div>
                <div className="chat chat-start ">
                  <div className="chat-image avatar">
                    <div className="w-17 rounded-full">
                      <Image
                        alt="Chat bot icon"
                        src={Logo}
                        width={45}
                        height={45}
                        className="rounded-full bg-white border-solid"
                      />
                    </div>
                  </div>
                  <div className="chat-bubble">
                    {item.response ? (
                      item.response
                    ) : (
                      <span className="loading loading-dots loading-sm"></span>
                    )}
                  </div>
                </div>
              </React.Fragment>
            ))}
        </ScrollArea>
      </Card>

      <div className="w-[100%]">
        <div className="w-[100%] pt-3">
          <div className="flex flex-row gap-1">
            <input
              type="text"
              placeholder="Enter your question here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="input input-bordered w-full mb-2 border-2 border-gray-400 rounded-lg"
            />
            <button
              className="btn btn-info rounded-lg text-white"
              onClick={handleSendClick}
            >
              <IoSend className="h-5 w-5" />
            </button>
          </div>

          {options.map((option, index) => (
            <div key={index} className="flex flex-row gap-1 ">
              <input
                type="text"
                placeholder={`Enter Option ${String.fromCharCode(
                  65 + index
                )} here !`}
                value={option}
                onChange={(e) => updateOption(index, e.target.value)}
                className="input min-w-6 mt-1 input-bordered w-full mb-1 my-2 rounded-lg"
              />
              <button
                className="btn btn-error rounded-lg mb-1 my-1"
                onClick={() => removeOption(index)}
              >
                <MdOutlineDelete className="h-5 w-5 text-white" />
              </button>
            </div>
          ))}
          <div className="flex flex-row justify-between gap-1">
            <Button
              placeholder="d"
              onPointerEnterCapture={() => console.log("pointer")}
              onPointerLeaveCapture={() => console.log("pointer")}
              color="green"
              className="w-full"
              onClick={addOption}
              disabled={options.length === 5}
            >
              Add Option
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
