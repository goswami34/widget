document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".squareCraft-cursor-pointer");
    const contentContainer = document.querySelector(".squareCraft-rounded-6px.squareCraft-mt-6");
    const activeIndicator = document.querySelector(".squareCraft-absolute"); // The moving indicator

    const tabData = {
        design: `
           <div class="squareCraft-flex squareCraft-p-2 squareCraft-items-center squareCraft-justify-between">
                <div class="squareCraft-flex squareCraft-gap-2 squareCraft-items-center"><img loading="lazy" src="https://fatin-webefo.github.io/squareCraft-Plugin/public/T.svg" alt=""><p>Typography</p></div>
                <img src="https://fatin-webefo.github.io/squareCraft-Plugin/public/arrow.svg" alt="">
            </div>
            <div class="squareCraft-h-1px squareCraft-bg-3f3f3f"></div>
            <div class="squareCraft-flex squareCraft-px-2 squareCraft-mt-2 squareCraft-items-center squareCraft-justify-between">
                <div class="squareCraft-flex squareCraft-gap-2 squareCraft-items-center">
                    <div class="squareCraft-relative squareCraft-w-toogle squareCraft-h-toogle squareCraft-rounded-15px squareCraft-bg-color-EF7C2F squareCraft-h-13px">
                        <div class="squareCraft-absolute squareCraft-bg-F2F2F2 squareCraft-rounded-full squareCraft-h-toogle-bullet squareCraft-w-13px"></div>
                    </div>
                    <p class="squareCraft-text-sm">Enable</p>
                </div>
                <div class="squareCraft-flex squareCraft-items-center squareCraft-py-1px squareCraft-rounded-15px squareCraft-gap-2 squareCraft-bg-color-3d3d3d squareCraft-px-2">
                    <p class="squareCraft-text-sm">Reset</p>
                    <img src="https://fatin-webefo.github.io/squareCraft-Plugin/public/reset.svg" width="12px" />
                </div>
            </div>
            <div class="squareCraft-h-1px squareCraft-mt-2 squareCraft-bg-3f3f3f"></div>
            <div class="squareCraft-mt-2">
                <div class="squareCraft-flex squareCraft-px-2 squareCraft-w-full squareCraft-items-center squareCraft-justify-between squareCraft-gap-2">
                    <div class="squareCraft-bg-color-EF7C2F squareCraft-w-full squareCraft-font-light squareCraft-flex squareCraft-items-center squareCraft-text-sm squareCraft-py-1px squareCraft-rounded-6px squareCraft-text-color-white squareCraft-justify-center">Normal</div>
                    <div class="squareCraft-bg-3f3f3f squareCraft-w-full squareCraft-text-color-white squareCraft-font-light squareCraft-flex squareCraft-text-sm squareCraft-py-1px squareCraft-rounded-6px squareCraft-items-center squareCraft-justify-center">Hover</div>
                </div>
               <div class="squareCraft-px-4">
                <div class="squareCraft-h-1px  squareCraft-mt-2 squareCraft-bg-3f3f3f"></div>
               </div>
            </div>
        `,
        advanced: `
            <div class="squareCraft-flex squareCraft-p-2 squareCraft-items-center squareCraft-justify-between">
                <p class="squareCraft-text-sm">Advanced Settings</p>
            </div>
            <div class="squareCraft-h-1px squareCraft-bg-3f3f3f"></div>
        `,
        presets: `
            <div class="squareCraft-flex squareCraft-p-2 squareCraft-items-center squareCraft-justify-between">
                <p class="squareCraft-text-sm">Preset Options</p>
            </div>
            <div class="squareCraft-h-1px squareCraft-bg-3f3f3f"></div>
        `
    };

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            tabs.forEach(t => t.classList.remove("active"));
            this.classList.add("active");

            const selectedTab = this.textContent.trim().toLowerCase();
            contentContainer.innerHTML = tabData[selectedTab] || "";

            // Move the active indicator to the clicked tab
            const tabRect = this.getBoundingClientRect();
            const parentRect = this.parentElement.getBoundingClientRect();
            activeIndicator.style.left = `${tabRect.left - parentRect.left}px`;
            activeIndicator.style.width = `${tabRect.width}px`;
        });
    });
});
