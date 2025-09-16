import React from "react";

interface LivenessCheckProps {
  onStart: () => void;
}

const LivenessCheck: React.FC<LivenessCheckProps> = ({ onStart }) => {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-2">Liveness Check</h2>
        <p className="text-center text-gray-600">
          Follow the instructions to confirm you're a real person.
        </p>
      </div>
      <div className="flex flex-col items-center mb-6">
        <div className="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center relative mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="180" height="240" viewBox="0 0 180 240">
              <ellipse cx="90" cy="120" rx="80" ry="110" stroke="#888" strokeDasharray="6 6" fill="none" />
            </svg>
            <span className="absolute text-6xl text-gray-400">
              <span role="img" aria-label="face">😊</span>
            </span>
          </div>
          <div className="absolute bottom-4 left-0 w-full text-center text-white bg-black bg-opacity-60 py-2 rounded-b-lg">
            Center your face in the oval
          </div>
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          onClick={onStart}
        >
          <span role="img" aria-label="camera">📷</span> Start Check
        </button>
      </div>
    </div>
  );
};

export default LivenessCheck;
