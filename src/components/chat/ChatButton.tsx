import React from 'react';
import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  ownerName: string;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick, ownerName }) => {
  return (
    <button
      onClick={onClick}
      className="btn btn-outline flex items-center"
    >
      <MessageCircle size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
      Contact {ownerName.split(' ')[0]}
    </button>
  );
};

export default ChatButton;