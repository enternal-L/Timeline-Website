const Switch = ({ onClick }) => {
    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 outline-none translate-y-7 hover:translate-y-0 transition-transform duration-300 ease-in group">
            <button 
                onClick={onClick}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-t-lg transition-colors flex flex-col items-center shadow-lg border-none"
            >
                <span className="text-2xl">^</span>
                <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75 whitespace-nowrap">Switch to Editing Mode</span>
            </button>
        </div>
    )
}

export default Switch