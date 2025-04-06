import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import Card1 from "../../assets/AboutPage/Card1s.jpg"; // Adjust path if needed
import Card2 from "../../assets/AboutPage/Card2.jpg";
import Card3 from "../../assets/AboutPage/Card3.jpg";
import Card4 from "../../assets/AboutPage/Card4.jpg";
const Card = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-18">
      
      {/* Section Title & Description */}
      <div className="text-center max-w-4xl mb-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">ស្វែងយល់អំពីពួកយើង</h1>
        <p className="text-gray-600 text-base sm:text-lg font-regular">
          ពួកយើងជាក្រុមនិស្សិតចំនួន 6 នាក់មកពី បណ្ឌិត្យសភាបច្ចេកវិទ្យាឌីជីថលកម្ពុជា (CADT) 
          ឯកទេសផ្នែកវិទ្យាសាស្ត្រកុំព្យូទ័រ។ ក្រុមរបស់យើងមានសមាជិកបីនាក់មកពីផ្នែកវិស្វកម្មសូហ្វវែរ 
          និងបីនាក់មកពីវិទ្យាសាស្ត្រទិន្នន័យ ដែលធ្វើការរួមគ្នាដើម្បីបង្កើតគេហទំព័រ និងគាំទ្រសម្រាប់ស្ត្រីមានផ្ទៃពោះ។
          ជាមួយនឹងជំនាញក្នុងការអភិវឌ្ឍន៍គេហទំព័រ បញ្ញាសិប្បនិមិត្ត និងការវិភាគទិន្នន័យ យើងប្តេជ្ញាបង្កើតគេហទំព័រដែលអាចទុកចិត្តបាន 
          និងងាយស្រួលប្រើ ដែលផ្តល់ព័ត៌មានសំខាន់ៗ ជំនួយដែលដំណើរការដោយ AI និងសហគមន៍ដ៏រឹងមាំសម្រាប់ម្តាយដែលរំពឹងទុក។
          បេសកកម្មរបស់យើងគឺប្រើប្រាស់បច្ចេកវិទ្យាដើម្បីបង្កើនសុខភាពមាតា ដោយធានាថាស្ត្រីគ្រប់រូបអាចទទួលបានធនធានដែលនាងត្រូវការអំឡុងពេលមានផ្ទៃពោះ។
        </p>
      </div>

      {/* Card Container (Grid Layout) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">

        {/* Card 1 */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.7 }}
          className="bg-white shadow-lg rounded-xl overflow-hidden w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <img src={Card2} alt="Mission" className="w-full h-56 object-cover" />
          <div className="p-6 text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-3">បេសកម្ម</h2>
            <p className="text-gray-600 text-sm font-regular">
              ផ្តល់ជូននូវចំណេះដឹងសុខភាពផ្ទាល់ខ្លួន, ការជួយផ្តល់ព័ត៌មាន
              ដោយ AI ជាភាសាខ្មែរ, និងបង្កើតសហគមន៍គាំទ្រដែលអាច ជួយផ្តល់កម្លាំងចិត្ត 
              ដើម្បីជួយស្រ្តីកម្ពុជាធ្វើដំណើរនៅពេលមានផ្ទៃពោះយ៉ាងមានភាពសុវត្ថិភាព និងមានការយល់ដឹង។
            </p>
          </div>
        </motion.div>

        {/* Card 2 */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.7 }}
          className="bg-white shadow-lg rounded-xl overflow-hidden w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <img src={Card3} alt="Vision" className="w-full h-56 object-cover" />
          <div className="p-6 text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-3">ទស្សនៈវិស័យ</h2>
            <p className="text-gray-600 text-sm font-regular">
              បង្កើតជាវេទិកាដ៏គាំទ្រដល់សុខភាពរបស់ស្រ្តីកម្ពុជា ពេលមានផ្ទៃពោះ 
              ដើម្បីឱ្យពួកគេមានភាពទំនុកចិត្ត និងការយល់ដឹងអំពីសុខភាពផ្ទាល់ខ្លួន។
            </p>
          </div>
        </motion.div>

        {/* Card 3 */}
        <motion.div
          variants={fadeIn("up", 0.3)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.7 }}
          className="bg-white shadow-lg rounded-xl overflow-hidden w-full transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          <img src={Card4} alt="Values" className="w-full h-56 object-cover" />
          <div className="p-6 text-center">
            <h2 className="text-lg font-bold text-gray-800 mb-3">តម្លៃ</h2>
            <p className="text-gray-600 text-sm font-regular">
              គោលបំណងនៃគេហទំព័ររបស់យើងគឺផ្តល់ការគាំទ្រ និងការណែនាំដ៏ទូលំទូលាយដល់ស្ត្រីមានផ្ទៃពោះ 
              ពេញមួយការធ្វើដំណើររបស់ពួកគេ។ យើងផ្តល់ការអប់រំ, ដំបូន្មានអ្នកជំនាញ, 
              និងសហគមន៍គាំទ្រដើម្បីធានាថាស្ត្រីគ្រប់រូបអាចទទួលបានព័ត៌មានដែលអាចជឿទុកចិត្តបាន។
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Card;
