import Image from 'next/image'
import * as React from "react";
import dynamic from 'next/dynamic';
const GeneratePDF = dynamic(() => import("../component/pdf-generator"), { ssr: false });
import { FaRegEdit } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";


export default function Home() {
  const ref = React.useRef();
  const [showBill, setShowbill] = React.useState(false)
  // const [itemCout, setItemCout] = React.useState(1);
  const [dowloadProgress, setDownloadProgress] = React.useState(false)
  const [formData, setFormData] = React.useState({
    date: '',
    address: '',
    items: [
      {
        "item_name": "",
        "amount": 0
      }
    ]
  })


  const itemUpdate = (index: number, field: string, value: any) => {
    const updatedFormData = { ...formData };
    updatedFormData.items[index][field] = value;
    setFormData(updatedFormData);
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // const data = {
    //   date: event.target.date.value,
    //   address: event.target.address.value,
    //   items: []
    // };

    // for (let i = 1; i <= itemCout; i++) {
    //   data['items'].push(event.target['item-' + i].value)
    // }

    console.log(formData);

  }

  function startDownLoadProcess() {
    console.log('started...');

    setDownloadProgress(true)
    setTimeout(() => setDownloadProgress(false), 3000)
  }


  function NumberWithCommas(number: number) {
    const formatter = new Intl.NumberFormat('en-US');
    return (
      <span>{formatter.format(number)}</span>
    );
  }


  return (
    <main className="flex flex-col items-center justify-between mt-2">
      {
        !showBill ?
          <form className="w-10/12 mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="date" className="block text-gray-700 font-bold mb-2">Date</label>
              <input value={formData.date} onChange={(event) => setFormData({ ...formData, date: event.target.value })} type="date" id="date" name="date" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Customer Address:</label>
              <input value={formData.address} onChange={(event) => setFormData({ ...formData, address: event.target.value })} type="text" id="address" name="address" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
            </div>
            {
              formData.items.map((item, i) => {
                return (
                  <div className="mb-4" key={i}>
                    <label htmlFor={`item-${i}`} className="block text-gray-700 font-bold mb-2">Item {i + 1}:</label>
                    <div className='flex gap-2'>
                      <input value={item.item_name} onChange={(event) => itemUpdate(i, 'item_name', event.target.value)} type="text" id={`item-${i}`} name={`item-${i}`} className="w-3/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                      <input value={item.amount} onChange={(event) => itemUpdate(i, 'amount', event.target.value)} type="text" id={`cost-${i}`} name={`cost-${i}`} className="w-1/4 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                  </div>
                )
              })
            }

            <div className="flex gap-4 justify-center">
              <button onClick={() => setFormData({ ...formData, items: [...formData.items, { item_name: '', amount: 0 }] })} className="bg-violet-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                Add Item
              </button>
              <button type="submit" onClick={() => { setShowbill(true); setDownloadProgress(false) }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                Preview
              </button>
            </div>
          </form>
          :
          <>
            <div className={`w-12/12 mt-2 ${dowloadProgress ? 'full-width' : ''}`}>
              <div id='bill' className='bg-white w-5/5 p-2 text-black'>
                {!dowloadProgress &&
                  <button onClick={() => setShowbill(false)} className='absolute edit-btn gap-0 p-3 rounded-full bg-red-600 text-slate-50 shadow'>
                    <MdModeEditOutline />
                  </button>
                }

                <div className="border-black border grid grid-cols-7 grid-rows-4 grid-flow-col gap-4" style={{ height: '170px' }}>
                  <div className=" row-span-3 ..."></div>
                  <div className="ml-2 mb-2  row-span-1 col-span-6 ..." style={{ transform: 'translateY(-40px)', maxWidth: '85%' }}>
                    Bill No:
                    <div>
                      To: {formData.address}
                    </div>
                  </div>
                  {/* <div className=" col-span-5 ...">03</div> */}
                  <div className="flex items-center justify-center  row-span-3 col-span-4 ...">
                    <img style={{ width: '215px', height: '80px' }} src="/logo.png" alt="Vercel" className="w-4/5 h-4/5" />
                  </div>
                  <div className="flex flex-col justify-around  row-span-3 col-span-2 ...">
                    <div className='grid grid-cols-2 grid-rows-2 grid-flow-col gap-0 pr-2'>
                      <span className='row-span-2'>Mobile:</span>
                      <div>9746003843 8547038043</div>

                    </div>
                    <div>
                      Date: {formData.date}
                    </div>
                  </div>
                  <div className=" ..."></div>
                </div>
                <table className='w-full table-auto border-black border-b'>
                  <thead>
                    <tr>
                      <th className='w-2/12 border-black border-x border-b'>No</th>
                      <th className='w-6/12 border-black border-x border-b'>Particulers</th>
                      <th className='w-3/12 border-black border-x border-b'>Amount</th>
                    </tr>
                  </thead>
                  <tbody style={{ minHeight: '100px' }}>
                    {formData.items.map((item, i) =>
                      <tr key={i}>
                        <td className='w-2/12 border-black border-x text-center'>{i + 1}</td>
                        <td className='w-6/12 border-black border-x'>{item.item_name}</td>
                        <td className='w-3/12 border-black border-x pl-5'>{NumberWithCommas(Number(item.amount))}</td>
                      </tr>
                    )
                    }
                    {[...Array(Math.max(15 - formData.items.length, 0))].map((_, i) =>
                      <tr key={formData.items.length + i}>
                        <td className='w-2/12 border-black border-x text-center'></td>
                        <td className='w-6/12 border-black border-x'></td>
                        <td className='w-3/12 border-black border-x pl-5'></td>
                      </tr>
                    )}
                    <tr className='border-black border-b'>
                      <td className='w-2/12 border-black border-x text-center'></td>
                      <td className='w-6/12 border-black border-x text-end pr-10'>Total</td>
                      <td className='w-3/12 border-black border-x border-t pl-5'>
                        {NumberWithCommas(formData.items.reduce((total, item) => {
                          return total + Number(item.amount);
                        }, 0))}
                      </td>
                    </tr>
                    <tr className='border-black border'>
                      <td className='w-2/12'></td>
                      <td className='w-6/12'></td>
                      <td className='p-10'>Signature</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex-1 flex flex-row w-full justify-center" onClick={() => startDownLoadProcess()}>
              {/* <button onClick={() => setShowbill(false)} className='gap-0 p-5 rounded shadow bg-gradient-to-r hover:bg-violet-600 from-violet-500 to-fuchsia-500 m-4 h-14 flex items-center'>
                <FaRegEdit />
                Edit Form
              </button> */}
              <GeneratePDF html={ref} />
            </div>

          </>
      }
    </main>

  )
}
