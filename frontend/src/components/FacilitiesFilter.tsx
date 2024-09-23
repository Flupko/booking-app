import { hotelFacilities } from "../config/hotel-options-config";

type Props = {
  selectedFacilities: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FacilitiesFilter = ({ selectedFacilities, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Facilities</h4>
      {hotelFacilities.map((facility: string) => (
        <label key={facility} className="flex items-center space-x-2">
          <input
            type="checkbox"
            onChange={onChange}
            value={facility}
            checked={selectedFacilities.includes(facility)}
            className="rounded"
          />
          <span>{facility}</span>
        </label>
      ))}
    </div>
  );
};

export default FacilitiesFilter;
