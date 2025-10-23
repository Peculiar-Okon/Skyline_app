import react from "react";
import '../styles/index.css';

// function citycard ({ city, image, description }){
//     return (
//             <div className="rounded-xl overflow-hidden shadow-lg border-2 border-[#C0C0C0] bg-white dark:bg-slate-800 hover:scale-105 transition duration-300 cursor-pointer w-64">
//       <img src={image} alt={city} className="h-40 w-full object-cover" />
//       <div className="p-4">
//         <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{city}</h3>
//         <p className="text-sm text-slate-500 dark:text-slate-300">{description}</p>
//       </div>
//     </div>
//     )
// }

// export default citycard;

function CityCard({ city, image, description }) {
  return (
    <div className="p-[2px] rounded-2xl bg-gradient-to-r from-emerald-200 via-gray-100 to-gray-300 shadow-lg hover:scale-105 transition duration-300 w-64 shadow-xl">
      <div className="bg-white rounded-xl overflow-hidden">
        <img src={image} alt={city} className="h-40 w-full object-cover rounded-t-xl" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-800 ">{city}</h3>
          <p className="text-sm text-slate-700 ">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default CityCard;

