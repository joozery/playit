export default function CardPackage({ selected, onSelect }) {
    const packages = [
      { id: "1", label: "1 ชั่วโมง", value: 1 },
      { id: "5", label: "5 ชั่วโมง", value: 5 },
      { id: "10", label: "10 ชั่วโมง", value: 10 },
      { id: "20", label: "20 ชั่วโมง", value: 20 },
    ];
  
    return (
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 mb-6">
        <h2 className="text-lg font-bold text-blue-700 mb-4 text-center">
          เลือกแพ็กเกจ
        </h2>
  
        <div className="flex flex-wrap justify-center gap-4">
          {packages.map((pkg) => {
            const isActive = selected === pkg.value;
            return (
              <button
                key={pkg.id}
                onClick={() => onSelect(pkg.value)}
                className={`min-w-[120px] text-center py-3 px-5 rounded-lg font-semibold border transition-all duration-200
                  ${
                    isActive
                      ? "bg-blue-100 text-blue-700 border-blue-500"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {pkg.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
  