import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedTypes: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypesFilter = ({ selectedTypes, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Types</h4>
      {hotelTypes.map((type: string) => (
        <label key={type} className="flex items-center space-x-2">
          <input
            type="checkbox"
            onChange={onChange}
            value={type}
            checked={selectedTypes.includes(type)}
            className="rounded"
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypesFilter;
