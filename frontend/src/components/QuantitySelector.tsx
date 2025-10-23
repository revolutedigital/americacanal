'use client';

interface QuantitySelectorProps {
  quantity: number;
  max: number;
  onChange: (qty: number) => void;
}

export default function QuantitySelector({ quantity, max, onChange }: QuantitySelectorProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    if (value >= 1 && value <= max) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-3">
      <label className="text-sm font-medium text-gray-700">Quantidade:</label>
      <div className="flex items-center border border-gray-300 rounded-lg">
        <button
          type="button"
          onClick={handleDecrease}
          disabled={quantity <= 1}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          −
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min="1"
          max={max}
          className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
        />
        <button
          type="button"
          onClick={handleIncrease}
          disabled={quantity >= max}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          +
        </button>
      </div>
      {max < 10 && (
        <span className="text-sm text-gray-500">
          (Máx: {max} {max === 1 ? 'unidade' : 'unidades'})
        </span>
      )}
    </div>
  );
}
