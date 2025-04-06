import React from "react";
import calmetteImage from "../../assets/ContactPage/hospital/public/calmette.jpg"; // Adjust the path
import khmerSovietImage from "../../assets/ContactPage/hospital/public/khmer_soviet.jpg";
import nationalPediatricImage from "../../assets/ContactPage/hospital/public/NationalPediatric.jpg";
import nmchcImage from "../../assets/ContactPage/hospital/public/NMCHC.jpg";
import preahKossamakImage from "../../assets/ContactPage/hospital/public/PreahKossamak.jpg";
import centralImage from "../../assets/ContactPage/hospital/private/central.jpg";
import khemaImage from "../../assets/ContactPage/hospital/private/khema.jpg";
import nagaClinic from "../../assets/ContactPage/hospital/private/NagaClinic.jpg";
import royalPhnomPenhImage from "../../assets/ContactPage/hospital/private/RoyalPhnomPenh.jpg";
import sunriseJapanImage from "../../assets/ContactPage/hospital/private/SunriseJapan.jpg";

// Hospital data
const hospitals = [
  {
    id: 1,
    image: calmetteImage,
    name: "Calmette Hospital - មន្ទីពេទ្យកាល់ម៉ែត",
    address: "លេខ ៣, ផ្លូវមុនីវង្ស, សង្កាត់ស្រាសជ័រ, ខណ្ឌដូនពេញ, ភ្នំពេញ",
    phone: "+855 23 426 948",
    fax: "+855 23 724 892",
    email: "hospital@calmette.gov.kh",
    website: "calmette.gov.kh",
    workingHours: {
      weekdays: "ច័ន្ទ-សុក្រ: 7:00 AM - 7:00 PM",
      saturday: "សៅរ៍: 7:00 AM - 12:00 PM",
    },
    director: "ព័ត៌មានមិនមានសាធារណៈ",
    type: "public",
  },
  {
    id: 2,
    image: khmerSovietImage,
    name: "Khmer-Soviet Friendship Hospital - មន្ទីពេទ្យមិត្តភាពខ្មែរ-សូវៀត",
    address: "ផ្លូវកែវមង្គលខេមរៈភូមិន្ទ (ផ្លូវ ២៧១), ភ្នំពេញ",
    phone: "+855 23 217 524 / 23 217 764",
    fax: "+855 23 217 384",
    email: "pnb.shihanouk@online.com.kh",
    website: "khmer-soviet.gov.kh",
    workingHours: {
      weekdays: "ច័ន្ទ-សុក្រ: 8:00 AM - 6:00 PM",
      saturday: "សៅរ៍: 8:00 AM - 1:00 PM",
    },
    director: "ព័ត៌មានមិនមានសាធារណៈ",
    type: "public",
  },
  {
    id: 3,
    image: nationalPediatricImage,
    name: "National Pediatric Hospital - មន្ទីពេទ្យកុមារជាតិ",
    address: "លេខ ១០០, ផ្លូវកូហ្វេឌេរ៉ាស្យូ ប្លូវ (ផ្លូវ ១១០), ភ្នំពេញ",
    phone: "+855 23 884 137",
    fax: "+855 23 881 003",
    email: "info@pediatrichospital.gov.kh",
    website: "pediatrichospital.gov.kh",
    workingHours: {
      weekdays: "ច័ន្ទ-សុក្រ: 7:00 AM - 7:00 PM",
      saturday: "សៅរ៍: 7:00 AM - 12:00 PM",
    },
    director: "ព័ត៌មានមិនមានសាធារណៈ",
    type: "public",
  },
  {
    id: 4,
    image: nmchcImage,
    name: "National Maternal and Child Health Center - មន្ទីពេទ្យជាតិសម្រាលកូន",
    address: "លេខ ៣១A, ផ្លូវឌីហ្វ្រង់ (ផ្លូវ ៤៧), ភ្នំពេញ",
    phone: "+855 23 724 257 / 23 724 073",
    fax: "+855 23 724 257",
    email: "adminnmchc@camnet.com.kh",
    website: "nmchc.gov.kh",
    workingHours: {
      weekdays: "ថ្ងៃច័ន្ទ ដល់ថ្ងៃសុក្រ, ៧:០០ AM -៥:០០ PM",
      saturday: "សៅរ៍: 8:00 AM - 1:00 PM",
    },
    director: "ព័ត៌មានមិនមានសាធារណៈ",
    type: "public",
  },
  {
    id: 5,
    image: preahKossamakImage,
    name: "Preah Kossamak Hospital - មន្ទីរពេទ្យមិត្តភាពកម្ពុជា-ចិន ព្រះកុសុមៈ",
    address: "លេខ ២៨CEo, ផ្លូវកែវមង្គលខេមរៈភូមិន្ទ (ផ្លូវ ២៧១), ភ្នំពេញ",
    phone: "+855 23 882 947 / 23 882 047",
    fax: "+855 12 345 679",
    email: "info@preahkossamak.gov.kh",
    website: "preahkossamak.gov.kh",
    workingHours: {
      weekdays: "ច័ន្ទ-សុក្រ: 8:00 AM - 6:00 PM",
      saturday: "សៅរ៍: 8:00 AM - 1:00 PM",
    },
    director: "ព័ត៌មានមិនមានសាធារណៈ",
    type: "public",
  },
  {
    id: 6,
    image: centralImage,
    name: "Central Hospital - មន្ទីពេទ្យសង្គម",
    address: "ផ្លូវផ្សេង, ភ្នំពេញ, កម្ពុជា",
    phone: "+855 12 345 678",
    fax: "+855 12 345 679",
    email: "info@centralhospital.gov.kh",
    website: "centralhospital.gov.kh",
    workingHours: {
      weekdays: "ច័ន្ទ-សុក្រ: 8:00 AM - 6:00 PM",
      saturday: "សៅរ៍: 8:00 AM - 1:00 PM",
    },
    director: "វេជ្ជបណ្ឌិត ម្នាក់ផ្សេង",
    type: "private",
  },
  {
    id: 7,
    image: khemaImage,
    name: "Khema Hospital - មន្ទីពេទ្យខេម៉ា",
    address: "ផ្លូវផ្សេង, ភ្នំពេញ, កម្ពុជា",
    phone: "+855 12 345 678",
    fax: "+855 12 345 679",
    email: "info@khemahospital.gov.kh",
    website: "khemahospital.gov.kh",
    workingHours: {
      weekdays: "ច័ន្ទ-សុក្រ: 8:00 AM - 6:00 PM",
      saturday: "សៅរ៍: 8:00 AM - 1:00 PM",
    },
    director: "វេជ្ជបណ្ឌិត ម្នាក់ផ្សេង",
    type: "private",
  },
  {
    id: 8,
    image: nagaClinic,
    name: "Naga Clinic - មន្ទីពេទ្យណាហ្គា",
    address: "ផ្លូវផ្សេង, ភ្នំពេញ, កម្ពុជា",
    phone: "+855 12 345 678",
    fax: "+855 12 345 679",
    email: "info@nagaclinic.gov.kh",
    website: "nagaclinic.gov.kh",
    workingHours: {
      weekdays: "ច័ន្ទ-សុក្រ: 8:00 AM - 6:00 PM",
      saturday: "សៅរ៍: 8:00 AM - 1:00 PM",
    },
    director: "វេជ្ជបណ្ឌិត ម្នាក់ផ្សេង",
    type: "private",
  },
  {
    id: 9,
    image: royalPhnomPenhImage,
    name: "Royal Phnom Penh Hospital - មន្ទីពេទ្យរាជធានីភ្នំពេញ",
    address: "ផ្លូវផ្សេង, ភ្នំពេញ, កម្ពុជា",
    phone: "+855 12 345 678",
    fax: "+855 12 345 679",
    email: "info@royalphnompenh.gov.kh",
    website: "royalphnompenh.gov.kh",
    workingHours: {
      weekdays: "ច័ន្ទ-សុក្រ: 8:00 AM - 6:00 PM",
      saturday: "សៅរ៍: 8:00 AM - 1:00 PM",
    },
    director: "វេជ្ជបណ្ឌិត ម្នាក់ផ្សេង",
    type: "private",
  },
  {
    id: 10,
    image: sunriseJapanImage,
    name: "Sunrise Japan Hospital - មន្ទីពេទ្យព្រះអាទិត្យជប៉ុន",
    address: "ផ្លូវផ្សេង, ភ្នំពេញ, កម្ពុជា",
    phone: "+855 12 345 678",
    fax: "+855 12 345 679",
    email: "info@sunrisejapan.gov.kh",
    website: "sunrisejapan.gov.kh",
    workingHours: {
      weekdays: "ច័ន្ទ-សុក្រ: 8:00 AM - 6:00 PM",
      saturday: "សៅរ៍: 8:00 AM - 1:00 PM",
    },
    director: "វេជ្ជបណ្ឌិត ម្នាក់ផ្សេង",
    type: "private",
  },
];

// HospitalCard component
const HospitalCard = ({ hospital, imagePosition = "left" }) => {
  const {
    image,
    name,
    address,
    phone,
    fax,
    email,
    website,
    workingHours,
    director,
  } = hospital;

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md mb-6 hover:shadow-lg transition-shadow duration-300 animate-fade-in">
      <div
        className={`flex flex-col md:flex-row gap-4 md:gap-6 ${
          imagePosition === "right" ? "md:flex-row-reverse" : ""
        }`}
      >
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-48 md:h-60 cursor-pointer">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Details Section */}
        <div className="w-full md:w-2/3 space-y-1 md:space-y-2">
          <h1 className="font-bold text-xl md:text-2xl text-center text-pink-500">
            {name}
          </h1>

          {/* Address */}
          <div className="flex flex-col md:flex-row">
            <p className="font-bold md:mr-2">អាស័យដ្ឋាន:</p>
            <p className="text-gray-600 font-regular">{address}</p>
          </div>

          {/* Phone */}
          <div className="flex flex-col md:flex-row">
            <p className="font-bold md:mr-2">ទូរស័ព្ទ:</p>
            <p className="text-gray-600">{phone}</p>
          </div>

          {/* Fax */}
          <div className="flex flex-col md:flex-row">
            <p className="font-bold md:mr-2">ទូរសារ:</p>
            <p className="text-gray-600">{fax}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col md:flex-row">
            <p className="font-bold md:mr-2">អ៊ីមែល:</p>
            <p className="text-gray-600">{email}</p>
          </div>

          {/* Website */}
          <div className="flex flex-col md:flex-row">
            <p className="font-bold md:mr-2">គេហទំព័រ:</p>
            <span className="text-gray-600">
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {website}
              </a>
            </span>
          </div>

          {/* Working Hours */}
          <div className="flex flex-col md:flex-row">
            <p className="font-bold md:mr-2">ម៉ោងធ្វើការ:</p>
            <p className="font-regular text-gray-600 mr-1">{workingHours.weekdays}  -</p>
            <p className="font-regular text-gray-600">{workingHours.saturday}</p>
          </div>

          {/* Director */}
          <div className="flex flex-col md:flex-row">
            <p className="font-bold md:mr-2">ប្រធានមន្ទីពេទ្យ:</p>
            <span className="text-gray-600 font-regular">{director}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// HospitalList component to render all hospitals
const HospitalList = () => {
  // Filter hospitals by type
  const publicHospitals = hospitals.filter((hospital) => hospital.type === "public");
  const privateHospitals = hospitals.filter((hospital) => hospital.type === "private");

  return (
    <div className="p-3 md:p-6 bg-gray-100">
      {/* Main Heading */}
      <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10 text-center text-blue-500 mt-4 md:mt-8">
        ទាក់ទងទៅកាន់មន្ទីពេទ្យ
      </h2>

      {/* Public Hospitals */}
      <div className="mx-4 md:mx-10">
        <h2 className="font-bold text-xl md:text-2xl text-blue-500 mb-4 md:mb-6 relative inline-block w-full">
          មន្ទីពេទ្យសាធារណៈ
          <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-300 transform translate-y-2"></span>
        </h2>
        <div className="space-y-4 md:space-y-6">
          {publicHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} imagePosition="left" />
          ))}
        </div>
      </div>

      {/* Private Hospitals */}
      <div className="mt-8 md:mt-12 mx-4 md:mx-10">
        <h2 className="font-bold text-xl md:text-2xl text-blue-500 mb-4 md:mb-6 relative inline-block text-right w-full">
          មន្ទីពេទ្យឯកជន
          <span className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-r from-blue-300 to-blue-500 transform translate-y-2"></span>
        </h2>
        <div className="space-y-4 md:space-y-6">
          {privateHospitals.map((hospital) => (
            <HospitalCard key={hospital.id} hospital={hospital} imagePosition="right" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalList;