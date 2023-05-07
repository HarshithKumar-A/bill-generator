import Image from 'next/image'
import * as React from "react";
import dynamic from 'next/dynamic';
const GeneratePDF = dynamic(() => import("../component/pdf-generator"), { ssr: false });

export default function Home() {
  const ref = React.useRef();
  // const [itemCout, setItemCout] = React.useState(1);
  const [formData, setFormData] = React.useState({
    date: '',
    address: '',
    items: [
      { item_name: '', amount: 0 }
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-2">
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
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
            Submit
          </button>
        </div>
      </form>
      <div className="">
        <div id='bill' className='bg-white w-4/5 p-2 text-black'>
          <div className="border-black border grid grid-cols-7 grid-rows-4 grid-flow-col gap-4">
            <div className=" row-span-3 ..."></div>
            <div className="ml-2 mb-2  row-span-1 col-span-6 ...">
              Bill No:
              <div>
                To: arikkala house p.o palta kerala indoi= 67qwwwq ejlfj fnef nfg
              </div>
            </div>
            {/* <div className=" col-span-5 ...">03</div> */}
            <div className="flex items-center justify-center  row-span-3 col-span-4 ...">
              <img src="/logo.png" alt="Vercel" className="w-4/5 h-4/5" />
            </div>
            <div className="flex flex-col justify-around  row-span-3 col-span-2 ...">
              <div className='grid grid-cols-2 grid-rows-2 grid-flow-col gap-0'>
                <span className='row-span-2'>Mobile:</span>
                <div>987654321 987654321</div>

              </div>
              <div>
                Date: 12/2/1222
              </div>
            </div>
            <div className=" ..."></div>
          </div>
        </div>
      </div>
      <GeneratePDF html={ref} />
    </main>

  )
}
