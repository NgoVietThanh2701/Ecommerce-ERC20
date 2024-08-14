import React from 'react'
import moment from 'moment';
import 'moment/locale/vi'

export const formatTime = (createdAt) => {
   moment.locale('vi');
   return moment(createdAt).fromNow();
}

const HistoryTransaction = ({ transactions }) => {

   return (
      <div className="relative overflow-x-auto">
         <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
               <tr>
                  <th scope="col" className="px-6 py-3">
                     STT
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Số BNB
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Tỉ giá(%)
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Số LCK
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Nội dung
                  </th>
                  <th scope="col" className="px-6 py-3">
                     Thời gian
                  </th>
               </tr>
            </thead>
            <tbody>
               {
                  transactions.length > 0 && transactions.map((transacion, index) => (
                     <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                        <td className="px-6 py-4">
                           {index}
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                           {transacion.amountBNB}
                        </th>
                        <td className="px-6 py-4">
                           {transacion.rate}
                        </td>
                        <td className="px-6 py-4">
                           {transacion.rate * transacion.amountBNB}
                        </td>
                        <td className="px-6 py-4">
                           {`Đổi từ BNB -> LCK`}
                        </td>
                        <td className="px-6 py-4">
                           {formatTime(transacion.date.toNumber() * 1000)}
                        </td>

                     </tr>
                  ))
               }
            </tbody>
         </table>
      </div>
   )
}

export default HistoryTransaction