javascript: (function() {
            if (!document.querySelector('#wms_roster_grid')) {
                alert('Please activate Face Book view first by clicking \"Show Face Book\" button');
                return;
            }
            const table = document.querySelector('#content TABLE.roster.ic-Table');
            if (!table) {
                alert('Cannot find roster table');
                return;
            }
            const rows = table.querySelectorAll('TR.rosterUser');
            const gridUsers = document.querySelectorAll('#wms_roster_grid .wms_roster_user');
            if (rows.length !== gridUsers.length) {
                alert('Mismatch between table rows and grid users');
                return;
            }
            const sectionMap = new Map();
            const sections = new Set();
            rows.forEach((row, index) => {
                const sectionDiv = row.querySelector('div.section');
                const section = sectionDiv ? sectionDiv.textContent.trim() : 'No Section';
                sections.add(section);
                sectionMap.set(gridUsers[index], section);
            });
            const sectionArray = ['All', ...Array.from(sections).sort()];
            let currentSectionIndex = 0;
            let controlsDiv = document.querySelector('#wms_section_controls');
            if (!controlsDiv) {
                controlsDiv = document.createElement('div');
                controlsDiv.id = 'wms_section_controls';
                controlsDiv.style.cssText = 'padding:10px;background:#f0f0f0;border:1px solid #ccc;border-radius:4px;margin-bottom:15px;';
                const grid = document.querySelector('#wms_roster_grid');
                grid.parentNode.insertBefore(controlsDiv, grid);
            }

            function updateDisplay() {
                const currentSection = sectionArray[currentSectionIndex];
                let visibleCount = 0;
                gridUsers.forEach(user => {
                    const userSection = sectionMap.get(user);
                    if (currentSection === 'All' || userSection === currentSection) {
                        user.style.display = 'inline-block';
                        visibleCount++;
                    } else {
                        user.style.display = 'none';
                    }
                });
                controlsDiv.innerHTML = % 60 < strong > Section: < /strong> ${currentSection} <button id='wms_prev_section' style='margin-left:10px;'>← Previous</button > < button id = 'wms_next_section'
                style = 'margin-left:5px;' > Next→ < /button><button id='wms_all_sections' style='margin-left:10px;'>Show All</button > < span style = 'margin-left:15px;color:#666;' > ($ {
                        visibleCount
                    }
                    users) < /span>%60;document.querySelector('#wms_prev_section').onclick=()=>{currentSectionIndex=(currentSectionIndex-1+sectionArray.length)%sectionArray.length;updateDisplay();};document.querySelector('#wms_next_section').onclick=()=>{currentSectionIndex=(currentSectionIndex+1)%sectionArray.length;updateDisplay();};document.querySelector('#wms_all_sections').onclick=()=>{currentSectionIndex=0;updateDisplay();};}updateDisplay();})();
