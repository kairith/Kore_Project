import React from "react";
import { FaFacebookF, FaInstagram, FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-blue-500 text-white py-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                {/* Column 1 */}
                <div>
                    <h4 className="font-bold mb-4">ស្វែងរក</h4>
                    <ul className="space-y-2 font-regular">
                        <li>អត្ថបទអប់រំ</li>
                        <li>មគ្គុទេសក៍អំពីការមានផ្ទៃពោះ</li>
                        <li>គន្លឹះអំពីការចិញ្ចឹមកូន</li>
                        <li>សុខភាព និង សុភមង្គល</li>
                        <li>អាហារូបត្ថម្ភ នឹង ការតមអាហារ</li>
                    </ul>
                </div>

                {/* Column 2 */}
                <div>
                    <h4 className="font-bold mb-4">ឯកសារ</h4>
                    <ul className="space-y-2 font-regular">
                        <li>តាមដានការមានផ្ទៃពោះ</li>
                        <li>ដំណាក់កាលនៃការមានផ្ទៃពោះ</li>
                        <li>ការស្វែងរកវេជ្ជបណ្ឌិត និង មន្ទីរពេទ្យ</li>
                        <li>ការប្រុងប្រយ័ត្នឈ្មោះទារក</li>
                        <li>វេទិកាសហគមន៍</li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h4 className="font-bold mb-4">កម្មវិធី នឹង ជំនួយ</h4>
                    <ul className="space-y-2 font-regular">
                        <li>ការថែទាំមុនសម្រាល</li>
                        <li>ការគាំទ្របន្ទាប់ពីសម្រាលកូន</li>
                        <li>ការយល់ដឹងអំពីសុខភាពស្ត្រី</li>
                        <li>ការគាំទ្រសុខភាពផ្លូវចិត្ត</li>
                        <li>សិទ្ធិមាតា និងអត្ថប្រយោជន៍នៅកន្លែងធ្វើការ</li>
                    </ul>
                </div>

                {/* Column 4 */}
                <div>
                    <h4 className="font-bold mb-4">ចូលរួមជាមួយពួកយើង</h4>
                    <ul className="space-y-2 font-regular">
                        <li>ការចូលរួមជាសហគមន៍</li>
                        <li>ការស្មគ្រចិត្ត នឹង ការគាំពារ</li>
                        <li>ការបង្ហោះប្លុកផុស</li>
                        <li>ភាពឯកជន និង លក្ខខណ្ឌបុគ្គល</li>
                        <li>ការសួរសំណួរជាមួយAI</li>
                    </ul>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-white mt-6 pt-4">
                <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
                    <p className="text-sm text-center">
                        © 2024 - 2025 Kore Group Inc. All rights reserved.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:shadow-white">
                            <FaFacebookF className="text-blue-500" />
                        </a>
                        <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:shadow-white">
                            <FaInstagram className="text-pink-500" />
                        </a>
                        <a href="#" className="bg-white p-2 rounded-full shadow-sm hover:shadow-white">
                            <FaTelegramPlane className="text-blue-500" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
