import { acSistemsContent } from "./Data1.js";

const acSistemList = document.querySelector(".cards-grid");
let filteredData = [...acSistemsContent]; 

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

function acSistemRender(data = acSistemsContent) {
    // Проверяем поисковый запрос
    const searchTerm = getSearchParam();
    let displayData = data;
    
    if (searchTerm) {
        displayData = handleSearchOnPage(data, searchTerm);
        // Показываем сообщение если ничего не найдено
        if (displayData.length === 0) {
            acSistemList.innerHTML = `<div class="no-results">По запросу "${searchTerm}" ничего не найдено</div>`;
            return;
        }
    }
    
    const acSistemHTML = displayData.map((ac) => {
        return `<div class="network-card">
            <div class="card-header">
                <h3>АС №${ac.num}</h3>
                <span class="network-status status-active">Активна</span>
            </div>
            <div class="card-content">
                <div class="info-row">
                    <span class="label">ИЗАВ:</span>
                    <span class="value">${ac.izav}</span>
                </div>
                <div class="info-row">
                    <span class="label">Фильтр:</span>
                    <span class="value">${ac.titleFilter}</span>
                </div>
                <div class="info-row">
                    <span class="label">Вентилятор:</span>
                    <span class="value">${ac.titleVent}</span>
                </div>
                <div class="info-row">
                    <span class="label">Линия:</span>
                    <span class="value">${ac.line}</span>
                </div>
                <div class="info-row">
                    <span class="label">Этаж:</span>
                    <span class="value">${ac.floor}</span>
                </div>
                <div class="info-row">
                    <span class="label">Конструкция:</span>
                    <span class="value">${ac.construction}</span>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn-details" data-id="${ac.id}">Подробнее</button>
            </div>
        </div>`;
    }).join("");

    acSistemList.innerHTML = acSistemHTML;
    
    addDetailsHandlers();
}

// Функция фильтрации
function filterNetworks() {
    const floorFilter = document.getElementById('floorFilter').value;
    const lineFilter = document.getElementById('lineFilter').value;
    
    filteredData = acSistemsContent.filter(ac => {
        const matchesFloor = floorFilter === 'all' || ac.floor.includes(floorFilter);
        const matchesLine = lineFilter === 'all' || ac.line.includes(lineFilter);
        
        return matchesFloor && matchesLine;
    });
    
    acSistemRender(filteredData);
}

// Инициализация фильтров
function initFilters() {
    const floorFilter = document.getElementById('floorFilter');
    const lineFilter = document.getElementById('lineFilter');
    
    if (floorFilter) {
        floorFilter.addEventListener('change', filterNetworks);
    }
    
    if (lineFilter) {
        lineFilter.addEventListener('change', filterNetworks);
    }
}

function addDetailsHandlers() {
    document.querySelectorAll('.btn-details').forEach(button => {
        button.addEventListener('click', function() {
            const acId = this.getAttribute('data-id');
            // Ищем в исходных данных, а не в отфильтрованных
            const ac = acSistemsContent.find(item => item.id == acId);
            if (ac) {
                openModal(ac);
            }
        });
    });
}

function openModal(ac) {
    const modalOverlay = document.getElementById('modalOverlay');
    const modalBody = document.getElementById('modalBody');
    
    const modalHTML = `
        <div class="modal-network-card">
            <div class="modal-card-header">
                <h3>АС №${ac.num}</h3>
                <span class="network-status status-active">Активна</span>
            </div>
            <div class="modal-card-content">
                <div class="modal-info-row">
                    <span class="modal-label">ИЗАВ:</span>
                    <span class="modal-value">${ac.izav}</span>
                </div>
                <div class="modal-info-row">
                    <span class="modal-label">Фильтр:</span>
                    <span class="modal-value">${ac.titleFilter}</span>
                </div>
                <div class="modal-info-row">
                    <span class="modal-label">Вентилятор:</span>
                    <span class="modal-value">${ac.titleVent}</span>
                </div>
                <div class="modal-info-row">
                    <span class="modal-label">Линия:</span>
                    <span class="modal-value">${ac.line}</span>
                </div>
                <div class="modal-info-row">
                    <span class="modal-label">Этаж:</span>
                    <span class="modal-value">${ac.floor}</span>
                </div>
                <div class="modal-info-row">
                    <span class="modal-label">Конструкция:</span>
                    <span class="modal-value">${ac.construction}</span>
                </div>
                <div class="modal-info-row">
                    <span class="modal-label">Дата ввода в эксплуатацию:</span>
                    <span class="modal-value">${ac.commissioningDate || '01.01.2023'}</span>
                </div>
                <div class="modal-info-row">
                    <span class="modal-label">Последнее ТО:</span>
                    <span class="modal-value">${ac.lastMaintenance || '15.12.2024'}</span>
                </div>
                <div class="modal-info-row">
                    <span class="modal-label">Следующее ТО:</span>
                    <span class="modal-value">${ac.nextMaintenance || '15.03.2025'}</span>
                </div>
            </div>
        </div>
    `;
    
    modalBody.innerHTML = modalHTML;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden'; 
}

function closeModal() {
    const modalOverlay = document.getElementById('modalOverlay');
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    acSistemRender();
    initFilters();
    
    const modalOverlay = document.getElementById('modalOverlay');
    const modalClose = document.querySelector('.modal-close');
    
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
});