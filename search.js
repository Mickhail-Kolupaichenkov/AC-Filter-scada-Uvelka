document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.headerSearch input');
    const searchButton = document.querySelector('.headerSearch button');
    
    if (!searchInput || !searchButton) return;
    
    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        
        if (searchTerm === '') {
            alert('Введите поисковый запрос');
            return;
        }
        
        const currentPage = window.location.pathname.split('/').pop();
        let searchUrl = '';
        
        if (currentPage.includes('ac-sistem')) {
            searchUrl = `ac-sistem.html?search=${encodeURIComponent(searchTerm)}`;
        } else if (currentPage.includes('blocks')) {
            searchUrl = `blocks.html?search=${encodeURIComponent(searchTerm)}`;
        } else if (currentPage.includes('dust-meters')) {
            searchUrl = `dust-meters.html?search=${encodeURIComponent(searchTerm)}`;
        } else if (currentPage.includes('passports')) {
            searchUrl = `passports.html?search=${encodeURIComponent(searchTerm)}`;
        } else {
            searchUrl = `ac-sistem.html?search=${encodeURIComponent(searchTerm)}`;
        }
        
        window.location.href = searchUrl;
    }
    
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
});


function handleSearchOnPage(data, searchTerm) {
    if (!searchTerm) return data;
    
    return data.filter(item => {
        return Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
    });
}

function getSearchParam() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('search');
}