import { shakingBlocksData } from "./Data2.js";

function getSearchParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search');
}

function handleSearchOnPage(data, searchTerm) {
    if (!searchTerm) return data;
    
    return data.filter(item => {
        return Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
}

function renderShakingTable() {
    const tableBody = document.getElementById('shakingTableBody');
    
    if (!tableBody) {
        console.error('Элемент shakingTableBody не найден');
        return;
    }
    
    const searchTerm = getSearchParam();
    let displayData = shakingBlocksData;
    
    if (searchTerm) {
        displayData = handleSearchOnPage(shakingBlocksData, searchTerm);

        if (displayData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="12" class="no-results">По запросу "${searchTerm}" ничего не найдено</td></tr>`;
            return;
        }
    }
    
    const tableHTML = displayData.map((item, index) => {
        const isWarning = item.periodInit.includes('Не работает');
        const isDisabled = item.note.includes('Демонтирован');
        
        return `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${item.num}</strong></td>
            <td>
                <div class="equipment-filter">${item.filter}</div>
                <div class="equipment-num">№${item.filterNum}</div>
            </td>
            <td>
                <div class="equipment-vent">${item.vent}</div>
                <div class="equipment-num">№${item.ventNum}</div>
            </td>
            <td>${item.workshop}</td>
            <td>${item.floor}</td>
            <td class="${isWarning ? 'status-warning' : 'status-normal'}">${item.periodInit}</td>
            <td>${item.periodCorr}</td>
            <td>${item.impulseInit}</td>
            <td>${item.impulseCorr}</td>
            <td>${item.line}</td>
            <td class="${isDisabled ? 'status-disabled' : ''}">${item.note}</td>
        </tr>`;
    }).join('');

    tableBody.innerHTML = tableHTML;
}

document.addEventListener('DOMContentLoaded', function() {
    renderShakingTable();
});