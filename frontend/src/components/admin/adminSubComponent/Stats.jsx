import React from 'react'

const Stats = () => {
  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-5 gap-4 mt-5'>
              <div className='bg-gray-300 dark:bg-gray-800 flex justify-between items-center p-2 rounded-md shadow-md'>
                <span>
                  <svg 
                  xmlns="http://www.w3.org/2000/svg"
                    className='w-8 h-8 text-blue-700'
                  // height="24px" 
                    viewBox="0 -960 960 960" 
                  // width="24px" 
                    fill="currentColor"
                  >
                  <path d="M480-120q-151 0-255.5-46.5T120-280v-400q0-66 105.5-113T480-840q149 0 254.5 47T840-680v400q0 67-104.5 113.5T480-120Zm0-479q89 0 179-25.5T760-679q-11-29-100.5-55T480-760q-91 0-178.5 25.5T200-679q14 30 101.5 55T480-599Zm0 199q42 0 81-4t74.5-11.5q35.5-7.5 67-18.5t57.5-25v-120q-26 14-57.5 25t-67 18.5Q600-528 561-524t-81 4q-42 0-82-4t-75.5-11.5Q287-543 256-554t-56-25v120q25 14 56 25t66.5 18.5Q358-408 398-404t82 4Zm0 200q46 0 93.5-7t87.5-18.5q40-11.5 67-26t32-29.5v-98q-26 14-57.5 25t-67 18.5Q600-328 561-324t-81 4q-42 0-82-4t-75.5-11.5Q287-343 256-354t-56-25v99q5 15 31.5 29t66.5 25.5q40 11.5 88 18.5t94 7Z"/>
                  </svg>
                </span>
                <div className='flex flex-col items-start gap-1'>
                  <span className='text-gray-500 dark:text-gray-400'>Total Products</span>
                  <span className='font-semibold text-gray-700 dark:text-gray-300'>Value</span>
                </div>
              </div>
              <div className='bg-gray-300 dark:bg-gray-800 flex justify-between items-center p-2 rounded-md shadow-md'>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" 
                  className='w-8 h-8 text-blue-700'
                  //  height="24px" 
                   viewBox="0 -960 960 960" 
                  //  width="24px" 
                   fill="currentColor"
                    >
                    <path d="M120-120v-80l80-80v160h-80Zm160 0v-240l80-80v320h-80Zm160 0v-320l80 81v239h-80Zm160 0v-239l80-80v319h-80Zm160 0v-400l80-80v480h-80ZM120-327v-113l280-280 160 160 280-280v113L560-447 400-607 120-327Z"/>
                  </svg>
                </span>
                <div className='flex flex-col items-start gap-1'>
                  <span className='text-gray-500 dark:text-gray-400'>Product Sum</span>
                  <span className='font-semibold text-gray-700 dark:text-gray-300'>Value</span>
                </div>
              </div>
    
              <div className='bg-gray-300 dark:bg-gray-800 flex justify-between items-center p-2 rounded-md shadow-md'>
                <span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className='w-8 h-8 text-blue-700'
                    viewBox="0 -960 960 960" 
                    fill="currentColor"
                    >
                    <path d="M280-280h80v-200h-80v200Zm320 0h80v-400h-80v400Zm-160 0h80v-120h-80v120Zm0-200h80v-80h-80v80ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
                  </svg>
                </span>
                <div className='flex flex-col items-start gap-1'>
                  <span className='text-gray-500 dark:text-gray-400'>Total Sales</span>
                  <span className='font-semibold text-gray-700 dark:text-gray-300'>Value</span>
                </div>
              </div>
    
              <div className='bg-gray-300 dark:bg-gray-800 flex justify-between items-center p-2 rounded-md shadow-md'>
                <span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className='w-8 h-8 text-blue-700'
                  //  height="24px" 
                    viewBox="0 -960 960 960" 
                  //  width="24px" 
                    fill="currentColor"
                    >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-640h80v640h640v80H200Zm40-120v-360h160v360H240Zm200 0v-560h160v560H440Zm200 0v-200h160v200H640Z"/>
                    </svg>
                </span>
                <div className='flex flex-col items-start gap-1'>
                  <span className='text-gray-500 dark:text-gray-400'>Total Profits</span>
                  <span className='font-semibold text-gray-700 dark:text-gray-300'>Value</span>
                </div>
              </div>
    
              <div className='bg-gray-300 dark:bg-gray-800 flex justify-between items-center p-2 rounded-md shadow-md'>
                <span>
                  <svg 
                    xmlns="http://www.w3.org/2000/svg"
                    className='w-8 h-8 text-blue-700' 
                  //  height="24px" 
                    viewBox="0 -960 960 960" 
                  //  width="24px" 
                    fill="currentColor"
                    >
                    <path d="M640-240v-80h104L536-526 376-366 80-664l56-56 240 240 160-160 264 264v-104h80v240H640Z"
                    />
                    </svg>
                </span>
                <div className='flex flex-col items-start gap-1'>
                  <span className='text-gray-500 dark:text-gray-400'>Product on Sale</span>
                  <span className='font-semibold text-gray-700 dark:text-gray-300'>Value</span>
                </div>
              </div>
    </div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 px-0 md:px-'>
      <div className='mt-5 flex justify-center gap-3 bg-blue-300 p-4 rounded-md shadow-md'>
        <div className='flex flex-col justify-start gap-[7px] h-40 w-5'>
          <span className='text-nowrap tracking-tighter'>-100</span>
          <span>-80</span>
          <span>-60</span>
          <span>-40</span>
          <span>-20</span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[50%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
            {/* <span className='absolute text-xs tracking-tighter'>50%</span> */}
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>J</span> <span>a</span> <span>n</span></span>
        </div>
        
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[60%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>F</span> <span>e</span> <span>b</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[40%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>M</span> <span>a</span> <span>r</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[70%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>A</span> <span>p</span> <span>r</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[40%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>M</span> <span>a</span> <span>y</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[55%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>J</span> <span>u</span> <span>n</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[65%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>J</span> <span>u</span> <span>l</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[30%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>A</span> <span>u</span> <span>g</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[20%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>S</span> <span>e</span> <span>p</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[80%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>O</span> <span>c</span> <span>t</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[85%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>N</span> <span>o</span> <span>v</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[90%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>D</span> <span>e</span> <span>c</span></span>
        </div>

      </div>
      <div className='mt-5 flex justify-center gap-3 bg-blue-300 p-4 rounded-md shadow-md'>
        <div className='flex flex-col justify-start gap-[7px] h-40 w-5'>
          <span className='text-nowrap tracking-tighter'>-100</span>
          <span>-80</span>
          <span>-60</span>
          <span>-40</span>
          <span>-20</span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[50%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
            {/* <span className='absolute text-xs tracking-tighter'>50%</span> */}
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>J</span> <span>a</span> <span>n</span></span>
        </div>
        
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[60%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>F</span> <span>e</span> <span>b</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[40%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>M</span> <span>a</span> <span>r</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[70%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>A</span> <span>p</span> <span>r</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[40%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>M</span> <span>a</span> <span>y</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[55%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>J</span> <span>u</span> <span>n</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[65%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>J</span> <span>u</span> <span>l</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[30%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>A</span> <span>u</span> <span>g</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[20%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>S</span> <span>e</span> <span>p</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[80%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>O</span> <span>c</span> <span>t</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[85%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>N</span> <span>o</span> <span>v</span></span>
        </div>
        <div>
          <span className='block w-3.5 h-40 rounded-full shadow-md relative bg-gray-300'>
            <span className='block w-3.5 h-[90%] rounded-full shadow-md absolute bottom-0 left-0 bg-blue-600'></span>
          </span>
          <span className='flex flex-col leading-3 tracking-tighter uppercase font-semibold pt-1'><span>D</span> <span>e</span> <span>c</span></span>
        </div>

      </div>
    </div>
    </div>
  )
}

export default Stats
