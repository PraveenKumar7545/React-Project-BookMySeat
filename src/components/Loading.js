// src/components/Loading.js

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600">Loading movies...</p>
    </div>
  );
}

export default Loading;