javascript: (function() {
    if (!document.querySelector('#wms_roster_grid')) {
        alert('Please%20activate%20Face%20Book%20view%20first%20by%20clicking%20\%22Show%20Face%20Book\%22%20button');
        return;
    }
    const % 20 table = document.querySelector('#content%20TABLE.roster.ic-Table');
    if (!table) {
        alert('Cannot%20find%20roster%20table');
        return;
    }
    const % 20 rows = table.querySelectorAll('TR.rosterUser');
    const % 20 gridUsers = document.querySelectorAll('#wms_roster_grid%20.wms_roster_user');
    if (rows.length !== gridUsers.length) {
        alert('Mismatch%20between%20table%20rows%20and%20grid%20users');
        return;
    }
    const % 20 sectionMap = new % 20 Map();
    const % 20 sections = new % 20 Set();
    rows.forEach((row, index) = % 3 E {
        const % 20 sectionDiv = row.querySelector('div.section');
        const % 20 section = sectionDiv ? sectionDiv.textContent.trim() : 'No%20Section';
        sections.add(section);
        sectionMap.set(gridUsers[index], section);
    });
    const % 20 sectionArray = ['All', ...Array.from(sections).sort()];
    let % 20 currentSectionIndex = 0;
    let % 20 controlsDiv = document.querySelector('#wms_section_controls');
    if (!controlsDiv) {
        controlsDiv = document.createElement('div');
        controlsDiv.id = 'wms_section_controls';
        controlsDiv.style.cssText = 'padding:10px;background:#f0f0f0;border:1px%20solid%20#ccc;border-radius:4px;margin-bottom:15px;';
        const % 20 grid = document.querySelector('#wms_roster_grid');
        grid.parentNode.insertBefore(controlsDiv, grid);
    }

    function % 20 updateDisplay() {
        const % 20 currentSection = sectionArray[currentSectionIndex];
        let % 20 visibleCount = 0;
        gridUsers.forEach(user = % 3 E {
            const % 20 userSection = sectionMap.get(user);
            if (currentSection === 'All' || userSection === currentSection) {
                user.style.display = 'inline-block';
                visibleCount++;
            } else {
                user.style.display = 'none';
            }
        });
        controlsDiv.innerHTML = % 60 % 3 Cstrong % 3 ESection: % 3 C / strong % 3 E % 20 $ {
            currentSection
        } % 20 % 3 Cbutton % 20 id = 'wms_prev_section' % 20 style = 'margin-left:10px;' % 3 E % E2 % 86 % 90 % 20 Previous % 3 C / button % 3 E % 3 Cbutton % 20 id = 'wms_next_section' % 20 style = 'margin-left:5px;' % 3 ENext % 20 % E2 % 86 % 92 % 3 C / button % 3 E % 3 Cbutton % 20 id = 'wms_all_sections' % 20 style = 'margin-left:10px;' % 3 EShow % 20 All % 3 C / button % 3 E % 3 Cspan % 20 style = 'margin-left:15px;color:#666;' % 3 E($ {
            visibleCount
        } % 20 users) % 3 C / span % 3 E % 60;
        document.querySelector('#wms_prev_section').onclick = () = % 3 E {
            currentSectionIndex = (currentSectionIndex - 1 + sectionArray.length) % sectionArray.length;
            updateDisplay();
        };
        document.querySelector('#wms_next_section').onclick = () = % 3 E {
            currentSectionIndex = (currentSectionIndex + 1) % sectionArray.length;
            updateDisplay();
        };
        document.querySelector('#wms_all_sections').onclick = () = % 3 E {
            currentSectionIndex = 0;
            updateDisplay();
        };
    }
    updateDisplay();
})();    
