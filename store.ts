import { atom } from "recoil";

const conversationState = atom({
    key: 'conversationState', // unique ID (with respect to other atoms/selectors)
    default: '1', // default value (aka initial value)
  });

export default conversationState