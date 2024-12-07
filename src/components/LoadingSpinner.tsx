const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-white border-r-white/50 border-b-white/20 border-l-white/10 rounded-full animate-spin"></div>
        <div className="absolute inset-0 border-4 border-t-transparent border-r-white/50 border-b-white/20 border-l-white/10 rounded-full animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;