export function parentHtml() {
    return `
       <div class="pt-28" style="
                  position: "absolute",
                  top: "100px",
                  left: "100px",
                  cursor: "grab","
               ref={widgetRef} onMouseDown={handleMouseDown}
              >
                  <div style="background-color: #2c2c2c; width: 300px; color: white;"  class=" rounded-xl font-light text-sm  p-4 mx-auto"
                      style="
                          borderRadius: "18px",
                          border: "1.5px solid var(--Black-900, #3D3D3D)",
                          
                  background: "#2c2c2c",
                      ">
                      <div class="w-full justify-between flex items-center">
                          <img src="https://i.ibb.co.com/XtntdPq/widget-Logo.jpg" class="w-36" alt="" />
                          <div class="rounded-full bg-color-#3D3D3D px-2 cursor-pointer py-1 flex items-center justify-center gap-1">
                              <p class="">Auto save</p>
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                                  <path fillRule="evenodd" clipRule="evenodd" d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18ZM4.65915 4.5C4.65915 4.08579 4.99494 3.75 5.40915 3.75C5.82337 3.75 6.15915 4.08579 6.15915 4.5C6.15915 4.75381 6.44844 4.90739 6.67326 4.78962C7.33101 4.44508 8.07964 4.25 8.87402 4.25C11.4974 4.25 13.624 6.37665 13.624 9C13.624 11.6234 11.4974 13.75 8.87402 13.75C6.65969 13.75 4.80097 12.2355 4.27371 10.1869C4.17047 9.7858 4.41196 9.37692 4.8131 9.27367C5.21424 9.17043 5.62312 9.41192 5.72637 9.81306C6.08719 11.215 7.36068 12.25 8.87402 12.25C10.6689 12.25 12.124 10.7949 12.124 9C12.124 7.20507 10.6689 5.75 8.87402 5.75C8.3586 5.75 7.87103 5.86991 7.43779 6.08364C7.1105 6.2451 7.2053 6.68316 7.55898 6.77316C7.9604 6.87531 8.20301 7.28354 8.10086 7.68496C7.99871 8.08638 7.59049 8.32899 7.18907 8.22684L5.22419 7.72684C4.89181 7.64225 4.65915 7.34298 4.65915 7V4.5Z" fill="white" />
                              </svg>
                          </div>
                      </div>
                      <p class="mt-6 text-ellipsis opacity-70">SquareCraft: Empowering Creativity for Your Squarespace Experience</p>
                      <div class="w-full h-1px border-t border-dotted border-#494949 mt-5"></div>
                      <div class="mt-4 flex items-center w-full">
                          <div class="flex items-center w-full">
                              <p class="px-3_5 cursor-pointer">Design</p>
                              <p class="px-3_5 cursor-pointer">Advanced</p>
                              <p class="px-3_5 cursor-pointer">Presets</p>
                          </div>
                      </div>
                      <div class="bg-color-#494949 w-full h-2px mt-3 relative">
                          <div class="absolute bg-color-#EF7C2F h-2px top-0 left-0 w-16"></div>
                      </div>
      
                      <div class="mt-4 pb-3 rounded-15px bg-color-#3D3D3D ">
                          <div class="flex items-center px-3 pt-3 justify-between w-full">
                              <div class="flex items-center gap-2">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="19" viewBox="0 0 16 19" fill="none">
                                      <path d="M5 2.5H3C2.46957 2.5 1.96086 2.71071 1.58579 3.08579C1.21071 3.46086 1 3.96957 1 4.5V16.5C1 17.0304 1.21071 17.5391 1.58579 17.9142C1.96086 18.2893 2.46957 18.5 3 18.5H13C13_5304 18.5 14.0391 18.2893 14.4142 17.9142C14.7893 17.5391 15 17.0304 15 16.5V4.5C15 3.96957 14.7893 3.46086 14.4142 3.08579C14.0391 2.71071 13_5304 2.5 13 2.5H11" stroke="#FDECD7" strokeLinecap="round" strokeLinejoin="round" />
                                      <path d="M5 9.5V8.5H11V9.5M8 8.5V14.5M7 14.5H9M5 2.5C5 1.96957 5.21071 1.46086 5.58579 1.08579C5.96086 0.710714 6.46957 0.5 7 0.5H9C9.53043 0.5 10.0391 0.710714 10.4142 1.08579C10.7893 1.46086 11 1.96957 11 2.5C11 3.03043 10.7893 3_53914 10.4142 3.91421C10.0391 4.28929 9.53043 4.5 9 4.5H7C6.46957 4.5 5.96086 4.28929 5.58579 3.91421C5.21071 3_53914 5 3.03043 5 2.5Z" stroke="#FDECD7" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <p class="text-16px font-semibold">Typography</p>
      
                              </div>
                              <div>
                                  <svg class="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="13" height="6" viewBox="0 0 13 6" fill="none">
                                      <path d="M11.5 5L6.5 1L1.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                              </div>
                          </div>
      
                          <div class="bg-color-#494949 mt-4 w-full h-1px"></div>
                          <div class="px-3 mt-2">
                              <div class="w-full flex items-center justify-between">
                                  <div class="flex items-center gap-2">
      
                                      <div class="flex  items-center justify-end bg-color-#EF7C2F  rounded-22px h-15px w-26px p-1px gap-10px relative">
                                          <div class="bg-color-#F2F2F2 rounded-6px h-13px absolute top-1px w-13px"></div>
                                      </div>
                                      <p>Enable</p>
                                  </div>
      
                                  <div class="flex items-center gap-2 rounded-full px-2.5 cursor-pointer py-1px bg-color-#494949">
                                      <p class="">Reset</p>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 8 8" fill="none">
                                          <path d="M3.99927 7.5C3.02218 7.5 2.19458 7.16094 1.51645 6.48281C0.83833 5.80469 0.499268 4.97708 0.499268 4C0.499268 3.02292 0.83833 2.19531 1.51645 1.51719C2.19458 0.839062 3.02218 0.5 3.99927 0.5C4.50239 0.5 4.98364 0.603833 5.44302 0.8115C5.90239 1.01917 6.29614 1.31638 6.62427 1.70312V0.5H7.49927V3_5625H4.43677V2.6875H6.27427C6.04093 2.27917 5.722 1.95833 5.31745 1.725C4.91291 1.49167 4.47352 1.375 3.99927 1.375C3.2701 1.375 2.65031 1.63021 2.13989 2.14062C1.62948 2.65104 1.37427 3.27083 1.37427 4C1.37427 4.72917 1.62948 5.34896 2.13989 5.85938C2.65031 6.36979 3.2701 6.625 3.99927 6.625C4.56073 6.625 5.0675 6.46458 5.51958 6.14375C5.97166 5.82292 6.28885 5.4 6.47114 4.875H7.38989C7.18573 5.64792 6.7701 6.27865 6.14302 6.76719C5.51593 7.25573 4.80135 7.5 3.99927 7.5Z" fill="#F6F6F6" />
                                      </svg>
                                  </div>
                              </div>
                              <div class="flex mt-4 items-center w-full justify-between gap-2.5">
                                  <button class="bg-color-#EF7C2F w-full text-center rounded-md py-1.5 hover:bg-color-#d87838 transition-all duration-300">Normal</button>
                                  <button class="bg-color-#494949 w-full text-center rounded-md py-1.5 hover:bg-color-#494848 transition-all duration-300">Hover</button>
                              </div>
      
      
                              <div class="mt-4  flex items-center justify-between w-full">
                                  <p class="opacity-65">Text</p>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
                                      <path d="M7 3C6.49368 3 6.00809 3.21071 5.65007 3_58579C5.29204 3.96086 5.09091 4.46957 5.09091 5C5.09091 5.53043 5.29204 6.03914 5.65007 6.41421C6.00809 6.78929 6.49368 7 7 7C7.50632 7 7.99191 6.78929 8.34993 6.41421C8.70796 6.03914 8.90909 5.53043 8.90909 5C8.90909 4.46957 8.70796 3.96086 8.34993 3_58579C7.99191 3.21071 7.50632 3 7 3ZM7 8.33333C6.15613 8.33333 5.34682 7.98214 4.75011 7.35702C4.15341 6.7319 3.81818 5.88406 3.81818 5C3.81818 4.11595 4.15341 3.2681 4.75011 2.64298C5.34682 2.01786 6.15613 1.66667 7 1.66667C7.84387 1.66667 8.65318 2.01786 9.24988 2.64298C9.84659 3.2681 10.1818 4.11595 10.1818 5C10.1818 5.88406 9.84659 6.7319 9.24988 7.35702C8.65318 7.98214 7.84387 8.33333 7 8.33333ZM7 0C3.81818 0 1.10091 2.07333 0 5C1.10091 7.92667 3.81818 10 7 10C10.1818 10 12.8991 7.92667 14 5C12.8991 2.07333 10.1818 0 7 0Z" fill="#6D6D6D" />
                                  </svg>
                              </div>
                              <div class="mt-2 grid grid-cols-12 w-full justify-between gap-3">
                                  <div class="col-span-8 justify-between flex items-center bg-color-#3f3f3f border-#585858 border w-full  rounded">
                                      <p class="py-1 px-3"> SF Pro Sans</p>
                                      <div class="bg-color-#525151 px-2 h-full">
                                          <svg class="cursor-pointer rotate-180 flex items-center justify-center h-full rounded" xmlns="http://www.w3.org/2000/svg" width="13" height="6" viewBox="0 0 13 6" fill="none">
                                              <path d="M11.5 5L6.5 1L1.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div class="col-span-4 justify-between flex items-center bg-color-#3f3f3f border-#585858 border w-full  rounded">
                                  <div style="width= 20px">  <input class="mx-auto" style ="width : 40px; background-color: white; color: black" type="number" name="font-size"/>
</div>
                                      <div class="h-full w-1px bg-color-gray-500"></div>
                                      <p class="text-center mx-auto"> px</p>
                                      <div class="bg-color-#525151 px-2 h-full">
                                          <svg class="cursor-pointer rotate-180 flex items-center justify-center h-full rounded" xmlns="http://www.w3.org/2000/svg" width="13" height="6" viewBox="0 0 13 6" fill="none">
                                              <path d="M11.5 5L6.5 1L1.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                      </div>
                                  </div>
                              </div>
      
      
      
      
      
                              <div class="mt-3 grid grid-cols-12 w-full justify-between gap-3">
                                  <div class="col-span-7 justify-between flex items-center bg-color-#3f3f3f border-#585858 border w-full  rounded">
                                      <p class="py-1 px-3"> Regular</p>
                                      <div class="bg-color-#525151 px-2 h-full">
                                          <svg class="cursor-pointer rotate-180 flex items-center justify-center h-full rounded" xmlns="http://www.w3.org/2000/svg" width="13" height="6" viewBox="0 0 13 6" fill="none">
                                              <path d="M11.5 5L6.5 1L1.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                          </svg>
                                      </div>
                                  </div>
                                  <div class="col-span-4 justify-between flex items-center bg-color-#3f3f3f border-#585858 border w-full  rounded">
                                      <div class="w-full">                               <div class="border w-3 h-3 border-gray-400 mx-auto"></div>
                                      </div>                                <div class="h-full w-1px bg-color-gray-500"></div>
                                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="8" class="w-full" viewBox="0 0 16 8" fill="none">
                                          <path d="M3.49535 7L0.5 4.00233L3_5 1" stroke="#F6F6F6" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M12.5047 1L15.5 3.99771L12.5 7" stroke="#F6F6F6" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M0.5 4H15.5" stroke="#F6F6F6" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      <div class="h-full w-1px bg-color-gray-500"></div>
                                      <svg xmlns="http://www.w3.org/2000/svg" class="w-full" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                          <mask id="path-1-inside-1_542_3166" fill="white">
                                              <path d="M7 0.5C10.5898 0.5 13_5 3.41023 13_5 7C13_5 10.5898 10.5898 13_5 7 13_5C3.41023 13_5 0.5 10.5898 0.5 7C0.5 3.41023 3.41023 0.5 7 0.5ZM1.38636 7C1.38636 8.48883 1.9778 9.91668 3.03056 10.9694C4.08332 12.0222 5.51117 12.6136 7 12.6136C8.48883 12.6136 9.91668 12.0222 10.9694 10.9694C12.0222 9.91668 12.6136 8.48883 12.6136 7C12.6136 5.51117 12.0222 4.08332 10.9694 3.03056C9.91668 1.9778 8.48883 1.38636 7 1.38636C5.51117 1.38636 4.08332 1.9778 3.03056 3.03056C1.9778 4.08332 1.38636 5.51117 1.38636 7ZM10.6932 7.44318H3.30682C3.18928 7.44318 3.07655 7.39649 2.99344 7.31338C2.91033 7.23026 2.86364 7.11754 2.86364 7C2.86364 6.88246 2.91033 6.76974 2.99344 6.68662C3.07655 6.60351 3.18928 6.55682 3.30682 6.55682H10.6932C10.8107 6.55682 10.9234 6.60351 11.0066 6.68662C11.0897 6.76974 11.1364 6.88246 11.1364 7C11.1364 7.11754 11.0897 7.23026 11.0066 7.31338C10.9234 7.39649 10.8107 7.44318 10.6932 7.44318Z" />
                                          </mask>
                                          <path d="M7 0.5C10.5898 0.5 13_5 3.41023 13_5 7C13_5 10.5898 10.5898 13_5 7 13_5C3.41023 13_5 0.5 10.5898 0.5 7C0.5 3.41023 3.41023 0.5 7 0.5ZM1.38636 7C1.38636 8.48883 1.9778 9.91668 3.03056 10.9694C4.08332 12.0222 5.51117 12.6136 7 12.6136C8.48883 12.6136 9.91668 12.0222 10.9694 10.9694C12.0222 9.91668 12.6136 8.48883 12.6136 7C12.6136 5.51117 12.0222 4.08332 10.9694 3.03056C9.91668 1.9778 8.48883 1.38636 7 1.38636C5.51117 1.38636 4.08332 1.9778 3.03056 3.03056C1.9778 4.08332 1.38636 5.51117 1.38636 7ZM10.6932 7.44318H3.30682C3.18928 7.44318 3.07655 7.39649 2.99344 7.31338C2.91033 7.23026 2.86364 7.11754 2.86364 7C2.86364 6.88246 2.91033 6.76974 2.99344 6.68662C3.07655 6.60351 3.18928 6.55682 3.30682 6.55682H10.6932C10.8107 6.55682 10.9234 6.60351 11.0066 6.68662C11.0897 6.76974 11.1364 6.88246 11.1364 7C11.1364 7.11754 11.0897 7.23026 11.0066 7.31338C10.9234 7.39649 10.8107 7.44318 10.6932 7.44318Z" fill="white" />
                                          <path d="M1.38636 7H0.386364H1.38636ZM7 12.6136V13.6136V12.6136ZM12.6136 7H13.6136H12.6136ZM7 1.38636V0.386364V1.38636ZM2.86364 7H1.86364H2.86364ZM7 1.5C10.0375 1.5 12.5 3.96251 12.5 7H14.5C14.5 2.85794 11.1421 -0.5 7 -0.5V1.5ZM12.5 7C12.5 10.0375 10.0375 12.5 7 12.5V14.5C11.1421 14.5 14.5 11.1421 14.5 7H12.5ZM7 12.5C3.96251 12.5 1.5 10.0375 1.5 7H-0.5C-0.5 11.1421 2.85794 14.5 7 14.5V12.5ZM1.5 7C1.5 3.96251 3.96251 1.5 7 1.5V-0.5C2.85794 -0.5 -0.5 2.85794 -0.5 7H1.5ZM0.386364 7C0.386364 8.75405 1.08316 10.4362 2.32345 11.6765L3.73767 10.2623C2.87244 9.39711 2.38636 8.22361 2.38636 7H0.386364ZM2.32345 11.6765C3_56375 12.9168 5.24595 13.6136 7 13.6136V11.6136C5.77639 11.6136 4.60289 11.1276 3.73767 10.2623L2.32345 11.6765ZM7 13.6136C8.75405 13.6136 10.4362 12.9168 11.6765 11.6765L10.2623 10.2623C9.39711 11.1276 8.22361 11.6136 7 11.6136V13.6136ZM11.6765 11.6765C12.9168 10.4362 13.6136 8.75405 13.6136 7H11.6136C11.6136 8.22361 11.1276 9.39711 10.2623 10.2623L11.6765 11.6765ZM13.6136 7C13.6136 5.24595 12.9168 3_56375 11.6765 2.32345L10.2623 3.73767C11.1276 4.60289 11.6136 5.77639 11.6136 7H13.6136ZM11.6765 2.32345C10.4362 1.08316 8.75405 0.386364 7 0.386364V2.38636C8.22361 2.38636 9.39711 2.87244 10.2623 3.73767L11.6765 2.32345ZM7 0.386364C5.24595 0.386364 3_56375 1.08316 2.32345 2.32345L3.73767 3.73767C4.60289 2.87244 5.77639 2.38636 7 2.38636V0.386364ZM2.32345 2.32345C1.08316 3_56375 0.386364 5.24595 0.386364 7H2.38636C2.38636 5.77639 2.87244 4.60289 3.73767 3.73767L2.32345 2.32345ZM10.6932 6.44318H3.30682V8.44318H10.6932V6.44318ZM3.30682 6.44318C3.4545 6.44318 3_59613 6.50185 3.70055 6.60627L2.28633 8.02048C2.55698 8.29113 2.92406 8.44318 3.30682 8.44318V6.44318ZM3.70055 6.60627C3.80497 6.71069 3.86364 6.85232 3.86364 7H1.86364C1.86364 7.38276 2.01569 7.74983 2.28633 8.02048L3.70055 6.60627ZM3.86364 7C3.86364 7.14768 3.80497 7.28931 3.70055 7.39373L2.28633 5.97952C2.01569 6.25017 1.86364 6.61724 1.86364 7H3.86364ZM3.70055 7.39373C3_59613 7.49815 3.4545 7.55682 3.30682 7.55682V5.55682C2.92406 5.55682 2.55698 5.70887 2.28633 5.97952L3.70055 7.39373ZM3.30682 7.55682H10.6932V5.55682H3.30682V7.55682ZM10.6932 7.55682C10.5455 7.55682 10.4039 7.49815 10.2995 7.39373L11.7137 5.97952C11.443 5.70887 11.0759 5.55682 10.6932 5.55682V7.55682ZM10.2995 7.39373C10.195 7.28931 10.1364 7.14768 10.1364 7H12.1364C12.1364 6.61725 11.9843 6.25017 11.7137 5.97952L10.2995 7.39373ZM10.1364 7C10.1364 6.85232 10.195 6.71069 10.2995 6.60627L11.7137 8.02048C11.9843 7.74983 12.1364 7.38275 12.1364 7H10.1364ZM10.2995 6.60627C10.4039 6.50185 10.5455 6.44318 10.6932 6.44318V8.44318C11.0759 8.44318 11.443 8.29113 11.7137 8.02048L10.2995 6.60627Z" fill="#F6F6F6" mask="url(#path-1-inside-1_542_3166)" />
                                      </svg>
      
                                  </div>
                                  <div>
      
                                  </div>
                              </div>
      
      
                              <div class="mt-3 grid grid-cols-12 h-8 w-full justify-between gap-3">
      
                                  <div class="col-span-5 justify-between flex items-center bg-color-#3f3f3f border-#585858 border w-full  rounded">
                                      <div class="w-full">
                                          <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                              <path fillRule="evenodd" clipRule="evenodd" d="M1 0.25C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75H7C7.41421 1.75 7.75 1.41421 7.75 1C7.75 0.585786 7.41421 0.25 7 0.25H1ZM1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H13C13.4142 5.75 13.75 5.41421 13.75 5C13.75 4.58579 13.4142 4.25 13 4.25H1ZM0.25 9C0.25 8.58579 0.585786 8.25 1 8.25H7C7.41421 8.25 7.75 8.58579 7.75 9C7.75 9.41421 7.41421 9.75 7 9.75H1C0.585786 9.75 0.25 9.41421 0.25 9ZM1 12.25C0.585786 12.25 0.25 12.5858 0.25 13C0.25 13.4142 0.585786 13.75 1 13.75H13C13.4142 13.75 13.75 13.4142 13.75 13C13.75 12.5858 13.4142 12.25 13 12.25H1Z" fill="#F6F6F6" />
                                          </svg>
                                      </div>                                <div class="h-full w-1px bg-color-gray-500"></div>
                                      <div class="w-full">
                                          <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                              <path fillRule="evenodd" clipRule="evenodd" d="M4 0.25C3_58579 0.25 3.25 0.585786 3.25 1C3.25 1.41421 3_58579 1.75 4 1.75H10C10.4142 1.75 10.75 1.41421 10.75 1C10.75 0.585786 10.4142 0.25 10 0.25H4ZM1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H13C13.4142 5.75 13.75 5.41421 13.75 5C13.75 4.58579 13.4142 4.25 13 4.25H1ZM3.25 9C3.25 8.58579 3_58579 8.25 4 8.25H10C10.4142 8.25 10.75 8.58579 10.75 9C10.75 9.41421 10.4142 9.75 10 9.75H4C3_58579 9.75 3.25 9.41421 3.25 9ZM1 12.25C0.585786 12.25 0.25 12.5858 0.25 13C0.25 13.4142 0.585786 13.75 1 13.75H13C13.4142 13.75 13.75 13.4142 13.75 13C13.75 12.5858 13.4142 12.25 13 12.25H1Z" fill="#F6F6F6" />
                                          </svg>
                                      </div>
                                      <div class="h-full w-1px bg-color-gray-500"></div>
                                      <div class="w-full">
                                          <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                              <path fillRule="evenodd" class="mx-auto" clipRule="evenodd" d="M7 0.25C6.58579 0.25 6.25 0.585786 6.25 1C6.25 1.41421 6.58579 1.75 7 1.75H13C13.4142 1.75 13.75 1.41421 13.75 1C13.75 0.585786 13.4142 0.25 13 0.25H7ZM1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H13C13.4142 5.75 13.75 5.41421 13.75 5C13.75 4.58579 13.4142 4.25 13 4.25H1ZM6.25 9C6.25 8.58579 6.58579 8.25 7 8.25H13C13.4142 8.25 13.75 8.58579 13.75 9C13.75 9.41421 13.4142 9.75 13 9.75H7C6.58579 9.75 6.25 9.41421 6.25 9ZM1 12.25C0.585786 12.25 0.25 12.5858 0.25 13C0.25 13.4142 0.585786 13.75 1 13.75H13C13.4142 13.75 13.75 13.4142 13.75 13C13.75 12.5858 13.4142 12.25 13 12.25H1Z" fill="#F6F6F6" />
                                          </svg>
                                      </div>
                                      <div class="h-full w-1px bg-color-gray-500"></div>
      
                                      <div class="w-full">
                                          <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                              <path fillRule="evenodd" class="mx-auto" clipRule="evenodd" d="M1 0.25C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75H13C13.4142 1.75 13.75 1.41421 13.75 1C13.75 0.585786 13.4142 0.25 13 0.25H1ZM1 4.25C0.585786 4.25 0.25 4.58579 0.25 5C0.25 5.41421 0.585786 5.75 1 5.75H13C13.4142 5.75 13.75 5.41421 13.75 5C13.75 4.58579 13.4142 4.25 13 4.25H1ZM0.25 9C0.25 8.58579 0.585786 8.25 1 8.25H13C13.4142 8.25 13.75 8.58579 13.75 9C13.75 9.41421 13.4142 9.75 13 9.75H1C0.585786 9.75 0.25 9.41421 0.25 9ZM1 12.25C0.585786 12.25 0.25 12.5858 0.25 13C0.25 13.4142 0.585786 13.75 1 13.75H7C7.41421 13.75 7.75 13.4142 7.75 13C7.75 12.5858 7.41421 12.25 7 12.25H1Z" fill="#F6F6F6" />
                                          </svg>
                                      </div>
      
                                  </div>
      
      
                                  <div class="col-span-3 justify-between flex items-center bg-color-#3f3f3f border-#585858 border w-full  rounded">
                                      <div class="w-full">
                                          <p class="text-center text-xs">3px</p>
                                      </div>                                <div class="h-full w-1px bg-color-gray-500"></div>
                                      <svg class="w-full" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                          <path d="M2.66132 1H11.3386" stroke="white" strokeLinecap="round" />
                                          <path d="M6.99994 1V7.85714" stroke="white" strokeLinecap="round" />
                                          <path d="M2.66135 9.57144L0.925903 11.2857M0.925903 11.2857L2.66135 13M0.925903 11.2857L13.074 11.2857M13.074 11.2857L11.3386 9.57144M13.074 11.2857L11.3386 13" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
      
      
                                  </div>
                                  <div class="col-span-3 justify-between flex items-center bg-color-#3f3f3f border-#585858 border w-full  rounded">
                                      <div class="w-full">
                                          <p class="text-center text-xs">Auto</p>                                </div>                                <div class="h-full w-1px bg-color-gray-500"></div>
                                      <svg class="w-full" xmlns="http://www.w3.org/2000/svg" width="18" height="14" viewBox="0 0 18 14" fill="none">
                                          <path d="M1 11L3 13M3 13L5 11M3 13L3 1M3 1L1 3M3 1L5 3" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
                                          <path d="M9 2H17" stroke="white" strokeLinecap="round" />
                                          <path d="M9 7H17" stroke="white" strokeLinecap="round" />
                                          <path d="M9 12H17" stroke="white" strokeLinecap="round" />
                                      </svg>
      
      
                                  </div>
                                  <div>
      
                                  </div>
                              </div>
                          </div>
      
      
                      </div>
                  </div>
      
              </div>
    `;
  }
  
