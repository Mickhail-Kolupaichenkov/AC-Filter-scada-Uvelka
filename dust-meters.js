import { dustMetersData } from "./Data3.js";

// Функция для получения параметра поиска из URL
function getSearchParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search');
}

// Функция для фильтрации данных по поисковому запросу
function handleSearchOnPage(data, searchTerm) {
    if (!searchTerm) return data;
    
    return data.filter(item => {
        return Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
}

function renderDustMetersTable() {
    const tableBody = document.getElementById('dustmetersTableBody');
    
    if (!tableBody) {
        console.error('Элемент dustmetersTableBody не найден');
        return;
    }
    
    // Проверяем поисковый запрос
    const searchTerm = getSearchParam();
    let displayData = dustMetersData;
    
    if (searchTerm) {
        displayData = handleSearchOnPage(dustMetersData, searchTerm);
        // Показываем сообщение если ничего не найдено
        if (displayData.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="7" class="no-results">По запросу "${searchTerm}" ничего не найдено</td></tr>`;
            return;
        }
    }
    
    const tableHTML = displayData.map((item) => {
        const isPresent = item.status === 'present';
        
        return `
        <tr>
            <td>
                <div class="filter-name">${item.filter}</div>
            </td>
            <td><strong>${item.number}</strong></td>
            <td class="${isPresent ? 'status-present' : 'status-absent'}">
                ${isPresent ? '+' : '-'}
            </td>
            <td class="${isPresent ? 'reading-value' : 'reading-absent'}">
                ${item.currentReading}
            </td>
            <td class="${isPresent ? 'reading-value' : 'reading-absent'}">
                ${item.maxReading}
            </td>
            <td class="dustmeter-model">${item.model}</td>
            <td class="${item.note ? 'note-warning' : ''}">${item.note}</td>
        </tr>`;
    }).join('');

    tableBody.innerHTML = tableHTML;
}

renderDustMetersTable();